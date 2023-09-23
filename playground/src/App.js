import './App.css';
import * as React from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const App = () => {
  return (
    <>
      <Canvas>
      <OrbitControls autoRotate={true}/>
        <mesh>
          
          <ambientLight intensity={1} />
          <directionalLight position={[-1,0,1]} intensity={0.5}/>
          <boxGeometry args={[1,1,1]}></boxGeometry>
          <meshStandardMaterial attach={"material"} color={0xa3b18a} />
        </mesh>
      </Canvas>
    </>
  );
};

export default App;
