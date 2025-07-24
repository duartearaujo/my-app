"use client";

import { JSX, useRef } from "react";

export default function Text({ children }: { children: JSX.Element | JSX.Element[] }) {
    const ref = useRef(null);

    return (
        <div ref={ref} className={`textcard group relative m-auto mt-[45px] flex-col space-y-5 rounded-lg font-sans font-semibold bg-violet-950/60 backdrop-blur-md lg:w-[27vw] w-[90vw] p-5 fade`}>
            {children}
        </div>
    );
}