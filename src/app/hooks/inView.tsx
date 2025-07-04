import { use, useEffect, useRef, useState } from "react";

export default function inView<T extends Element>(ref: React.RefObject<T | null>, options = {}) {
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { setIsInView(entry.isIntersecting); }, options);
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => { if (currentRef) observer.unobserve(currentRef); }; 
    }, [options]);

    return [ref, isInView];
}