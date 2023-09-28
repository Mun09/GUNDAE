import './App.css';
import { useState, Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import MainContainer from './Maincontainer';
import FPSCounter from './FPScounter';
import TrailButton from './TrailButton';
import ChangeSpecButton from './ChangeSpecButton';
import BackGround from './Background';

const App = () => {
  const [trailLength, settrailLength] = useState(1000);
  const [Spec, setSpec] = useState({
    args: [1, 32, 32],
    position: [5, 5, 5],
    mass: 100,
    velocity: [-7,3,4]
  });

  const [ChangingSpec, setChangingSpec] = useState({
    sizeofvelocity : 40
  })


  return (
    <>
      <div id="canvas-container">
        <Canvas
          shadows
          camera={{position: [30, 30, 30], fov: 50}}
          style={{background: "black"}}
        >
          {/* <Suspense fallback={null}>
            <BackGround />
          </Suspense> */}
          
          <MainContainer trailLength={trailLength} Spec={Spec} ChangingSpec={ChangingSpec}/>
          <OrbitControls />
        </Canvas>

        <FPSCounter />
        <TrailButton trailLength={trailLength} settrailLength={settrailLength} /><br />
        <ChangeSpecButton ChangingSpec={ChangingSpec} setChangingSpec={setChangingSpec} />
        
        <div>Length of Trail : {trailLength}</div>
        <div>Size of Velocity : {ChangingSpec.sizeofvelocity} </div>
      </div>
    </>
  );
};

export default App;
