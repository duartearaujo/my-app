import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

function HeaderButton({ children, onClick }: {children: string; onClick: (id: string) => void;}) {
    return (
        <button className={`${(children === 'About Me') ? 'ml-auto' : ''}  group relative p-2`} onClick={() => onClick(children)}>
            <span className="relative z-10 bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out text-lg font-bold">
                {children.toUpperCase()}
            </span>
        </button>
    );
}

export default function Header({ fun }: {fun: (id: string | null) => void;}) {

    const header = useRef(null);

    const { contextSafe } = useGSAP({ scope: header });

    useGSAP(() => {
        gsap.from('.header', {
            duration: 0.3,
            opacity: 0,
            y: -50,
            ease: "power3.out",
            delay: 0.5
        });
    });

    const onClickBack = contextSafe(() => {
        fun(null);
        gsap.to(header.current, {
            duration: 0.3,
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
        <header ref={header} className="header flex flex-row rounded-b-lg m-auto top-0 z-10 px-10 gap-10 items-center font-sans font-semibold h-16 w-[calc(100%-40px)] bg-violet-950">
            <HeaderButton onClick={onClickSection}>Back</HeaderButton>
            <HeaderButton onClick={onClickSection}>About Me</HeaderButton>
            <HeaderButton onClick={onClickSection}>Projects</HeaderButton>
            <HeaderButton onClick={onClickSection}>Contacts</HeaderButton>
        </header>
    );
}