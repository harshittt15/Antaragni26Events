"use client";

import { useEffect, useState } from "react";
import { getSortedData } from "@repo/firebase";
import toast from "react-hot-toast";

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
}

export function LeaderboardTab() {
  const [data, setData] = useState<Array<LeaderboardEntry>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllCAs = async () => {
    try {
      const fbData = await getSortedData("CAs26", "points", 20);
      if (fbData != null) {
        const entries = fbData.map((ca: any, index: number) => ({
          rank: index + 1,
          name: ca.data.name,
          points: ca.data.points,
        }));
        setData(entries);
      }
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCAs();
  }, []);

  return (
    <div className="w-full border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-6 md:p-8 relative min-h-[400px]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/50 text-sm">Loading Leaderboard...</div>
        </div>
      ) : (
      <div className="flex flex-col w-full">
        {/* Table Header */}
        <div className="grid grid-cols-12 text-[11px] font-sans font-semibold tracking-[0.18em] text-white/40 uppercase pb-5 px-6 md:px-8 border-b border-white/5">
          <div className="col-span-2">RANK</div>
          <div className="col-span-7 md:col-span-8">NAMES</div>
          <div className="col-span-3 md:col-span-2 text-right">POINTS</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col mt-3">
          {data.map((entry) => {
            const isRank1 = entry.rank === 1;
            const isRank2 = entry.rank === 2;
            const isRank3 = entry.rank === 3;
            const isTop3 = isRank1 || isRank2 || isRank3;

            if (isTop3) {
              let bgClass = "";
              let borderClass = "";
              let shadowClass = "";
              let hoverClass = "";
              let rankTextClass = "";
              let pointsTextClass = "";

              if (isRank1) {
                bgClass = "bg-gradient-to-r from-accent/[0.12] to-accent/[0.06]";
                borderClass = "border-accent/15";
                shadowClass = "shadow-[0_0_20px_rgba(255,0,0,0.05)]";
                hoverClass = "hover:from-accent/[0.16] hover:to-accent/[0.08] hover:border-accent/25 hover:shadow-[0_0_25px_rgba(255,0,0,0.08)]";
                rankTextClass = "text-[18px] md:text-[20px] font-sans font-extrabold text-white";
                pointsTextClass = "text-[15px] md:text-[16px] font-sans font-extrabold text-white";
              } else if (isRank2) {
                bgClass = "bg-gradient-to-r from-accent/[0.08] to-accent/[0.04]";
                borderClass = "border-accent/10";
                shadowClass = "shadow-[0_0_15px_rgba(255,0,0,0.03)]";
                hoverClass = "hover:from-accent/[0.12] hover:to-accent/[0.06] hover:border-accent/15 hover:shadow-[0_0_20px_rgba(255,0,0,0.05)]";
                rankTextClass = "text-[17px] md:text-[18px] font-sans font-bold text-white/90";
                pointsTextClass = "text-[14px] md:text-[15px] font-sans font-bold text-white/90";
              } else {
                bgClass = "bg-gradient-to-r from-accent/[0.05] to-accent/[0.02]";
                borderClass = "border-accent/10";
                shadowClass = "shadow-[0_0_12px_rgba(255,0,0,0.02)]";
                hoverClass = "hover:from-accent/[0.08] hover:to-accent/[0.04] hover:border-accent/15 hover:shadow-[0_0_15px_rgba(255,0,0,0.03)]";
                rankTextClass = "text-[16px] md:text-[17px] font-sans font-bold text-white/80";
                pointsTextClass = "text-[14px] md:text-[15px] font-sans font-bold text-white/85";
              }

              return (
                <div
                  key={entry.rank}
                  className={`grid grid-cols-12 items-center py-4 px-6 md:px-8 rounded-lg ${bgClass} border ${borderClass} ${shadowClass} min-h-[60px] my-2 transition-all duration-300 ${hoverClass}`}
                >
                  <div className={`col-span-2 ${rankTextClass} leading-none`}>
                    {entry.rank}
                  </div>
                  <div className="col-span-7 md:col-span-8 text-[14px] md:text-[15px] font-sans font-bold tracking-[0.08em] text-white uppercase leading-none">
                    {entry.name}
                  </div>
                  <div className={`col-span-3 md:col-span-2 text-right ${pointsTextClass} leading-none`}>
                    {entry.points}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={entry.rank}
                className="grid grid-cols-12 items-center py-4.5 px-6 md:px-8 border-b border-white/5 last:border-none min-h-[56px] transition-all duration-200 hover:bg-white/[0.02]"
              >
                <div className="col-span-2 text-[15px] md:text-[16px] font-sans font-bold text-white/70 leading-none">
                  {entry.rank}
                </div>
                <div className="col-span-7 md:col-span-8 text-[14px] md:text-[15px] font-sans font-bold tracking-[0.08em] text-white/90 uppercase leading-none">
                  {entry.name}
                </div>
                <div className="col-span-3 md:col-span-2 text-right text-[14px] md:text-[15px] font-sans font-bold tracking-wider text-white/90 leading-none">
                  {entry.points}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      )}
    </div>
  );
}
