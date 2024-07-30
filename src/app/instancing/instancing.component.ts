import { Component, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-instancing',
  standalone: true,
  imports: [],
  templateUrl: './instancing.component.html',
  styleUrl: './instancing.component.scss',
})
export class InstancingComponent implements AfterViewInit {
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

      camera.position.set(0, 6, 15);
      camera.lookAt(scene.position);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.update();

      const cubeGeometry = new THREE.IcosahedronGeometry();
      const cubeMaterial = new THREE.MeshPhongMaterial({});
      const cubeMesh = new THREE.InstancedMesh(
        cubeGeometry,
        cubeMaterial,
        1000
      );
      scene.add(cubeMesh);

      const dummy = new THREE.Object3D();
      for (let i = 0; i < 1000; i++) {
        dummy.position.x = Math.random() * 40 - 20;
        dummy.position.y = Math.random() * 40 - 20;
        dummy.position.z = Math.random() * 40 - 20;

        dummy.rotation.x = Math.random() * 2 * Math.PI;
        dummy.rotation.y = Math.random() * 2 * Math.PI;
        dummy.rotation.z = Math.random() * 2 * Math.PI;

        dummy.scale.x = dummy.scale.y = dummy.scale.z = 0.8 * Math.random();

        dummy.updateMatrix();
        cubeMesh.setMatrixAt(i, dummy.matrix);
        cubeMesh.setColorAt(i, new THREE.Color(Math.random() * 0xffffff));

        function animate(time:number) {
         
          renderer.render(scene, camera);
        }
        renderer.setAnimationLoop(animate);
      }
    }
  }
}
