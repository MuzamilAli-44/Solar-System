import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';

@Component({
  selector: 'app-solar-system',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './solar-system.component.html',
  styleUrl: './solar-system.component.scss',
})
export class SolarSystemComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
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
      earth_orbit.position.set(60, 0, 0);

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
      moon_orbit.position.set(30, 0, 0);
      moon_orbit.add(moon);

      camera.position.z = 150; // Adjusted to make the earth visible

      // Render the scene and camera to animate it
      function animate() {
        sun_orbit.rotation.y += 0.004;
        earth_orbit.rotation.y += 0.05;


        earth.rotation.x += 0.01;
        earth.rotation.y += 0.01;
        moon.rotation.x += 0.01;
        moon.rotation.y += 0.01;

        renderer.render(scene, camera);
      }
      renderer.setAnimationLoop(animate);
    }
  }
}
