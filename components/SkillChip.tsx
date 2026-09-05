import { Check, X } from "lucide-react";

export default function SkillChip({
  skill,
  weight,
  matched,
}: {
  skill: string;
  weight: number;
  matched: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[12.5px] leading-none ${
        matched
          ? "border-pen-green/40 bg-pen-green/10 text-pen-green"
          : "border-pen-red/40 bg-pen-red/10 text-pen-red"
      }`}
      title={matched ? "Found in resume" : "Not found in resume"}
    >
      {matched ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
      {skill}
      {weight === 3 && <span className="opacity-60">·key</span>}
    </span>
  );
}
