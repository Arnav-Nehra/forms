"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function SpotlightNewDemo() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-2xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Turn simple sentences <br/>into  Google Forms — instantly.
        </h1>
        <p className="mt-6 font-normal text-lg text-neutral-300 max-w-lg text-center mx-auto">
        No more dragging, dropping, and formatting — just prompt
        </p>
      </div>
    </div>
  );
}
