"use client";

import React, { useState } from "react";
import { useEditorState } from "@/hooks/useEditorState";
import { defaultTransform } from "@/config/incentives-layout";

export function EditorPanel() {
  const { isEditorActive, selectedId, mode, layout, updateTransform, saveLayout, resetSelected, resetAll, importLayout } = useEditorState();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isEditorActive) return null;

  const t = selectedId ? layout[selectedId] || defaultTransform : null;

  return (
    <div className="fixed top-4 right-4 z-[99999] bg-[#111] border border-white/10 rounded-lg shadow-2xl w-72 text-white font-mono text-[12px] editor-ui overflow-hidden flex flex-col">
      <div 
        className="bg-black/50 p-3 border-b border-white/10 flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <span className="font-bold tracking-wider text-[#ffb84d]">VISUAL EDITOR</span>
        <span className="text-white/50">{isMinimized ? "▲" : "▼"}</span>
      </div>

      {!isMinimized && (
        <div className="p-4 flex flex-col gap-4">
          
          <div className="bg-black/30 p-2 rounded border border-white/5">
            <div className="text-white/50 mb-1">Mode:</div>
            <div className="text-green-400 font-bold uppercase">{mode}</div>
          </div>

          <div className="bg-black/30 p-2 rounded border border-white/5">
            <div className="text-white/50 mb-1">Selected Element:</div>
            <div className="font-bold text-blue-400">{selectedId || "None"}</div>
          </div>

          {selectedId && t && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1">
                  <span className="text-white/50">X Offset</span>
                  <input 
                    type="number" 
                    value={Math.round(t.x)} 
                    onChange={e => updateTransform(selectedId, { x: Number(e.target.value) })}
                    className="bg-black border border-white/20 rounded px-2 py-1 text-white w-full outline-none focus:border-blue-500"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-white/50">Y Offset</span>
                  <input 
                    type="number" 
                    value={Math.round(t.y)} 
                    onChange={e => updateTransform(selectedId, { y: Number(e.target.value) })}
                    className="bg-black border border-white/20 rounded px-2 py-1 text-white w-full outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1">
                  <span className="text-white/50">Scale</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={t.scale} 
                    onChange={e => updateTransform(selectedId, { scale: Number(e.target.value) })}
                    className="bg-black border border-white/20 rounded px-2 py-1 text-white w-full outline-none focus:border-blue-500"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-white/50">Rotation (deg)</span>
                  <input 
                    type="number" 
                    value={t.rotation} 
                    onChange={e => updateTransform(selectedId, { rotation: Number(e.target.value) })}
                    className="bg-black border border-white/20 rounded px-2 py-1 text-white w-full outline-none focus:border-blue-500"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1">
                  <span className="text-white/50">Opacity</span>
                  <input 
                    type="number" 
                    step="0.1"
                    min="0"
                    max="1"
                    value={t.opacity} 
                    onChange={e => updateTransform(selectedId, { opacity: Number(e.target.value) })}
                    className="bg-black border border-white/20 rounded px-2 py-1 text-white w-full outline-none focus:border-blue-500"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-white/50">Z-Index</span>
                  <input 
                    type="number" 
                    value={t.zIndex} 
                    onChange={e => updateTransform(selectedId, { zIndex: Number(e.target.value) })}
                    className="bg-black border border-white/20 rounded px-2 py-1 text-white w-full outline-none focus:border-blue-500"
                  />
                </label>
              </div>
            </div>
          )}

          <div className="h-px bg-white/10 my-2" />

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={resetSelected}
                disabled={!selectedId}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 rounded py-1 transition-colors"
              >
                Reset Selected
              </button>
              <button 
                onClick={resetAll}
                className="bg-white/10 hover:bg-white/20 rounded py-1 transition-colors"
              >
                Reset All
              </button>
            </div>

            <button 
              onClick={saveLayout}
              className="bg-green-600 hover:bg-green-500 text-white font-bold rounded py-2 mt-2 transition-colors"
            >
              💾 Save Layout
            </button>
            
            <button 
              onClick={() => {
                const json = JSON.stringify(layout, null, 2);
                navigator.clipboard.writeText(json).then(() => {
                  alert("Layout JSON copied to clipboard!");
                }).catch(err => {
                  alert("Failed to copy. See console.");
                  console.error(err);
                });
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded py-1 transition-colors"
            >
              Export JSON
            </button>
            
            <button 
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText();
                  const parsed = JSON.parse(text);
                  importLayout(parsed);
                  alert("Layout imported successfully!");
                } catch (e) {
                  alert("Failed to parse JSON from clipboard. Ensure valid JSON is copied.");
                }
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded py-1 transition-colors"
            >
              Import JSON
            </button>
          </div>

          <div className="text-[9px] text-white/40 mt-2 text-center leading-relaxed">
            Drag to move (G)<br/>
            Arrows to nudge | Shift+Arrow 10px<br/>
            [S] Scale | [R] Rotate | [Esc] Deselect
          </div>
        </div>
      )}
    </div>
  );
}
