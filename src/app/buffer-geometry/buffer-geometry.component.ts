import { Component, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-buffer-geometry',
  standalone: true,
  imports: [],
  templateUrl: './buffer-geometry.component.html',
  styleUrl: './buffer-geometry.component.scss',
})
export class BufferGeometryComponent implements AfterViewInit {
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
      const light = new THREE.AmbientLight(0xffffff, 5);
      scene.add(light);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      camera.position.set(0, 6, 15);
      camera.lookAt(scene.position);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      const geometry = new THREE.BufferGeometry();

      const vertices = new Float32Array([
        // back
        -5, -5, -5, 5, -5, -5, 5, 5, -5, -5, -5, -5, 5, 5, -5, -5, 5, -5,

        // front
        -5, -5, 5, 5, -5, 5, 5, 5, 5, -5, -5, 5, 5, 5, 5, -5, 5, 5,

        // bottom
        -5, -5, -5, -5, -5, 5, 5, -5, 5, -5, -5, -5, 5, -5, -5, 5, -5, 5,

        // top
        -5, 5, -5, 5, 5, -5, -5, 5, 5, -5, 5, 5, 5, 5, 5, 5, 5, -5,

        // left
        -5, -5, -5, -5, -5, 5, -5, 5, 5, -5, 5, 5, -5, 5, -5, -5, -5, -5,

        // right
        5, -5, -5, 5, -5, 5, 5, 5, 5, 5, -5, -5, 5, 5, 5, 5, 5, -5,
      ]);

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      const material = new THREE.MeshBasicMaterial({
        color: 0x990000,
        side: THREE.DoubleSide,
        //wireframe : true
      });
      const mesh = new THREE.Mesh(geometry, material);

      scene.add(mesh);

      function animate() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
       // mesh.rotation.z += 0.005;
        renderer.render(scene, camera);
      }

      renderer.setAnimationLoop(animate);
    }
  }
}
