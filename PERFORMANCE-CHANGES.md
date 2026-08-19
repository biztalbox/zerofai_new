# ZerofAI — PageSpeed Optimization (Aug 2026)

Sab changes aapke local repo me apply ho chuke hain. Neeche kya-kya badla,
kyun badla, aur aapko manually kya karna baaki hai.

---

## 1. Fonts — 1.49 MB → 133 KB (91% kam)

**Pehle:** `globals.css` me 7 hand-written `@font-face` rules, sab `.otf`
files point kar rahe the. OTF compress nahi hota, subset nahi tha, aur
`public/` se serve hone ki wajah se koi long-term cache header bhi nahi tha.
Upar se `(site)/layout.tsx` `Geist` + `Geist_Mono` (Google Fonts) bhi load
kar raha tha — jabki theme kabhi unhe use hi nahi karti thi.

**Ab:**
- Sabhi 6 weights subsetted WOFF2 me convert (Latin + punctuation + kerning/ligatures).
- `src/lib/fonts.ts` — `next/font/local`. Yeh khud hi preload hints deta hai,
  files ko fingerprint karke `/_next/static` se `immutable` serve karta hai,
  aur size-adjusted system fallback generate karta hai (font swap pe CLS ~0).
- Geist / Geist_Mono poori tarah hata diye — 2 unnecessary Google Fonts requests gaye.

| File | Pehle | Ab |
|---|---|---|
| Light | 236 KB | 21 KB |
| Regular | 229 KB | 20 KB |
| RegularItalic | 236 KB | 21 KB |
| Medium | 250 KB | 22 KB |
| Bold | 250 KB | 22 KB |
| BoldItalic | 257 KB | 23 KB |

Above-the-fold pe sirf Regular + Medium load hote hain ≈ **42 KB**.

---

## 2. Homepage rendering — `force-dynamic` hata diya

**Pehle:** `export const dynamic = "force-dynamic"` — har visitor ke liye
Payload/Postgres se fresh query, phir HTML. TTFB seedha DB latency ke barabar.
Aur `getHomepageContent()` ek hi request me **do baar** chalta tha
(`generateMetadata` + page body).

**Ab:**
- Homepage `export const revalidate = 60` (ISR). Baaki pages 300s.
- Saare CMS getters (`getHomepageContent`, `getNavigationContent`,
  `getFooterContent`, `getKnowledgePageContent` …) React `cache()` me wrap —
  ek request me ek hi DB call.

---

## 3. Hero — LCP fix + strict media priority

**Pehle:** Poora `BridgeHero` ek `"use client"` component tha. Mobile pe
`<video preload="auto" autoPlay>` mount hota tha jo SSR HTML me hi aa jaata tha —
matlab browser headline paint karne se pehle hi Supabase se **63 MB ka MP4**
kheenchna shuru kar deta tha. Poster nahi, dimensions nahi.

**Ab — media priority (mobile aur desktop dono ke liye alag-alag evaluate hoti hai):**

| CMS me kya set hai | Kya dikhega |
|---|---|
| Image set hai | **Sirf image.** Video bilkul load nahi hoga, chahe CMS me set ho. |
| Image nahi, video hai | Video chalega, uske peeche placeholder image (jab tak first frame ready na ho) |
| Dono nahi | Placeholder image |

Desktop `image`/`video` fields dekhta hai, mobile `mobileImage`/`mobileVideo`.
Dono independent hain — koi cross-breakpoint fallback nahi. Yani desktop pe
image aur mobile pe video, dono ek saath possible hai.

Placeholder: `public/assets/hero-placeholder.webp` (8 KB brand gradient).
Badalna ho to bas file replace kar dein, ya `BridgeHero.tsx` me
`HERO_PLACEHOLDER` constant change kar dein.

**Technically:**
- `BridgeHero` ab **server component** hai. Headline, CTA, logo pehle HTML
  response me hi aate hain — LCP hydration ya video ka intezaar nahi karta.
- Still layer `<picture>` ke through, art-directed (mobile crop vs desktop crop) —
  browser exactly **ek** image download karta hai, Next optimizer se AVIF/WebP me.
- `src/components/home2/HeroVideoLayer.tsx` (naya): video server pe render hi
  nahi hota. `load` event ke baad + main thread idle hone par mount hota hai,
  `preload="none"` ke saath, aur ready hone par fade-in. Active breakpoint pe
  video na ho to kuch bhi render nahi karta.
  Save-Data, 2G/slow-2G, ya `prefers-reduced-motion` par bilkul skip.
- Breakpoint change (rotate/resize) pe source live swap ho jaata hai.

## 4. 3D bot — initial bundle se bahar

**Pehle:** `CtaBot` → `HeroCanvas` eagerly import karta tha:
`three` + `@react-three/fiber` + `@react-three/drei` + `gsap` + 621 KB GLB +
drei ka `Environment preset="city"` (CDN se HDRI). Sab kuch homepage ke first
load me, ek aise section ke liye jahan zyadatar mobile users pahunchte hi nahi.

**Ab:** `src/components/bot/DeferredHeroCanvas.tsx` (naya)
- **Mobile (<768px):** static image (`zerof_bot.png`), WebGL bilkul nahi.
- **Desktop:** `next/dynamic` + IntersectionObserver — section viewport se
  400px door aane par hi chunk download hota hai.
- Canvas pe `dpr={[1, 1.5]}` cap — retina screens pe 3x framebuffer nahi banega.

---

## 5. Chat widget — deferred

`ContactChatBot` har page pe eagerly hydrate hota tha. Ab
`src/components/lazy/DeferredChatBot.tsx` ek static launcher button render karta
hai (bilkul same position/size, zero layout shift) aur asli widget browser idle
hone par ya first interaction par load hota hai. Placeholder pe click karne se
widget load hoke turant khul jaata hai — click lost nahi hota. `#chatbotIcon`
id preserve hai, isliye HeroScene ka click-to-open abhi bhi kaam karta hai.

---

## 6. Images — 7.62 MB → 471 KB (94% kam)

Raw `<img>` tags ko `next/image` se replace kiya (BridgePillars, BridgeCatalog,
Footer, Navigation) — sabhi me explicit `sizes`, `loading`, aur aspect-ratio
wrappers taaki CLS na ho. `CustomerTrust` ka `sizes` bhi add kiya (pehle
har device width ke liye 1000px srcset generate ho raha tha).

| File | Pehle | Ab |
|---|---|---|
| ravi.png | 1980 KB | ravi.webp 84 KB |
| rajeev.png | 1717 KB | rajeev.webp 63 KB |
| abhishek.png | 1589 KB | abhishek.webp 23 KB |
| ajay.png | 1499 KB | ajay.webp 20 KB |
| pattern.png | 430 KB | pattern.webp 85 KB |
| logo.png | 119 KB | logo.webp 19 KB |
| observe/predict/automate.png | 326 KB | 112 KB |
| text.png | 55 KB | text.webp 33 KB |
| insights.jpg | 87 KB | insights.webp 32 KB |

---

## 7. next.config.ts

- `images.formats: ["image/avif", "image/webp"]` — AVIF pehle.
- `images.qualities: [65, 72, 75, 80]` — Next 16 me zaroori hai warna optimizer
  non-default `q` reject karta hai.
- `images.minimumCacheTTL` 1 saal.
- `headers()` — `/assets/*` aur `/twk-everett/*` pe
  `Cache-Control: public, max-age=31536000, immutable`. Pehle `public/` ki
  files har deploy pe re-download hoti thi.
- `experimental.optimizePackageImports` — lucide-react, react-icons, radix.
  Ek icon ab poori library nahi kheenchta.
- `poweredByHeader: false`, security headers.

---

## 8. CSS

- Below-the-fold sections pe `content-visibility: auto` (`.cv-auto`) — browser
  unka layout/paint tab tak skip karta hai jab tak scroll paas na aaye.
  Anchor-target sections (`#what-is`, `#platform`, `#insights`, `#knowledge`)
  pe **jaan-boojh kar nahi** lagaya, taaki in-page navigation sahi jagah land kare.
- `prefers-reduced-motion` block add kiya.

---

# ⚠️ Aapko manually karne wale kaam

Ye 3 cheezein baaki hain — inke bina score 90+ mushkil hai:

### A. Hero image CMS me set karein (sabse zaroori)
Payload admin → **Homepage → Hero → Mobile Image** (aur Image). Ek 1080×1920
(mobile) / 1920×1080 (desktop) JPG/PNG upload kar dein.

Image set karte hi us breakpoint pe **video load hona band ho jaayega** aur
wahi image LCP element banegi — mobile score ke liye yeh sabse bada single fix
hai. Abhi mobile image khaali hai, isliye mobile video chala raha hai.

### B. Hero videos re-encode karein
Supabase pe abhi:
- `hero video.mp4` aur `ZerofAi vertical_1.mp4` — bahut bade hain.
- `public/assets/zerofai_intro.mp4` — **68 MB**
- `public/assets/Zerofai_mashup.mp4` — **64 MB**

Ye dono `public/` wale har deploy ke saath ship hote hain. Inhe Supabase/CDN pe
move karein aur re-encode karein:

```
ffmpeg -i input.mp4 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow \
       -profile:v main -movflags +faststart -c:a aac -b:a 96k output.mp4
```
Target: 2–4 MB. Ho sake to ek WebM/VP9 version bhi.

### C. Purani unused files delete karein
Ye ab kahin reference nahi hoti:
- `public/loader.gif` — **1.6 MB**, bilkul unused (`page-loader.tsx` ka
  `LoaderContent` ab kahin import nahi hota)
- `public/twk-everett/*.otf` — saari 18 OTF files (~4.5 MB)
- `public/assets/{ravi,rajeev,abhishek,ajay,pattern,logo,text,observe,predict,automate}.png`
  aur `insights.jpg` — WebP versions aa gaye hain
- `src/components/page-loader.tsx` — ab unused

---

# Verify kaise karein

```bash
npm run build     # ya bun run build
npm run start
```

Main sandbox me `next build` nahi chala saka (node_modules aur DB creds nahi the),
isliye build ek baar locally zaroor verify kar lein. Deploy ke baad PageSpeed
dobara chalayein — poster image set karne ke **baad**.
