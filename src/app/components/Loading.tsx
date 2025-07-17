import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loading({ isLoaded }: { isLoaded: boolean }) {

    useGSAP(() => {
        if (isLoaded) {
            gsap.to(".loading-screen", {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    document.querySelector(".loading-screen")?.remove();
                }
            });
        }
    }, [isLoaded]);

    return (
        <div className={`loading-screen absolute w-full h-full bg-violet-950 z-50`}>
            <p className="loading-text">Loading...</p>
        </div>
    );
}