import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: string; y: string }>({ x: '42.10', y: '-12.44' });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 580;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(2.5, 1.8, 4.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff3e0, 2.9);
    sunLight.position.set(-4, 6, 4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    const cobaltRim = new THREE.DirectionalLight(0x4267d5, 1.5);
    cobaltRim.position.set(4, -2, -2);
    scene.add(cobaltRim);

    const tangerineFill = new THREE.PointLight(0xff8748, 1.8, 12);
    tangerineFill.position.set(1.5, 2.5, 2);
    scene.add(tangerineFill);

    // Main composition group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Polished Chrome Mirror Sphere
    const sphereGeo = new THREE.SphereGeometry(0.85, 64, 64);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.96,
      roughness: 0.06,
      envMapIntensity: 1.6
    });
    const chromeSphere = new THREE.Mesh(sphereGeo, chromeMat);
    chromeSphere.position.set(-0.6, 0.2, 0.3);
    chromeSphere.castShadow = true;
    chromeSphere.receiveShadow = true;
    mainGroup.add(chromeSphere);

    // 2. High-Transmission Amber Glass Form with Refraction
    const amberGeo = new THREE.TorusGeometry(0.95, 0.28, 48, 128);
    const amberMat = new THREE.MeshPhysicalMaterial({
      color: 0xffa05a,
      emissive: 0x441400,
      metalness: 0.02,
      roughness: 0.05,
      transmission: 0.95,
      thickness: 1.85,
      ior: 1.68,
      transparent: true,
      opacity: 0.98,
      attenuationColor: new THREE.Color(0xff6b1a),
      attenuationDistance: 0.8
    });
    const amberGlass = new THREE.Mesh(amberGeo, amberMat);
    amberGlass.position.set(0.2, -0.1, -0.2);
    amberGlass.rotation.set(Math.PI / 3, Math.PI / 6, 0);
    amberGlass.castShadow = true;
    amberGlass.receiveShadow = true;
    mainGroup.add(amberGlass);

    // 3. Cobalt Blue Geometric Monolith
    const cobaltGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.6, 6);
    const cobaltMat = new THREE.MeshStandardMaterial({
      color: 0x4267d5,
      roughness: 0.20,
      metalness: 0.25
    });
    const cobaltBlock = new THREE.Mesh(cobaltGeo, cobaltMat);
    cobaltBlock.position.set(0.9, -0.4, 0.6);
    cobaltBlock.rotation.set(-0.2, 0.4, 0.15);
    cobaltBlock.castShadow = true;
    cobaltBlock.receiveShadow = true;
    mainGroup.add(cobaltBlock);

    // 4. Butter Yellow Architectural Orb
    const yellowGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const yellowMat = new THREE.MeshStandardMaterial({
      color: 0xf1d56b,
      roughness: 0.32,
      metalness: 0.05
    });
    const yellowOrb = new THREE.Mesh(yellowGeo, yellowMat);
    yellowOrb.position.set(-0.9, -0.7, 1.1);
    yellowOrb.castShadow = true;
    mainGroup.add(yellowOrb);

    // 5. Sage Green Floating Torus Ring
    const sageGeo = new THREE.TorusGeometry(0.45, 0.08, 16, 64);
    const sageMat = new THREE.MeshStandardMaterial({
      color: 0xb6d9c8,
      roughness: 0.38,
      metalness: 0.15
    });
    const sageRing = new THREE.Mesh(sageGeo, sageMat);
    sageRing.position.set(0.3, 1.1, -0.4);
    sageRing.rotation.set(1.2, -0.4, 0.8);
    mainGroup.add(sageRing);

    // Soft Studio Pedestal / Shadow Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(12, 12);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.25;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Pointer & Drag Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const normX = (clientX / width - 0.5) * 2;
      const normY = (clientY / height - 0.5) * 2;

      setCoords({
        x: (normX * 50).toFixed(2),
        y: (-normY * 50).toFixed(2)
      });

      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        targetX += deltaX * 0.01;
        targetY += deltaY * 0.01;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      } else {
        mouseX = normX;
        mouseY = normY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const clientX = touch.clientX - rect.left;
        const clientY = touch.clientY - rect.top;
        mouseX = (clientX / width - 0.5) * 2;
        mouseY = (clientY / height - 0.5) * 2;
        setCoords({
          x: (mouseX * 50).toFixed(2),
          y: (-mouseY * 50).toFixed(2)
        });
      }
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchmove', onTouchMove, { passive: true });

    // Render loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      mainGroup.rotation.y = time * 0.18 + targetX * 0.45;
      mainGroup.rotation.x = Math.sin(time * 0.12) * 0.08 - targetY * 0.35;

      amberGlass.rotation.z = time * 0.25;
      amberGlass.rotation.x = Math.PI / 3 + Math.cos(time * 0.3) * 0.1;

      chromeSphere.position.y = 0.2 + Math.sin(time * 0.8) * 0.05;
      sageRing.rotation.y = time * 0.4;
      yellowOrb.position.y = -0.7 + Math.cos(time * 0.9) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer with RAF batching and style-thrash prevention
    let resizeRafId: number | null = null;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length || !container) return;
      const entry = entries[0];
      const newWidth = Math.floor(entry.contentRect.width);
      const newHeight = Math.floor(entry.contentRect.height);

      if (newWidth <= 0 || newHeight <= 0) return;
      if (Math.abs(newWidth - width) < 2 && Math.abs(newHeight - height) < 2) return;

      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        width = newWidth;
        height = newHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      });
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeRafId !== null) cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchmove', onTouchMove);

      // Dispose Three.js resources
      sphereGeo.dispose();
      chromeMat.dispose();
      amberGeo.dispose();
      amberMat.dispose();
      cobaltGeo.dispose();
      cobaltMat.dispose();
      yellowGeo.dispose();
      yellowMat.dispose();
      sageGeo.dispose();
      sageMat.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-[520px] lg:h-[600px] select-none cursor-grab active:cursor-grabbing bg-gradient-to-br from-surface to-surface-variant overflow-hidden shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js canvas mount point */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top HUD Telemetry */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none text-xs">
        <span className="px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-mono shadow-sm">
          RENDER: SHADER_PASS_PBR // 60 FPS
        </span>
        <span className="px-2.5 py-1 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface font-label-mono shadow-sm">
          X: {coords.x} Y: {coords.y}
        </span>
      </div>

      {/* Bottom Architectural HUD Tag */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-none text-xs">
        <div className="px-3 py-1.5 bg-surface-container-lowest/95 backdrop-blur-md font-label-mono text-on-surface-variant shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
          <span>Interactive WebGL · Natural Sunlight &amp; Chrome Studio</span>
        </div>
        <div className="px-2.5 py-1 bg-inverse-surface text-inverse-on-surface font-label-mono shadow-sm">
          {isHovered ? 'DRAGGING ACTIVE' : 'DRAG TO ORBIT'}
        </div>
      </div>
    </div>
  );
}
