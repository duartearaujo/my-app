"use client";

import { use, useRef } from "react";
import { useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { Html } from "@react-three/drei";
import { useControls } from "leva";
import { Camera, DirectionalLight, Fog, FogExp2, Group, MeshPhysicalMaterial, ShaderMaterial, SphereGeometry, Texture, UniformsLib, UniformsUtils } from "three";
import { Mesh } from "three";
import { Text } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";

import vertex from '@/app/shaders/vertex.glsl';
import fragment from '@/app/shaders/fragment.glsl';
import planetfrag1 from '@/app/shaders/planetfrag1.glsl';
import planetfrag2 from '@/app/shaders/planetfrag2.glsl';
import planetfrag3 from '@/app/shaders/planetfrag3.glsl';
import planetvert1 from '@/app/shaders/planetvert1.glsl';

const info = [
    { id: "About Me", position: [4, -1.5, 1], scale: 1, frag: planetfrag1, groupRtt: { x: 0, y: Math.PI/1.6, z: 0 }, groupPos: { x: 0.61, y: 1, z: 7 }, labelPos: [1.3, 0.5, 2] as [number, number, number] },
    { id: "Projects", position: [-6.5, -0.8, -3], scale: 0.8, frag: planetfrag2, groupRtt: { x: 0, y: -Math.PI/1.6, z: 0 }, groupPos: { x: -3, y: 0.7, z: 7 }, labelPos: [-8.5, 0, -3] as [number, number, number] },
    { id: "Contacts", position: [0, 1, -6], scale: 0.45, frag: planetfrag3, groupRtt: { x: Math.PI/5, y: 0, z: 0 }, groupPos: { x: 0, y: -3.25, z: 7.2 }, labelPos: [0.5, 0.5, -6] as [number, number, number] }
]

const sphereGeometry = new SphereGeometry(2.5, 64, 64);

function Title({ text }: { text: string }) {
    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <Text position={ [2, 3, -15] } font="/fonts/Climate_Crisis/ClimateCrisis-Regular-VariableFont_YEAR.ttf" fontSize={4} strokeColor={"black"} strokeWidth={0.05} rotation={[0, (Math.PI/12), 0]}>
                {text}
                <meshBasicMaterial color="white" />
            </Text>
        </Float>
    );
}

function Background() {

    const ref = useRef<Mesh>(null);

    useFrame((state) => {
        if (ref.current){
            const {clock} = state;
            ref.current.material.uniforms.uTime.value = clock.getElapsedTime();
        }
    });
    
    const material = new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        uniforms: {
            uTime: { value: 0 }
        },
        depthWrite: false,
        depthTest: false
    });
    
    return (
            <mesh ref={ref} position={[0, 0, -30]} renderOrder={-1}>
                <planeGeometry args={[2, 2]} />
                <shaderMaterial attach="material" args={[material]} />
            </mesh>
    );
}

function Sphere({ id, scale, position, frag, groupPos, groupRtt, labelPos, selection, selected, setIsVisible, groupRef }) {

    const sphereRef = useRef<Mesh>(null);
    const materialRef = useRef<CustomShaderMaterial | null>(null);
    const jointID = id.replace(' ', '');

    const onHover = () => {
        if (selected === null) {
            document.body.style.cursor = 'pointer';
        }
        gsap.to(`.${jointID}`, {
            duration: 0.5,
            scale: scale + .75,
            ease: "power2.inOut"
        });
    }

    const leaveHover = () => {
        document.body.style.cursor = 'default';
        gsap.to(`.${jointID}`, {
            duration: 0.5,
            scale: scale,
            ease: "power2.inOut"
        });
    }
    
    const sphereHandler = () => {
        
        setIsVisible(id);
        selection(id);
        
        gsap.to(groupRef.current.rotation, {
            x: groupRtt.x,
            y: groupRtt.y,
            z: groupRtt.z,
            duration: 1,
            ease: "power2.inOut"
        });
        gsap.to(groupRef.current.position, {
            x: groupPos.x,
            y: groupPos.y,
            z: groupPos.z,
            duration: 1,
            ease: "power2.inOut"
        });
    }

    useFrame((state, delta) => {
        if (sphereRef.current && materialRef.current) {
            sphereRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <group>
            <mesh ref={sphereRef} geometry={sphereGeometry} position={ position } scale={ scale } onClick={sphereHandler} onPointerEnter={onHover} onPointerLeave={leaveHover}>
                <CustomShaderMaterial 
                    ref={materialRef}
                    baseMaterial={MeshPhysicalMaterial} 
                    vertexShader={planetvert1} 
                    fragmentShader={frag} 
                    uniforms={{
                        density: { value: 1.0 }
                    }}
                />
            </mesh>
            <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.3}>
                <Html position={labelPos} center>
                    <div className={`${jointID} w-36 text-center text-white font-sans font-bold text-lg rounded-md bg-violet-950/60 backdrop-blur-md p-2 pointer-events-none ${(selected !== null) ? 'animate-fadeOut opacity-0' : 'animate-fadeIn'}`} style={{ transform: `scale(${scale})`}}>
                        {id.toUpperCase()}
                    </div>
                </Html>
            </Float>
        </group>
    );
}

export default function Scene({ setIsVisible, selection, selected }: { setIsVisible: (id: string | null) => void; selection: (id: string | null) => void; selected: string | null }) {

    const cameraRef = useRef<Camera | null>(null);
    const groupRef = useRef<Group>(null);

    useEffect(() => {
        if ((selected === null) && cameraRef.current && groupRef.current) {
            gsap.to(groupRef.current.rotation, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
                ease: "power2.inOut"
            });
            gsap.to(groupRef.current.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
                ease: "power2.inOut"
            });
        }
    }, [selected]);

    return (
        <div className="fixed w-full h-full">
            <Canvas camera={{position: [0, 2, 5]}} onCreated={({camera}) => { cameraRef.current = camera }}>
                <Background />
                <group ref={groupRef}>
                    <Title text="MY WEBSITE"/>
                    {info.map((item) => (
                        <Sphere 
                            key={item.id}
                            id={item.id} 
                            scale={item.scale} 
                            position={item.position} 
                            frag={item.frag}
                            groupPos={item.groupPos}
                            groupRtt={item.groupRtt}
                            labelPos={item.labelPos}
                            selected={selected}
                            selection={selection}
                            setIsVisible={setIsVisible}
                            groupRef={groupRef}
                        />    
                    ))}
                </group>
            </Canvas>
        </div>
    );
}