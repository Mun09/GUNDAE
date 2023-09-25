import { Suspense } from "react";
import Earth from "./Earth";
import { Perf } from "r3f-perf";
import { BallCollider, Physics, RigidBody } from "@react-three/rapier";
import { Sphere, Box } from "@react-three/drei";

const MainContainer = () => {
    return (
        <>
            {/* <Perf /> */}

            <ambientLight intensity={0.1} />
            <directionalLight position={[10, -10, 0]} intensity={0.5}/>

            <Suspense>
                <Physics debug gravity={[0,-3,0]}>
                    <RigidBody position={[1, 6, 1]} gravityScale={4}>
                        <BallCollider args={[3]} />
                        <Sphere position-y={0}>
                            <meshStandardMaterial color={"red"} />
                        </Sphere>

                    </RigidBody>

                    

                    <RigidBody type="fixed" restitution={2}>
                        <Box position={[0,0,0]} args={[10, 1, 10]}>
                            <meshStandardMaterial color={"springgreen"}></meshStandardMaterial>
                        </Box>
                    </RigidBody>
                    
                </Physics>
            </Suspense>
        </>
    )
}



export default MainContainer;