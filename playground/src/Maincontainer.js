import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from "react";
import Earth from "./Earth";
import { Physics, useSphere} from "@react-three/cannon";
import { Sphere, Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


const MainContainer = () => {

    const [gravity, setGravity] = useState([0, -9.8, 0]);

    return (
        <>
            <ambientLight intensity={0.1} />
            <directionalLight position={[10, -10, 0]} intensity={0.5}/>

            <Suspense>
                <Physics debug gravity={gravity}>

                <RotatingSphere setGravity={setGravity} />
                </Physics>
            </Suspense>
        </>
    )
}

const RotatingSphere = (props) => {
    const ballinitpos = [5, 5, 5];
    const pos = useRef(new THREE.Vector3(ballinitpos[0], ballinitpos[1], ballinitpos[2]));

    const [ballRef, api] = useSphere(() => ({
        args: [1, 32, 32],
        position: ballinitpos,
        mass: 1
    }));

    useEffect(() => {
        api.position.subscribe((v) => {return (pos.current = new THREE.Vector3(v[0], v[1], v[2]))});

        let sumup = 0;
        
        pos.current.forEach(a => {
            sumup += a;
        });
        console.log(pos/sumup);
        props.setGravity(pos/sumup);
    }, [ballRef]);

    useFrame(()=>{
        // console.log(pos);
        // accofgravity = pos;
    })

    return (
        <>
            <mesh ref={ballRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color={"blue"} />
            </mesh>
        </>
    )
}



export default MainContainer;