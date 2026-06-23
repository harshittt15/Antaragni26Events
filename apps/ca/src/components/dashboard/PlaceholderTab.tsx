"use client";

interface PlaceholderTabProps {
  tabName: string;
}

export function PlaceholderTab({ tabName }: PlaceholderTabProps) {
  return (
    <div className="w-full border border-white/10 bg-white/[0.01] rounded-xl p-16 text-center">
      <h3 className="font-serif text-2xl uppercase tracking-tight text-white/40">
        {tabName} Content
      </h3>
      <p className="text-white/30 text-[14px] mt-2">
        Section coming soon.
      </p>
    </div>
  );
}
