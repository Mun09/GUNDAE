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
                <FixedSphere />
                <RotatingSphere setGravity={setGravity} />
                </Physics>
            </Suspense>
            
        </>
    )
}

const FixedSphere = () => {
    const ballinitpos = [0,0,0]
    const [ballRef, api] = useSphere(() => ({
        args: [4, 32, 32],
        position: ballinitpos,
        mass: 0,
        allowSleep: false
    }));

    return (
        <>
            <mesh ref={ballRef} >
                <sphereGeometry args={[4,32,32]}/>
                <meshStandardMaterial color={"red"} />
            </mesh>
        </>
    )

}

const RotatingSphere = (props) => {
    const ballinitpos = [5, 5, 5];
    const pos = useRef(new THREE.Vector3(ballinitpos[0], ballinitpos[1], ballinitpos[2]));
    const trailRef = useRef(new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0x00ff00 })));
    const trailPoints = useRef([]);

    const [ballRef, api] = useSphere(() => ({
        args: [1, 32, 32],
        position: ballinitpos,
        mass: 100,
        velocity: [-7,3,4]
    }));

    useEffect(() => {
        api.position.subscribe((v) => {return (pos.current = new THREE.Vector3(v[0], v[1], v[2]))});
    }, [ballRef, props]);

    useEffect(() => {
        
            const trailMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
            const trailGeometry = new THREE.BufferGeometry();
    
            // 궤적을 그리기 위한 버퍼 속성을 생성합니다.
            const positions = new Float32Array(100 * 3); // 100개의 포인트를 저장할 버퍼
            trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
            // 궤적 라인을 생성합니다.
            const trailLine = new THREE.Line(trailGeometry, trailMaterial);
            trailLine.frustumCulled = false; // 시야 영역에 관계없이 항상 렌더링
    
            // 궤적 라인을 Ref에 할당합니다.
            trailRef.current = trailLine;
    
            // 실제로 Three.js 객체를 렌더링하기 위해 scene에 추가합니다.
            api.trail = trailLine;

        console.log(trailLine);
        
    }, [trailRef]);

    

    useFrame(()=>{
        let length = -pos.current.length() / 9.8;
        props.setGravity([pos.current.x / length, pos.current.y / length, pos.current.z / length]);

        const trailMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
            const trailGeometry = new THREE.BufferGeometry();
    
            // 궤적을 그리기 위한 버퍼 속성을 생성합니다.
            const positions = new Float32Array(100 * 3); // 100개의 포인트를 저장할 버퍼
            trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
            // 궤적 라인을 생성합니다.
            const trailLine = new THREE.Line(trailGeometry, trailMaterial);
            trailLine.frustumCulled = false; // 시야 영역에 관계없이 항상 렌더링
    
            // 궤적 라인을 Ref에 할당합니다.
            trailRef.current = trailLine;
    
            // 실제로 Three.js 객체를 렌더링하기 위해 scene에 추가합니다.
            api.trail = trailLine;
    });

    return (
        <>
            <mesh ref={ballRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color={"blue"} />
            </mesh>
            <primitive object={trailRef.current} />

        </>
    )
}




export default MainContainer;