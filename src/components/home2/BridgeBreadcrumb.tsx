import Link from "next/link";

export function BridgeBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-[#e8e8e8] bg-white px-6 py-3 lg:px-10">
      <ol className="mx-auto flex container items-center gap-1 text-[13px] text-[#767676]">
        <li><Link href="/" className="hover:text-kyndryl-red hover:underline">Home</Link></li>
        <li aria-hidden className="mx-0.5">/</li>
        <li><Link href="#" className="hover:text-kyndryl-red hover:underline">Services</Link></li>
        <li aria-hidden className="mx-0.5">/</li>
        <li className="text-[#3d3d3d]">Kyndryl Bridge</li>
      </ol>
    </nav>
  );
}
