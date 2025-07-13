import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

function HeaderButton({ children, onClick }: {children: string; onClick: (id: string) => void;}) {
    return (
        <div className="hover:bg-[radial-gradient(closest-side,var(--tw-gradient-stops))] from-purple-500 via-purple-500 to-purple-900">
            <button className="" onClick={() => onClick(children)}>
                {children}
            </button>
        </div>
    );
}

export default function Header({ fun }: {fun: (id: string | null) => void;}) {

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
            case "About Me":
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
        <div ref={header} className="header flex flex-row rounded-b-lg m-auto top-0 z-10 pl-10 pr-10 gap-10 items-center font-sans font-semibold h-16 w-[calc(100%-40px)] bg-violet-950">
            <button className="" onClick={() => onClickSection("Back")}>Back</button>
            <button className="ml-auto" onClick={() => onClickSection("About Me")}>About Me</button>
            <button className="" onClick={() => onClickSection("Projects")}>Projects</button>
            <button className="" onClick={() => onClickSection("Contacts")}>Contacts</button>
        </div>
    );
}