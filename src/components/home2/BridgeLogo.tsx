export function BridgeLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "text-[1.25rem]", md: "text-[1.75rem]", lg: "text-[2rem]" };
  return (
    <span className={`inline-flex items-baseline gap-1 font-normal lowercase leading-none tracking-[-0.02em] ${sizes[size]}`}>
      <span className="text-[#ff462d]">kyndryl</span>
      <span className="text-[#006670]">bridge</span>
    </span>
  );
}
