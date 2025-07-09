import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { on } from "events";

gsap.registerPlugin(useGSAP);

export default function Header({ fun, selected }: {fun: (id: string | null) => void; selected: string | null;}) {

    const header = useRef(null);
    // Removed redundant declaration

    const { contextSafe } = useGSAP({ scope: header });

    useGSAP(() => {
        if (selected !== null) {
            gsap.from('.header', {
                duration: 0.5,
                opacity: 0,
                y: -50,
                ease: "power3.out",
                delay: 0.5,
                stagger: 1
            });
        }
    }, [selected]);

    const onClickBack = contextSafe(() => {
        fun(null);
        gsap.to(header.current, {
            duration: 0.5,
            opacity: 0,
            y: -50,
            ease: "power3.in",
        });
    });

    const onClickSection = (id: string) => {
        switch (id) {
            case "Back":
                onClickBack();
                break;
            case "AboutMe":
                fun("About Me");
                break;
            case "Projects":
                fun("Projects");
                break;
            case "Contacts":
                fun("Contacts");
                break;
            default:
                console.log("Unknown section clicked:", id);
        }
    };

    return (
        (selected !== null ? (
        <div ref={header} className="header flex flex-row rounded-b-lg justify-start top-0 z-10 pl-10 g-5 items-center font-sans font-semibold h-16 w-[calc(100%-40px)] bg-violet-950">
            <button onClick={() => onClickSection("Back")}>Back</button>
            <button onClick={() => onClickSection("About Me")}>About Me</button>
            <button onClick={() => onClickSection("Projects")}>Projects</button>
            <button onClick={() => onClickSection("Contacts")}>Contacts</button>
        </div>) : null)
    );
}