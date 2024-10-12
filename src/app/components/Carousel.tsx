import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Project {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project 1",
    imageUrl: "/vancouver1.jpeg", // Replace with your image paths
    link: "https://yourproject1.com",
  },
  {
    id: 2,
    title: "Project 2",
    imageUrl: "/vancouver2.jpg",
    link: "https://yourproject2.com",
  },
  {
    id: 3,
    title: "Project 3",
    imageUrl: "/vancouver3.jpg",
    link: "https://yourproject3.com",
  },
];

const CarouselItem: React.FC<{ project: Project; index: number; total: number }> = ({
  project,
  index,
  total,
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const angle = (index / total) * Math.PI * 2;

  // Load the texture when the component mounts
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(project.imageUrl, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [project.imageUrl]);

  // Rotate the carousel
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[
        Math.cos(angle) * 3, // Calculate position in 3D space
        0,
        Math.sin(angle) * 3,
      ]}
    >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      {texture && (
        <meshBasicMaterial attach="material" map={texture} />
      )}
    </mesh>
  );
};

const Carousel: React.FC = () => {

  return (
    <div style={{ width: "100%", height: "100%"}}>
      <Canvas camera={{ position: [0, 3, 5] }}>
        {projects.map((project, index) => (
          <CarouselItem
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Carousel;
