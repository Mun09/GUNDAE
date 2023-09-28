import * as THREE from 'three';
import { Suspense, useEffect, useRef, useState } from "react";
import Earth from "./Earth";
import { Physics, useSphere} from "@react-three/cannon";
import { Sphere, Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


const MainContainer = (props) => {

    const [gravity, setGravity] = useState([0, -9.8, 0]);
    const { Spec, ChangingSpec } = props;

    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[0, 0, 10]} intensity={0.5}/>

            <Suspense>
                <Physics debug gravity={gravity}>
                <FixedSphere />
                <RotatingSphere 
                    setGravity={setGravity} 
                    trailLength={props.trailLength} 
                    Spec={Spec} 
                    ChangingSpec={ChangingSpec}
                />
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
                <meshStandardMaterial 
                    color={"red"} 
                    emissive={"yellow"}
                    emissiveIntensity={0.5}
                />
            </mesh>
        </>
    )

}

const RotatingSphere = (props) => {
    const {trailLength, Spec, ChangingSpec} = props;
    const ballinitpos = Spec.position;
    const initvelocity = Spec.velocity;

    const pos = useRef(new THREE.Vector3(ballinitpos[0], ballinitpos[1], ballinitpos[2]));
    const vel = useRef(new THREE.Vector3(initvelocity[0], initvelocity[1], initvelocity[2]));

    const trailRef = useRef(new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0x00ff00 })));
    const [trailPoints, settrailPoints] = useState([]);


    const [ballRef, api] = useSphere(() => (Spec));

    useEffect(() => {
        api.position.subscribe((v) => {return (pos.current = new THREE.Vector3(v[0], v[1], v[2]))});
        api.velocity.subscribe((v) => {vel.current = new THREE.Vector3(v[0], v[1], v[2])});
    }, [ballRef, props, api]);

    useEffect(()=>{
        const {sizeofvelocity} = ChangingSpec;
        
        console.log(vel);
        const ratio = sizeofvelocity / vel.current.length();
        api.velocity.set(vel.current.x * ratio, vel.current.y * ratio, vel.current.z * ratio);
    }, [ChangingSpec])

    useEffect(() => {
            settrailPoints(
                trailPoints.length >= trailLength
                ? trailPoints.filter((_, index) => index >= 3)
                : [...trailPoints, pos.current.x, pos.current.y, pos.current.z]
            );
            
            const trailMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
            const trailGeometry = new THREE.BufferGeometry();
    
            // 궤적을 그리기 위한 버퍼 속성을 생성합니다.
            const positions = new Float32Array(trailPoints); // 100개의 포인트를 저장할 버퍼
            trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
            // 궤적 라인을 생성합니다.
            const trailLine = new THREE.Line(trailGeometry, trailMaterial);
            trailLine.frustumCulled = false; // 시야 영역에 관계없이 항상 렌더링
    
            // 궤적 라인을 Ref에 할당합니다.
            trailRef.current = trailLine;
    
            // 실제로 Three.js 객체를 렌더링하기 위해 scene에 추가합니다.
            api.trail = trailLine;
    }, [trailRef, trailPoints, trailLength, api]);

    useFrame(()=>{
        let length = -pos.current.length() / 9.8;
        props.setGravity([pos.current.x / length, pos.current.y / length, pos.current.z / length]);
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