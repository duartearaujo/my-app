import { useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";

export default function Ready({ setIsLoaded }: { setIsLoaded: (bool: boolean) => void }) {
    const { gl } = useThree();
    const triggered = useRef<boolean>(false);
    
    useFrame(() => {
        if (!triggered.current && gl.info.programs && (gl.info.programs.length > 0)) {
            triggered.current = true;
            setIsLoaded(true);
        }
    });
    
    return null;
}