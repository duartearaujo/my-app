import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export default function Header({ selection }: {selection: (id: string | null) => void;}) {

    const header = useRef(null);

    const { contextSafe } = useGSAP({ scope: header });

    useGSAP(() => {
        gsap.from('.header', {
            duration: 0.5,
            opacity: 0,
            y: -50,
            ease: "power3.out",
            delay: 0.5,
            stagger: 1
        });
    });

    const onClickBack = contextSafe(() => {
        console.log("Back button clicked");
        gsap.to(header.current, {
            duration: 0.3,
            opacity: 0,
            y: -50,
            ease: "power3.in",
            onComplete: () => {
                console.log("Header animation complete");
                selection(null);
            }
        });
    });

    return (
        <div ref={header} className="header flex flex-row rounded-b-lg justify-start top-0 z-10 pl-10 g-5 items-center font-sans font-semibold h-16 w-[calc(100%-40px)] bg-violet-950">
            <button onClick={onClickBack}>
				Back
			</button>
        </div>
    );
}