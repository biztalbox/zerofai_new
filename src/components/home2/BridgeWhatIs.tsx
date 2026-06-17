"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import type { HomepageWhatIs } from "@/types/homepage";

type Props = {
  content: HomepageWhatIs;
};

export function BridgeWhatIs({ content }: Props) {
  const [hover, setHover] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => {});
  };

  useEffect(() => {
    if (!videoOpen) return;
    const timer = window.setTimeout(playVideo, 50);
    return () => window.clearTimeout(timer);
  }, [videoOpen]);

  return (
    <section id="what-is" className="bg-background">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-6 py-20 lg:px-20 lg:py-28">
          <div>
            <h2 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#3d3d3d] lg:text-[2.75rem]">
              {content.title}
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-[1.65] text-[#666]">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="group relative min-h-[460px] overflow-hidden bg-coral lg:min-h-[640px]"
        >
          <div
            className="absolute inset-0 bg-black/35 transition-opacity duration-700"
            style={{ opacity: hover ? 1 : 0 }}
          />

          <div className="relative flex h-full min-h-[460px] items-center justify-center px-6 lg:min-h-[640px]">
            <h3
              className="text-center text-5xl font-light text-white transition-transform duration-700 md:text-6xl lg:text-7xl"
              style={{ transform: hover ? "translateY(-12px)" : "translateY(0)" }}
            >
              ZerofAI
            </h3>
          </div>


          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="absolute bottom-8 left-8 z-10 inline-flex items-center gap-3 border border-white px-7 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-coral"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Watch Now
          </button>

        </div>

      </div>
      <div className="text-center capitalize md:-mb-[30px] lg:-mb-[35px] xl:-mb-[55px]  xl:text-[9.8rem] md:text-[80px] pt-20 lg:text-[6.7rem] whitespace-nowrap text-[#EFF2F5] text-[40px] font-bold">client testimonials</div>

       
      <Dialog
        open={videoOpen}
        onOpenChange={(open) => {
          if (!open) videoRef.current?.pause();
          setVideoOpen(open);
        }}
      >
        <DialogContent className="w-auto max-w-none overflow-visible border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
          <div className="flex items-start gap-1 flex-col lg:flex-row-reverse">
            <DialogClose
              className="mt-1 text-white cursor-pointer ml-auto"
              aria-label="Close video"
            >
              <X className="h-7 w-7 stroke-[2.5]" />
            </DialogClose>
            <div className="relative aspect-video w-[min(900px,90vw)] overflow-hidden rounded-lg bg-black">
              {videoOpen && (
                <video
                  ref={videoRef}
                  src={content.videoUrl}
                  controls
                  playsInline
                  autoPlay
                  onLoadedData={playVideo}
                  className="h-full w-full object-contain"
                />
              )}
            </div>

          </div>

        </DialogContent>

      </Dialog>

    </section>
  );
}
