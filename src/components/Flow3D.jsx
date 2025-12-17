import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Text, Float, Line, useCursor, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const GiftBox = ({ position, onClick, isSelected }) => {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  useCursor(hovered)

  useFrame((state) => {
    if (mesh.current) {
        mesh.current.rotation.y += 0.01
        if (isSelected) {
            mesh.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
        } else {
            mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        }
    }
  })

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh 
            ref={mesh} 
            onClick={onClick} 
            onPointerOver={() => setHover(true)} 
            onPointerOut={() => setHover(false)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={isSelected ? "#3B82F6" : "#F43F5E"} />
        </mesh>
        
        {/* Ribbon */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[1.05, 0.2, 1.05]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.05, 0.2, 1.05]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      </Float>
    </group>
  )
}

const FlowConnection = ({ start, end }) => {
    return (
        <Line 
            points={[start, end]} 
            color="#E2E8F0" 
            lineWidth={2} 
            dashed 
            dashScale={50}
        />
    )
}

const LocationNode = ({ position, icon, label, subLabel }) => {
  return (
      <group position={position}>
          <mesh>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#94A3B8" />
          </mesh>
          <Html position={[0, 1, 0]} center>
              <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
                  <div style={{ fontSize: '24px', marginBottom: '5px' }}>{icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B' }}>{label}</div>
                  {subLabel && <div style={{ fontSize: '10px', color: '#64748B' }}>{subLabel}</div>}
              </div>
          </Html>
      </group>
  )
}

const Scene = () => {
    const [step, setStep] = useState(0)

    const points = [
        [-4, 0, 0], // Fan
        [0, 1, 0],  // Cloud/Processing
        [4, 0, 0]   // Creator
    ]

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            
            {/* Steps Visuals */}
            
            {/* Sender / Fan */}
            <LocationNode 
                position={[-4, -0.5, 0]} 
                icon="📱" 
                label="Fan" 
                subLabel="Sends Gift" 
            />
            
            {/* Middle Pipeline - Factory Hub */}
            <group position={[0, -2, 0]}>
                 {/* Main Factory Building */}
                 <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                     <boxGeometry args={[1.5, 1, 1.2]} />
                     <meshStandardMaterial color="#EFF6FF" roughness={0.2} metalness={0.1} />
                 </mesh>
                 
                 {/* Roof Details */}
                 <mesh position={[-0.4, 1.1, 0]} rotation={[0, 0, Math.PI/4]}>
                     <boxGeometry args={[0.5, 0.5, 1.2]} />
                     <meshStandardMaterial color="#DBEAFE" />
                 </mesh>
                 <mesh position={[0.4, 1.1, 0]} rotation={[0, 0, Math.PI/4]}>
                     <boxGeometry args={[0.5, 0.5, 1.2]} />
                     <meshStandardMaterial color="#DBEAFE" />
                 </mesh>

                 {/* Smokestack */}
                 <mesh position={[0.5, 1.3, 0.3]}>
                     <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
                     <meshStandardMaterial color="#CBD5E1" />
                 </mesh>
                 {/* Smoke Particles Hint */}
                 <mesh position={[0.5, 2, 0.3]}>
                      <sphereGeometry args={[0.15, 8, 8]} />
                      <meshStandardMaterial color="white" transparent opacity={0.5} />
                 </mesh>
                 
                 {/* Factory Door/Entrance */}
                 <mesh position={[0, 0.2, 0.61]}>
                     <planeGeometry args={[0.5, 0.6]} />
                     <meshStandardMaterial color="#1E293B" />
                 </mesh>

                 {/* Logo on Wall */}
                 <Text
                    position={[0, 0.5, 0.61]}
                    fontSize={0.2}
                    color="#3B82F6"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                 >
                    Giftify
                 </Text>
                 
                 {/* "Hub" Text Label below */}
                 <Html position={[0, -0.8, 0]} center>
                    <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
                       <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1E293B' }}>Secure Hub</div>
                       <div style={{ fontSize: '10px', color: '#64748B' }}>Address Encrypted</div>
                    </div>
                 </Html>

                {/* Secure Tag Floating Above Hub */}
                <Html position={[0, 2.8, 0]} center>
                    <div style={{ 
                        background: 'white', 
                        padding: '6px 12px', 
                        borderRadius: '8px', 
                        fontSize: '12px', 
                        fontWeight: 'bold', 
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
                        whiteSpace: 'nowrap', 
                        textAlign: 'center',
                        border: '1px solid #E2E8F0',
                        animation: 'float 3s ease-in-out infinite'
                    }}>
                        <div style={{ color: '#0F172A' }}>Address Hidden</div>
                        <div style={{ fontSize: '10px', color: '#10B981', marginTop: 2 }}>Secure Tag: #GH-99</div>
                    </div>
                </Html>
            </group>
            
            {/* Receiver / Creator */}
            <LocationNode 
                position={[4, -0.5, 0]} 
                icon="🏠" 
                label="Creator" 
                subLabel="Received!"
            />

            {/* Path Lines */}
            <FlowConnection start={[-4, 0, 0]} end={[0, 0, 0]} />
            <FlowConnection start={[0, 0, 0]} end={[4, 0, 0]} />

            {/* Moving Gift */}
            <GiftBox 
                position={[0, 0, 0]} 
                isSelected={true}
                onClick={() => setStep((s) => (s + 1) % 2)}
            />
            
            <Html position={[0, 2, 0]} center>
                <div style={{ textAlign: 'center', width: '200px' }}>
                    <div style={{ background: '#EFF6FF', padding: '10px', borderRadius: '12px', border: '1px solid #3B82F6' }}>
                        <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 'bold' }}>Creator View</div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>New Gift Received</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                             Location: <span style={{ color: '#0F172A' }}>California, USA</span>
                        </div>
                        <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px', fontStyle: 'italic' }}>
                            (Full address hidden)
                        </div>
                    </div>
                </div>
            </Html>
            
            <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/2} />
        </>
    )
}

const Flow3D = () => {
  return (
    <div style={{ width: '100%', height: '400px', background: '#F8FAFC', borderRadius: '24px', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
            <Scene />
        </Canvas>
    </div>
  )
}

export default Flow3D
