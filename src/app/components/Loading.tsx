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
        else {
            let tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } });
            tl.to(".loading-circle-1", {
                y: -20,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut"
                })
                .to(".loading-circle-2", {
                    y: -20,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                    delay: 0.1
                }, "<")
                .to(".loading-circle-3", {
                    y: -20,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                    delay: 0.2
                }, "<");
        }
    }, [isLoaded]);

    return (
        <div className={`loading-screen absolute flex w-full h-full bg-violet-950 z-50 items-center justify-center`}>
            { !isLoaded && (
                <svg>
                    <circle className="loading-circle-1" cx="40%" cy="35%" r="8" fill="white" />
                    <circle className="loading-circle-2" cx="50%" cy="35%" r="8" fill="white" />
                    <circle className="loading-circle-3" cx="60%" cy="35%" r="8" fill="white" />
                </svg>
            )}
        </div>
    );
}