import { useEffect, useState } from "react";

const FPSCounter = () => {
    const [fps, setFps] = useState(0);
  
    // FPS를 측정하고 업데이트합니다.
    useEffect(() => {
      let lastTimestamp = performance.now();
      let frameCount = 0;
  
      const updateFps = () => {
        const now = performance.now();
        const elapsed = now - lastTimestamp;
  
        if (elapsed >= 1000) {
          setFps(frameCount);
          frameCount = 0;
          lastTimestamp = now;
        }
  
        frameCount++;
        requestAnimationFrame(updateFps);
      };
  
      requestAnimationFrame(updateFps);
    }, []);
  
    return (<div>FPS: {fps}</div>);
  }

  export default FPSCounter;