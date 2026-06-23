"use client";

import React, { useRef } from "react";
import { useEditorState } from "@/hooks/useEditorState";
import { useDraggable } from "@/hooks/useDraggable";
import { defaultTransform } from "@/config/incentives-layout";
import { cn } from "@/lib/utils";

interface EditableElementProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function EditableElement({ id, children, className }: EditableElementProps) {
  const { isEditorActive, selectedId, layout } = useEditorState();
  const ref = useRef<HTMLDivElement>(null);

  useDraggable(id, ref);

  const t = layout[id] || defaultTransform;
  const isSelected = selectedId === id;

  const style: React.CSSProperties = {
    transform: `translate(${t.x}px, ${t.y}px) scale(${t.scale}) rotate(${t.rotation}deg)`,
    opacity: t.opacity,
    zIndex: t.zIndex,
  };

  if (!isEditorActive) {
    // Normal website behavior
    return (
      <div style={style} className={className}>
        {children}
      </div>
    );
  }

  // Editor Mode behavior
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "relative transition-none select-none",
        // When active, override internal pointer events so it's draggable
        "*:pointer-events-none touch-none",
        isSelected && "ring-2 ring-blue-500 ring-offset-2 ring-offset-black z-50 outline-none",
        !isSelected && "hover:outline hover:outline-2 hover:outline-white/30 cursor-grab active:cursor-grabbing",
        className
      )}
    >
      {isSelected && (
        <div className="absolute -top-7 left-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap editor-ui z-[9999]">
          {id}
        </div>
      )}
      {children}
    </div>
  );
}
