import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

@Component({
  selector: 'app-transform-tool',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './transform-tool.component.html',
  styleUrl: './transform-tool.component.scss',
})
export class TransformToolComponent implements AfterViewInit {
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

      const orbit = new OrbitControls(camera, renderer.domElement);
      camera.position.set(-90, 140, 140);
      orbit.update();

      const planet_texture = new THREE.TextureLoader().load("");
        const planet_geometry = new THREE.SphereGeometry(15, 32, 16);
        const planet_material = new THREE.MeshStandardMaterial({
          map: planet_texture,
        });
        const planet = new THREE.Mesh(planet_geometry, planet_material);



    }
  }
}
