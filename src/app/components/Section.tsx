import { motion, AnimatePresence } from "motion/react";
import Header from "./Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

export default function Section({ children, selected, selection, id }: { children: any; selected?: string | null; selection: (id: string | null) => void; id?: string }) {

    const [visible, setVisible] = useState<boolean>(true);
    const sectionRef = useRef(null);

    useGSAP(() => {
        if(visible && (selected === id)) {
            gsap.from('.fade', {
                duration: 1,
                opacity: 0,
                ease: "power3.out",
                delay: 0.5
            });
            console.log("Section is visible:", visible);
        }
        else if(!visible && (selected === id)) {
            gsap.to('.fade', {
                duration: 0.5,
                opacity: 0,
                ease: "power3.in",
                delay: 0.3,
                onComplete: () => {
                    selection(null);
                    setVisible(true);
                    console.log(visible);
                }
            });
        }
    }, [visible, selected, setVisible]);

    return (
        <>
            {selected === id ? (
                <section className="flex flex-col min-h-screen items-center" ref={sectionRef}>
                    <Header fun={setVisible}/>
                    <div className="section flex w-full h-[calc(100%-(4rem))]">
                        {children}
                    </div>
                </section>
            ) : null}
        </>
    );
}