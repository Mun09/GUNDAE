import * as THREE from 'three';
import { useThree} from "@react-three/fiber";
import { useLoader } from '@react-three/fiber';

const BackGround = (props) => {
    console.log(1);

    const texture = useLoader(THREE.TextureLoader, "/assets/m2.jpg");
  
    const { gl } = useThree();
  
    const formatted = new THREE.WebGLCubeRenderTarget(
      texture.image.height
    ).fromEquirectangularTexture(gl, texture);
  
    return <primitive attach="background" object={formatted.texture} />;
};

export default BackGround;
