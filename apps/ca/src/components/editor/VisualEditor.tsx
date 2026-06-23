"use client";

import React from "react";
import { EditorProvider, useEditorState } from "@/hooks/useEditorState";
import { EditorPanel } from "./EditorPanel";

function VisualEditorInner({ children }: { children: React.ReactNode }) {
  const { isEditorActive, setSelectedId } = useEditorState();

  return (
    <div 
      className="relative w-full h-full"
      onClick={(e) => {
        // If clicking the empty background, deselect
        if (isEditorActive && e.target === e.currentTarget) {
          setSelectedId(null);
        }
      }}
    >
      {isEditorActive && <EditorPanel />}
      {children}
    </div>
  );
}

export function VisualEditor({ children }: { children: React.ReactNode }) {
  return (
    <EditorProvider>
      <VisualEditorInner>{children}</VisualEditorInner>
    </EditorProvider>
  );
}
