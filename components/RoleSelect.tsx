"use client";

import { ROLES } from "@/lib/skills-data";

export default function RoleSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ROLES.map((role) => {
        const active = role.id === value;
        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onChange(role.id)}
            className={`rounded-sm border px-3 py-1.5 font-mono text-[12.5px] transition-colors ${
              active
                ? "border-pen-amber bg-pen-amber/15 text-pen-amber"
                : "border-paper-100/15 text-paper-100/55 hover:border-paper-100/35 hover:text-paper-100/80"
            }`}
          >
            {role.label}
          </button>
        );
      })}
    </div>
  );
}
