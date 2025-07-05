"use client";

import { useRef } from "react";
import inView from "../hooks/inView";
import { threshold } from "three/tsl";

export default function Text({ children }: { children: any }) {
    const ref = useRef(null);
    const inview = inView(ref, {threshold: 0.5});

    return (
        <div ref={ref} className={`textcard group relative m-auto mt-[45px] flex-col space-y-5 rounded-lg justify-center items-center font-sans font-semibold bg-violet-950/60 backdrop-blur-md w-3/12 h-7/12 p-5 animate-fadeIn`}>
            {children}
        </div>
    );
}