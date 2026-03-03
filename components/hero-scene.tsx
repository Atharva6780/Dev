"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Box } from "@react-three/drei"
import * as THREE from "three"

function ParticleField() {
  const count = 500
  const mesh = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3dd8c5"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingTorus() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3
      ref.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Torus ref={ref} args={[1.2, 0.15, 32, 100]} position={[3, 0.5, -2]}>
        <MeshDistortMaterial
          color="#3dd8c5"
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </Torus>
    </Float>
  )
}

function FloatingSphere() {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <Sphere args={[0.8, 64, 64]} position={[-3, -0.5, -1]}>
        <MeshDistortMaterial
          color="#1a4040"
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={3}
        />
      </Sphere>
    </Float>
  )
}

function WobblyCube() {
  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={2}>
      <Box args={[0.6, 0.6, 0.6]} position={[2, -2, 0]}>
        <MeshWobbleMaterial
          color="#3dd8c5"
          roughness={0.3}
          metalness={0.7}
          factor={0.6}
          speed={2}
          transparent
          opacity={0.5}
        />
      </Box>
    </Float>
  )
}

function GlowingOrb() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Sphere ref={ref} args={[1.5, 64, 64]} position={[0, 0, -3]}>
      <MeshDistortMaterial
        color="#0d2626"
        emissive="#3dd8c5"
        emissiveIntensity={0.15}
        roughness={0.1}
        metalness={1}
        distort={0.5}
        speed={1.5}
      />
    </Sphere>
  )
}

function IcosahedronWire() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15
      ref.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1} floatIntensity={1}>
      <mesh ref={ref} position={[-2, 2, -2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#3dd8c5"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#3dd8c5" />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#3dd8c5" />
        <pointLight position={[0, 5, 0]} intensity={0.2} color="#ffffff" />
        <ParticleField />
        <GlowingOrb />
        <FloatingTorus />
        <FloatingSphere />
        <WobblyCube />
        <IcosahedronWire />
      </Canvas>
    </div>
  )
}
