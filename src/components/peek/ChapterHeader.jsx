import React from "react";
import Reveal from "./Reveal";

// A numbered chapter header used for each of the three series.
export default function ChapterHeader({ number, id, badge, name, desc }) {
  return (
    <Reveal>
      <div id={id} className="scroll-mt-28">
        <div className="flex items-baseline gap-5 mb-6">
          <span className="font-display text-6xl md:text-7xl text-primary/25 leading-none">{number}</span>
          <div className="flex-1">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">{badge}</p>
            <div className="h-px bg-border" />
          </div>
        </div>
        <h3 className="font-display text-3xl md:text-4xl leading-tight text-foreground text-balance max-w-2xl">
          {name}
        </h3>
        {desc && (
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">{desc}</p>
        )}
      </div>
    </Reveal>
  );
}