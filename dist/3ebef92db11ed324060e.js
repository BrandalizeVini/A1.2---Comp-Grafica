import"./style.css";import*as THREE from"three";import*as dat from"dat.gui";const loader=new THREE.TextureLoader,height=loader.load("height.png"),texture=loader.load("/texture.jpg"),alpha=loader.load("alpha.png"),gui=new dat.GUI,canvas=document.querySelector("canvas.webgl"),scene=new THREE.Scene,geometry=new THREE.PlaneBufferGeometry(3,3,64,64),material=new THREE.MeshStandardMaterial({color:"gray",map:texture,displacementMap:height,displacementScale:.6,alphaMap:alpha,transparent:!0,depthTest:!1}),plane=new THREE.Mesh(geometry,material);scene.add(plane),plane.rotation.x=181,gui.add(plane.rotation,"x").min(0).max(600);const pointLight=new THREE.PointLight("#00b3ff",3);pointLight.position.x=.2,pointLight.position.y=10,pointLight.position.z=4.4,scene.add(pointLight),gui.add(pointLight.position,"x"),gui.add(pointLight.position,"y"),gui.add(pointLight.position,"z");const col={color:"#00ff00"};gui.addColor(col,"color").onChange((()=>{pointLight.color.set(col.color)}));const sizes={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",(()=>{sizes.width=window.innerWidth,sizes.height=window.innerHeight,camera.aspect=sizes.width/sizes.height,camera.updateProjectionMatrix(),renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}));const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,.1,100);camera.position.x=0,camera.position.y=0,camera.position.z=3,scene.add(camera);const renderer=new THREE.WebGLRenderer({canvas});renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),document.addEventListener("mousemove",animateTerrain);let mouseY=0;function animateTerrain(e){mouseY=e.clientY}const clock=new THREE.Clock,tick=()=>{const e=clock.getElapsedTime();plane.rotation.z=.3*e,plane.material.displacementScale=.3+8e-4*mouseY,renderer.render(scene,camera),window.requestAnimationFrame(tick)};tick();