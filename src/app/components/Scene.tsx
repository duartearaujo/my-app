"use client";

import { use, useRef } from "react";
import { useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { Html } from "@react-three/drei";
import { useControls } from "leva";
import { Camera, DirectionalLight, Fog, FogExp2, Group, MeshPhysicalMaterial, ShaderMaterial, Texture, UniformsLib, UniformsUtils } from "three";
import { Mesh } from "three";
import { TextureLoader } from "three";
import { Text } from "@react-three/drei";
import CustomShaderMaterial from "three-custom-shader-material";

import vertex from '@/app/shaders/vertex.glsl';
import fragment from '@/app/shaders/fragment.glsl';
import vertex2 from '@/app/shaders/vertex2.glsl';
import fragment2 from '@/app/shaders/fragment2.glsl';
import planetfrag1 from '@/app/shaders/planetfrag1.glsl';
import planetfrag2 from '@/app/shaders/planetfrag2.glsl';
import planetfrag3 from '@/app/shaders/planetfrag3.glsl';
import planetvert1 from '@/app/shaders/planetvert1.glsl';

const info = {
    "About Me": {color: 0Xff0000, rotation: { x: 0, y: Math.PI/2, z: 0 }, groupPos: { x: -1, y: 1, z: 7 }},
    "Projects": {color: 0X00ff00, rotation: { x: 0, y: -Math.PI/2, z: 0 }, groupPos: { x: -1, y: 1, z: 9 }},
    "Contacts": {color: 0X0000ff, rotation: { x: Math.PI/5, y: 0, z: 0 }, groupPos: { x: 0, y: -3.15, z: 7.2 }}
}

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

function FogEffect({ selected }: { selected: string | null }) {

    const fogRef = useRef<FogExp2>(null);

    useEffect(() => {
        if (selected !== null) {
            gsap.to(fogRef.current, {
                delay: 0.5,
                duration: 1,
                density: 0.5
            });
            fogRef.current?.color.set(info[selected]['color']);
        }
        else {
            gsap.to(fogRef.current, {
                delay: 0.5,
                duration: 1,
                density: 0
            });
        }
    }, [selected]);

    return (
        <fogExp2 ref={fogRef} attach="fog" args={[0x0f0c11 , 0]} />
    );
}

function Background() {

    const ref = useRef<Mesh>(null);

    useFrame((state) => {
        const {clock} = state;
        ref.current.material.uniforms.uTime.value = clock.getElapsedTime();
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

function Sphere({ id, scale, position, selection, selected, groupRef, frag }) {

    const ref = useRef<Mesh>(null);
    const materialRef = useRef<CustomShaderMaterial | null>(null);

    let pos, rtt: { x: number; y: number; z: number };
    
    const sphereHandler = () => {
        selection(id);

        rtt = info[id]['rotation'];
        pos = info[id]['groupPos'];
        
        gsap.to(groupRef.current.rotation, {
            x: rtt.x,
            y: rtt.y,
            z: rtt.z,
            duration: 1,
            ease: "power2.inOut"
        });
        gsap.to(groupRef.current.position, {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            duration: 1,
            ease: "power2.inOut"
        });
    }

    useFrame((state) => {
        if (ref.current && materialRef.current) {
            const { clock } = state;
            ref.current.rotation.y += 0.0005;
            materialRef.current.uniforms.time.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={ref} position={ position } scale={ scale } onClick={sphereHandler} onPointerEnter={() => {document.body.style.cursor = 'pointer'}} onPointerLeave={() => {document.body.style.cursor = 'default'}}>
            <sphereGeometry args={[2.5, 64, 64]} />
            <CustomShaderMaterial 
                ref={materialRef}
                baseMaterial={MeshPhysicalMaterial} 
                vertexShader={planetvert1} 
                fragmentShader={frag} 
                uniforms={{
                    time: { value: 0 },
                    density: { value: 1.0 }
                }}
            />
            <Html position={[0, 0, 2.5]} center>
                <div className={`text-center text-white font-sans font-semibold text-lg rounded-md bg-violet-950/60 backdrop-blur-md p-2 ${(selected !== null) ? 'animate-fadeOut opacity-0' : 'animate-fadeIn'}`}>
                    {id}
                </div>
            </Html>
        </mesh>
    );
}

export default function Scene({ selection, selected }: { selection: (id: string | null) => void; selected: string | null }) {

    const cameraRef = useRef<Camera | null>(null);
    const groupRef = useRef<Group>(null);

    const cameraPosition = useControls('camera', {
        position: { value: { x: 0, y: 2, z: 5 }, step: 0.1 }
    });

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
            <Canvas camera={{position: [cameraPosition.position.x, cameraPosition.position.y, cameraPosition.position.z]}} onCreated={({camera}) => { cameraRef.current = camera }}>
                <Background />
                <group ref={groupRef}>
                    <Title text="MY WEBSITE"/>
                    <Sphere id={"About Me"} scale={1} position={ [ 4, -1.5, 1 ] } selection={selection} selected={selected} groupRef={groupRef} frag={planetfrag1}/>
                    <Sphere id={"Projects"} scale={0.8} position={ [ -6.5, -0.8, -3 ] } selection={selection} selected={selected} groupRef={groupRef} frag={planetfrag2}/>
                    <Sphere id={"Contacts"} scale={0.45} position={ [ 0, 1, -6 ] } selection={selection} selected={selected} groupRef={groupRef} frag={planetfrag3}/>
                </group>
            </Canvas>
        </div>
    );
}