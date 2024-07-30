import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import * as THREE from 'three';

@Component({
  selector: 'app-transform-tool',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './transform-tool.component.html',
  styleUrls: ['./transform-tool.component.scss'],
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

      // Adding background image
      const background = new THREE.TextureLoader().load(
        '../../assets/transformTool/background.jpg'
      );
      scene.background = background;

      // Adding Light
      const light = new THREE.AmbientLight(0xffffff, 2);
      scene.add(light);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // // OrbitControls
      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.enableDamping = true;
      // controls.dampingFactor = 0.05;
      // controls.screenSpacePanning = false;
      // controls.minDistance = 10;
      // controls.maxDistance = 500;
      // controls.maxPolarAngle = Math.PI / 2;

      const cube_texture = new THREE.TextureLoader().load(
        '../../assets/solarsystem/neptune.jpg'
      );
      const cube_geometry = new THREE.BoxGeometry(100, 100, 100);
      const cube_material = new THREE.MeshStandardMaterial({
        map: cube_texture,
      });
      const cube = new THREE.Mesh(cube_geometry, cube_material);
      scene.add(cube);
      camera.position.z = 250;

      // Initial rotation quaternion
      const initialQuaternion = new THREE.Quaternion().copy(cube.quaternion);

      // TransformControls
      const transformControls = new TransformControls(
        camera,
        renderer.domElement
      );
      transformControls.attach(cube);
      scene.add(transformControls);

      transformControls.addEventListener('change', () => {
        if (
          transformControls.getMode() === 'rotate' &&
          transformControls.object
        ) {
          const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(
              transformControls.object.rotation.x,
              transformControls.object.rotation.y,
              transformControls.object.rotation.z,
              'XYZ'
            )
          );

          cube.quaternion
            .copy(initialQuaternion)
            .multiply(deltaRotationQuaternion);
        }
      });

      // Switch between translation, rotation, and scale modes
      window.addEventListener('keydown', function (event) {
        switch (event.key) {
          case 't': // Translate mode
            transformControls.setMode('translate');
            break;
          case 'r': // Rotate mode
            transformControls.setMode('rotate');
            break;
          case 's': // Scale mode
            transformControls.setMode('scale');
            break;
        }
      });

      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      renderer.setAnimationLoop(animate);
    }
  }
}
