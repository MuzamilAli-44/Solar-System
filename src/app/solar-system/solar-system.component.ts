import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

@Component({
  selector: 'app-solar-system',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.scss'],
})
export class SolarSystemComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const mercury_radius = 50;
      const venus_radius = 100;
      const earth_radius = 150;
      const mars_radius = 200;
      const jupiter_radius = 250;
      const saturn_radius = 300;
      const uranus_radius = 350;
      const neptune_radius = 400;
      const moon_radius = 30;

      // Creating Scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      // Adding Light
      const light = new THREE.AmbientLight(0xffffff, 2);
      scene.add(light);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const orbit = new OrbitControls(camera, renderer.domElement);
      camera.position.set(-90, 140, 140);
      orbit.update();

      // Adding background image
      const background = new THREE.TextureLoader().load(
        '../../assets/background.jpg'
      );
      scene.background = background;

      // Creating Sun
      const sun_texture = new THREE.TextureLoader().load(
        '../../assets/sun.jpg'
      );
      const sun_geometry = new THREE.SphereGeometry(20, 32, 16);
      const sun_material = new THREE.MeshStandardMaterial({
        map: sun_texture,
      });
      const sun = new THREE.Mesh(sun_geometry, sun_material);
      scene.add(sun);

      // Function to create an orbit group and planet
      function createPlanet(name: string, radius: number, texturePath: string, rotationSpeed: number) {
        const planet_texture = new THREE.TextureLoader().load(texturePath);
        const planet_geometry = new THREE.SphereGeometry(15, 32, 16);
        const planet_material = new THREE.MeshStandardMaterial({
          map: planet_texture,
        });
        const planet = new THREE.Mesh(planet_geometry, planet_material);

        // Orbit object
        const orbitGroup = new THREE.Group();
        orbitGroup.add(planet);
        scene.add(orbitGroup);

        planet.position.set(radius, 0, 0);
        
        // Creating Orbit Line
        const orbit_points = [];
        for (let i = 0; i <= 64; i++) {
          const angle = (i / 64) * Math.PI * 2;
          orbit_points.push(
            new THREE.Vector3(
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            )
          );
        }
        const orbit_geometry = new THREE.BufferGeometry().setFromPoints(
          orbit_points
        );
        const orbit_material = new THREE.LineBasicMaterial({ color: 0xffffff });
        const orbit_line = new THREE.LineLoop(
          orbit_geometry,
          orbit_material
        );
        scene.add(orbit_line);

        return { orbitGroup, planet, rotationSpeed };
      }

      // Create all planets
      const mercury = createPlanet('mercury', mercury_radius, '../../assets/solarsystem/mercury.jpg', 0.09);
      const venus = createPlanet('venus', venus_radius, '../../assets/solarsystem/venus.jpg', 0.08);
      const earth = createPlanet('earth', earth_radius, '../../assets/solarsystem/earth.jpg', 0.05);
      const mars = createPlanet('mars', mars_radius, '../../assets/solarsystem/mars.jpg', 0.03);
      const jupiter = createPlanet('jupiter', jupiter_radius, '../../assets/solarsystem/jupiter.jpg', 0.02);
      const saturn = createPlanet('saturn', saturn_radius, '../../assets/solarsystem/saturn.jpg', 0.01);
      const uranus = createPlanet('uranus', uranus_radius, '../../assets/solarsystem/uranus.jpg', 0.009);
      const neptune = createPlanet('neptune', neptune_radius, '../../assets/solarsystem/neptune.jpg', 0.008);

      // Create Earth-Moon system
      const moon_texture = new THREE.TextureLoader().load(
        '../../assets/moon.jpg'
      );
      const moon_geometry = new THREE.SphereGeometry(9, 32, 16);
      const moon_material = new THREE.MeshStandardMaterial({
        map: moon_texture,
      });
      const moon = new THREE.Mesh(moon_geometry, moon_material);

      const moon_orbit = new THREE.Group();
      moon_orbit.add(moon);
      earth.planet.add(moon_orbit);

      moon.position.set(moon_radius, 0, 0);
      
      // Creating Moon Orbit Line
      const moon_orbit_points = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        moon_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * moon_radius,
            0,
            Math.sin(angle) * moon_radius
          )
        );
      }
      const moon_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        moon_orbit_points
      );
      const orbit_material = new THREE.LineBasicMaterial({ color: 0xffffff });

      const moon_orbit_line = new THREE.LineLoop(
        moon_orbit_geometry,
        orbit_material
      );
      moon_orbit.add(moon_orbit_line);

      camera.position.z = 150;

      // Raycaster and pointer for hovering effect
      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      const originalScales = new Map<THREE.Object3D, THREE.Vector3>();

      function onPointerMove(event: MouseEvent) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }

      function render() {
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);

        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            if (!originalScales.has(obj)) {
              originalScales.set(obj, obj.scale.clone());
            }
            obj.scale.copy(originalScales.get(obj) as THREE.Vector3);
          }
        });

        intersects.forEach((intersect) => {
          const obj = intersect.object;
          if (obj instanceof THREE.Mesh) {
            obj.scale.multiplyScalar(3);
          }
        });

        renderer.render(scene, camera);
        requestAnimationFrame(render);
      }

      window.addEventListener('pointermove', onPointerMove);
      render();

      function animate() {
        sun.rotation.y += 0.01;

        mercury.orbitGroup.rotation.y += mercury.rotationSpeed;
        venus.orbitGroup.rotation.y += venus.rotationSpeed;
        earth.orbitGroup.rotation.y += earth.rotationSpeed;
        mars.orbitGroup.rotation.y += mars.rotationSpeed;
        jupiter.orbitGroup.rotation.y += jupiter.rotationSpeed;
        saturn.orbitGroup.rotation.y += saturn.rotationSpeed;
        uranus.orbitGroup.rotation.y += uranus.rotationSpeed;
        neptune.orbitGroup.rotation.y += neptune.rotationSpeed;

        moon.rotation.x += 0.01;
        moon.rotation.y += 0.01;
        moon_orbit.rotation.y += 0.01;

        mercury.planet.rotation.y += mercury.rotationSpeed;
        venus.planet.rotation.y += venus.rotationSpeed;
        earth.planet.rotation.y += earth.rotationSpeed;
        mars.planet.rotation.y += mars.rotationSpeed;
        jupiter.planet.rotation.y += jupiter.rotationSpeed;
        saturn.planet.rotation.y += saturn.rotationSpeed;
        uranus.planet.rotation.y += uranus.rotationSpeed;
        neptune.planet.rotation.y += neptune.rotationSpeed;

        renderer.render(scene, camera);
      }
      renderer.setAnimationLoop(animate);
    }
  }
}
