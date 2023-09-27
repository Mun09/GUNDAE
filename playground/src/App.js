import './App.css';
import * as React from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MainContainer from './Maincontainer';


const App = () => {
  return (
    <>
      <div id="canvas-container">
        <Canvas
          shadows
          camera={{position: [20, 20, 20], fov: 30}}
        >
          <MainContainer />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
};

export default App;
