import { motion, AnimatePresence } from "motion/react";
import Header from "./Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState } from "react";

export default function Section({ children, selected, selection, id }: { children: any; selected?: string | null; selection: (id: string | null) => void; id?: string }) {

    const [visible, setVisible] = useState<boolean>(true);

    useGSAP(() => {
        if(visible) {
            gsap.from('.section', {
                duration: 1,
                opacity: 0,
                ease: "power3.out",
                delay: 0.5,
                stagger: 1
            });
        }
        else {
            gsap.to('.section', {
                duration: 0.5,
                opacity: 0,
                ease: "power3.in",
                delay: 0.3,
                onComplete: () => {
                    selection(null);
                    setVisible(true);
                }
            });
        }
    }, [visible]);

    return (
        <>
            {selected === id ? (
                <section className="section flex flex-col min-h-screen items-center">
                    <Header fun={setVisible}/>
                    <div className="flex w-full h-[calc(100%-(--h-16))]">
                        {children}
                    </div>
                </section>
            ) : null}
        </>
    );
}