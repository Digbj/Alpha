import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Text, Stars } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import moonModel from './source/moon.gltf';
import newMoonModel from './source/moonhalfcut.gltf'; 
import brainRightModel from './source/brainright.gltf'; 
import brainLeftModel from './source/brainleft.gltf'; 
// import heartModel from './source/heart-shape.gltf'
import gsap from "gsap";


const Moon = () => {
  const moonRef = useRef();
  const newMoonRef = useRef();
  const rightBrainRef = useRef();
  const leftBrainRef = useRef();
  const arcLightRef = useRef();
  // const heartRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNewMoon, setShowNewMoon] = useState(false);
  const [showText, setShowText] = useState(true); // Adding new state for text visibility
  // const [showHeart, setShowHeart] = useState(false);


  // Animation for the rotating moon and displaying the text after the new moon is shown
  useFrame((state, delta) => {
    if (moonRef.current && !showNewMoon) {
      moonRef.current.rotation.x -= delta * 0.01; // Rotate in the y-axis
    }
  });

  // Loading the gltf models for the moon, the new moon, and the brain
  const moonGltf = useLoader(GLTFLoader, moonModel);
  const newMoonGltf = useLoader(GLTFLoader, newMoonModel);
  const rightBrainGltf = useLoader(GLTFLoader, brainRightModel);
  const leftBrainGltf = useLoader(GLTFLoader, brainLeftModel);
  // const heartGltf = useLoader(GLTFLoader, heartModel);


  // Creating the arc light
  const arcLight = new THREE.PointLight(0xffffff, 100, 100); 
  arcLight.position.set(0, 0.8, 0);

  // Event handler for the mouse wheel
  const handleMouseWheel = (event) => {
    if (!isAnimating && showText) {
      const deltaY = event.deltaY;
      //wheel event
      if (deltaY > 0) {
        animateModelOut();
      }
    }
  };

  // Event handler for clicking on the new moon
  const handleNewMoonClick = () => {
    if (!isAnimating && showNewMoon) {
      animateNewMoonClick();
    }
  };


  //Animation 
  const animateModelOut = () => {
    setIsAnimating(true);
    gsap.to(moonRef.current.position, { duration: 1, y: 0, z: 0 });
    gsap.to(moonRef.current.material, {
      duration: 1,
      opacity: 0,
      onComplete: () => {
        setShowNewMoon(true);
        setShowText(false);
        setIsAnimating(false);
      },
    });
    gsap.to(moonRef.current.scale, { duration: 0.1, x: 1, y: 1, z: 1, ease: "back.in(2.5)" });
  };

  const animateNewMoonClick = () => {
    setIsAnimating(true);
    // Rotate the new moon by 180 degrees
    gsap.to(newMoonRef.current.rotation, { duration:0.20, y:-Math.PI/2  });
    gsap.to(newMoonRef.current.scale, { duration: 0.5, x:0.8, y:0.8, z:0.8});
    
    // For the right brain model
    gsap.to(rightBrainRef.current.position, { duration: 1, x: 1.5, y: 0 });
    gsap.to(rightBrainRef.current.rotation, { duration: 1, x: -Math.PI });
    gsap.to(rightBrainRef.current.scale, { duration: 1, x: 1, y: 1, z: 1 });
    gsap.to(rightBrainRef.current.material, { duration: 1, opacity: 1 });

    // For the left brain model
    gsap.to(leftBrainRef.current.position, { duration: 1, x: 1.5, y: 0 });
    gsap.to(leftBrainRef.current.rotation, { duration: 1, x: -Math.PI });
    gsap.to(leftBrainRef.current.scale, { duration: 1, x: 1, y: 1, z: 1 });
    gsap.to(leftBrainRef.current.material, { duration: 1, opacity: 1 });

    gsap.to(".alpha-text", { duration: 1, opacity: 0 });


  };

  const handleBrainClick = () => {
    if (!isAnimating && showNewMoon) {
      setIsAnimating(true);
      gsap.to(rightBrainRef.current.position, { duration: 0.02, x:-8, y: 0,z:0, opacity: 0, scale: 10 });
      gsap.to(leftBrainRef.current.position, { duration:  0.02, x:-8, y: 0,z:-0, opacity: 0, scale: 10, onComplete: () => setIsAnimating(false) });
    }
    // setShowHeart(true);
  };
  


  return (
    <>
      {!showNewMoon ? (
        <group onWheel={handleMouseWheel}>
          <primitive ref={moonRef} object={moonGltf.scene} scale={1.5} position={[0, -8, 6]} />
          <primitive ref={arcLightRef} object={arcLight}/>
          {showText && (
            <Text className="alpha-text" position={[0, 0, 0]} fontSize={2}>
              THE ALPHA AGENCY
            </Text>
          )}
        </group>
      ) : (
        <group onClick={handleNewMoonClick}>
          <group onClick={handleBrainClick} ref={newMoonRef} scale={1}>
            {/* Render the new moon model in the center */}
            <primitive object={newMoonGltf.scene} position={[4, 0, 0]}/>
            {/* Render the brain models beside the new moon */}
            <group ref={rightBrainRef} scale={0.8} position={[0, 0, 0]}>
          <primitive object={rightBrainGltf.scene} />
        </group>
        <group ref={leftBrainRef} scale={0.8} position={[0, 0, 0]}>
          <primitive object={leftBrainGltf.scene} />
        </group>
          </group>
          {/* Display the text */}
          {showText && (
            <Text className="alpha-text" position={[0, 5, 0]} fontSize={2}>
              ATTAIN THE NIRVANA
            </Text>
          )}
        </group>
      )}
      <Stars
        radius={100} 
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
    </>
  );
};

export default Moon;
