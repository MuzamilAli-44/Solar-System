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
      ); // Ensure the path is correct
      scene.background = background;

      // Sun Orbit object
      const sun_orbit = new THREE.Group();
      scene.add(sun_orbit);

      // Creating Sun
      const sun_texture = new THREE.TextureLoader().load(
        '../../assets/sun.jpg'
      ); // Ensure the path is correct
      const sun_geometry = new THREE.SphereGeometry(20, 32, 16);
      const sun_material = new THREE.MeshStandardMaterial({
        map: sun_texture,
      });
      const sun = new THREE.Mesh(sun_geometry, sun_material);
      sun_orbit.add(sun);

      // Earth Orbit object
      const earth_orbit = new THREE.Group();
      sun_orbit.add(earth_orbit);

      // Creating Earth
      const earth_texture = new THREE.TextureLoader().load(
        '../../assets/earth.jpg'
      ); // Ensure the path is correct
      const earth_geometry = new THREE.SphereGeometry(15, 32, 16);
      const earth_material = new THREE.MeshStandardMaterial({
        map: earth_texture,
      });
      const earth = new THREE.Mesh(earth_geometry, earth_material);
      earth_orbit.add(earth);
      earth_orbit.position.set(earth_radius, 0, 0);

      // Creating Earth Orbit Line
      const earth_orbit_points = [];
      const earth_orbit_radius = earth_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        earth_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * earth_orbit_radius,
            0,
            Math.sin(angle) * earth_orbit_radius
          )
        );
      }
      const earth_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        earth_orbit_points
      );
      const orbit_material = new THREE.LineBasicMaterial({ color: 0xffffff });
      const earth_orbit_line = new THREE.LineLoop(
        earth_orbit_geometry,
        orbit_material
      );
      scene.add(earth_orbit_line);

      // Moon Orbit object
      const moon_orbit = new THREE.Group();
      earth_orbit.add(moon_orbit);

      // Creating Moon
      const moon_texture = new THREE.TextureLoader().load(
        '../../assets/moon.jpg'
      ); // Ensure the path is correct
      const moon_geometry = new THREE.SphereGeometry(9, 32, 16);
      const moon_material = new THREE.MeshStandardMaterial({
        map: moon_texture,
      });
      const moon = new THREE.Mesh(moon_geometry, moon_material);
      moon_orbit.position.set(moon_radius, 0, 0);
      moon_orbit.add(moon);

      // Creating Moon Orbit Line
      const moon_orbit_points = [];
      const moon_orbit_radius = moon_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        moon_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * moon_orbit_radius,
            0,
            Math.sin(angle) * moon_orbit_radius
          )
        );
      }
      const moon_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        moon_orbit_points
      );
      const moon_orbit_line = new THREE.LineLoop(
        moon_orbit_geometry,
        orbit_material
      );
      earth.add(moon_orbit_line);

      // All other planets

      // Mercury
      // mercury Orbit object
      const mercury_orbit = new THREE.Group();
      sun_orbit.add(mercury_orbit);

      // Creating mercury
      const mercury_texture = new THREE.TextureLoader().load(
        '../../assets/mercury.jpg'
      ); // Ensure the path is correct
      const mercury_geometry = new THREE.SphereGeometry(15, 32, 16);
      const mercury_material = new THREE.MeshStandardMaterial({
        map: mercury_texture,
      });
      const mercury = new THREE.Mesh(mercury_geometry, mercury_material);
      mercury_orbit.add(mercury);
      mercury_orbit.position.set(mercury_radius, 0, 0);

      // Creating mercury Orbit Line
      const mercury_orbit_points = [];
      const mercury_orbit_radius = mercury_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        mercury_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * mercury_orbit_radius,
            0,
            Math.sin(angle) * mercury_orbit_radius
          )
        );
      }
      const mercury_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        mercury_orbit_points
      );
      const mercury_orbit_line = new THREE.LineLoop(
        mercury_orbit_geometry,
        orbit_material
      );
      scene.add(mercury_orbit_line);

      // Venus
      // venus Orbit object
      const venus_orbit = new THREE.Group();
      sun_orbit.add(venus_orbit);

      // Creating venus
      const venus_texture = new THREE.TextureLoader().load(
        '../../assets/venus.jpg'
      ); // Ensure the path is correct
      const venus_geometry = new THREE.SphereGeometry(15, 32, 16);
      const venus_material = new THREE.MeshStandardMaterial({
        map: venus_texture,
      });
      const venus = new THREE.Mesh(venus_geometry, venus_material);
      venus_orbit.add(venus);
      venus_orbit.position.set(venus_radius, 0, 0);

      // Creating venus Orbit Line
      const venus_orbit_points = [];
      const venus_orbit_radius = venus_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        venus_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * venus_orbit_radius,
            0,
            Math.sin(angle) * venus_orbit_radius
          )
        );
      }
      const venus_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        venus_orbit_points
      );
      const venus_orbit_line = new THREE.LineLoop(
        venus_orbit_geometry,
        orbit_material
      );
      scene.add(venus_orbit_line);

      // Mars

      // mars Orbit object
      const mars_orbit = new THREE.Group();
      sun_orbit.add(mars_orbit);

      // Creating mars
      const mars_texture = new THREE.TextureLoader().load(
        '../../assets/mars.jpg'
      ); // Ensure the path is correct
      const mars_geometry = new THREE.SphereGeometry(15, 32, 16);
      const mars_material = new THREE.MeshStandardMaterial({
        map: mars_texture,
      });
      const mars = new THREE.Mesh(mars_geometry, mars_material);
      mars_orbit.add(mars);
      mars_orbit.position.set(mars_radius, 0, 0);

      // Creating mars Orbit Line
      const mars_orbit_points = [];
      const mars_orbit_radius = mars_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        mars_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * mars_orbit_radius,
            0,
            Math.sin(angle) * mars_orbit_radius
          )
        );
      }
      const mars_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        mars_orbit_points
      );
      const mars_orbit_line = new THREE.LineLoop(
        mars_orbit_geometry,
        orbit_material
      );
      scene.add(mars_orbit_line);

      // Jupiter

      // jupiter Orbit object
      const jupiter_orbit = new THREE.Group();
      sun_orbit.add(jupiter_orbit);

      // Creating jupiter
      const jupiter_texture = new THREE.TextureLoader().load(
        '../../assets/jupiter.jpg'
      ); // Ensure the path is correct
      const jupiter_geometry = new THREE.SphereGeometry(15, 32, 16);
      const jupiter_material = new THREE.MeshStandardMaterial({
        map: jupiter_texture,
      });
      const jupiter = new THREE.Mesh(jupiter_geometry, jupiter_material);
      jupiter_orbit.add(jupiter);
      jupiter_orbit.position.set(jupiter_radius, 0, 0);

      // Creating jupiter Orbit Line
      const jupiter_orbit_points = [];
      const jupiter_orbit_radius = jupiter_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        jupiter_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * jupiter_orbit_radius,
            0,
            Math.sin(angle) * jupiter_orbit_radius
          )
        );
      }
      const jupiter_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        jupiter_orbit_points
      );
      const jupiter_orbit_line = new THREE.LineLoop(
        jupiter_orbit_geometry,
        orbit_material
      );
      scene.add(jupiter_orbit_line);

      // Saturn

      // saturn Orbit object
      const saturn_orbit = new THREE.Group();
      sun_orbit.add(saturn_orbit);

      // Creating saturn
      const saturn_texture = new THREE.TextureLoader().load(
        '../../assets/saturn.jpg'
      ); // Ensure the path is correct
      const saturn_geometry = new THREE.SphereGeometry(15, 32, 16);
      const saturn_material = new THREE.MeshStandardMaterial({
        map: saturn_texture,
      });
      const saturn = new THREE.Mesh(saturn_geometry, saturn_material);
      saturn_orbit.add(saturn);
      saturn_orbit.position.set(saturn_radius, 0, 0);

      // Creating saturn Orbit Line
      const saturn_orbit_points = [];
      const saturn_orbit_radius = saturn_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        saturn_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * saturn_orbit_radius,
            0,
            Math.sin(angle) * saturn_orbit_radius
          )
        );
      }
      const saturn_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        saturn_orbit_points
      );
      const saturn_orbit_line = new THREE.LineLoop(
        saturn_orbit_geometry,
        orbit_material
      );
      scene.add(saturn_orbit_line);

      // Uranus

      // uranus Orbit object
      const uranus_orbit = new THREE.Group();
      sun_orbit.add(uranus_orbit);

      // Creating uranus
      const uranus_texture = new THREE.TextureLoader().load(
        '../../assets/uranus.jpg'
      ); // Ensure the path is correct
      const uranus_geometry = new THREE.SphereGeometry(15, 32, 16);
      const uranus_material = new THREE.MeshStandardMaterial({
        map: uranus_texture,
      });
      const uranus = new THREE.Mesh(uranus_geometry, uranus_material);
      uranus_orbit.add(uranus);
      uranus_orbit.position.set(uranus_radius, 0, 0);

      // Creating uranus Orbit Line
      const uranus_orbit_points = [];
      const uranus_orbit_radius = uranus_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        uranus_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * uranus_orbit_radius,
            0,
            Math.sin(angle) * uranus_orbit_radius
          )
        );
      }
      const uranus_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        uranus_orbit_points
      );
      const uranus_orbit_line = new THREE.LineLoop(
        uranus_orbit_geometry,
        orbit_material
      );
      scene.add(uranus_orbit_line);

      // Neptune

      // neptune Orbit object
      const neptune_orbit = new THREE.Group();
      sun_orbit.add(neptune_orbit);

      // Creating neptune
      const neptune_texture = new THREE.TextureLoader().load(
        '../../assets/neptune.jpg'
      ); // Ensure the path is correct
      const neptune_geometry = new THREE.SphereGeometry(15, 32, 16);
      const neptune_material = new THREE.MeshStandardMaterial({
        map: neptune_texture,
      });
      const neptune = new THREE.Mesh(neptune_geometry, neptune_material);
      neptune_orbit.add(neptune);
      neptune_orbit.position.set(neptune_radius, 0, 0);

      // Creating neptune Orbit Line
      const neptune_orbit_points = [];
      const neptune_orbit_radius = neptune_radius;
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        neptune_orbit_points.push(
          new THREE.Vector3(
            Math.cos(angle) * neptune_orbit_radius,
            0,
            Math.sin(angle) * neptune_orbit_radius
          )
        );
      }
      const neptune_orbit_geometry = new THREE.BufferGeometry().setFromPoints(
        neptune_orbit_points
      );
      const neptune_orbit_line = new THREE.LineLoop(
        neptune_orbit_geometry,
        orbit_material
      );
      scene.add(neptune_orbit_line);

      camera.position.z = 150; // Adjusted to make the earth visible

      // Render the scene and camera to animate it
      function animate() {
        sun_orbit.rotation.y += 0.004;
        earth_orbit.rotation.y += 0.05;

        earth.rotation.y += 0.01;
        moon.rotation.x += 0.01;
        moon.rotation.y += 0.01;

        mercury.rotation.y += 0.09;
        venus.rotation.y += 0.08;
        mars.rotation.y += 0.03;
        jupiter.rotation.y += 0.02;
        saturn.rotation.y += 0.01;
        uranus.rotation.y += 0.009;
        neptune.rotation.y += 0.008;

        renderer.render(scene, camera);
      }
      renderer.setAnimationLoop(animate);
    }
  }
}
