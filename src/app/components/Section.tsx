import { motion, AnimatePresence } from "motion/react";
import Header from "./Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

export default function Section({ children, isVisible, selected, selection, id }: { children: any; isVisible: string | null; selected: string | null; selection: (id: string | null) => void; id?: string }) {

    const sectionRef = useRef(null);

    useGSAP(() => {
        if((isVisible === id) && (selected === id)) {
            gsap.from('.fade', {
                duration: 1,
                opacity: 0,
                ease: "power3.out",
                delay: 0.5
            });
            console.log("Section is visible:", isVisible);
        }
        else if((isVisible !== id) && (selected === id)) {
            gsap.to('.fade', {
                duration: 0.5,
                opacity: 0,
                ease: "power3.in",
                delay: 0.3,
                onComplete: () => {
                    selection(isVisible);
                }
            });
        }
    }, [isVisible, selected]);

    return (
        <>
            {selected === id ? (
                <section className="flex flex-col min-h-screen items-center" ref={sectionRef}>
                    <div className="section flex w-full h-[calc(100%-(4rem))]">
                        {children}
                    </div>
                </section>
            ) : null}
        </>
    );
}