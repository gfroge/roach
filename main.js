import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js'
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 
      window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas:  document.querySelector('#bg') 
})
renderer.setClearColor(0x878080)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setX(0);
camera.position.setY(60);
camera.position.setZ(200);
camera.rotation.x = -0.25;
// camera.rotation.order = 'YXZ';
const pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set( 0, 100, 200 );
scene.add( pointLight );

const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
// scene.add( pointLightHelper );


const size = 1000;
const divisions = 50;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// Orbit controls
// const controls = new OrbitControls(camera, renderer.domElement);

var OBJFile = 'models/MOD_Roach.obj';
var MTLFile = 'models/MOD_Roach.mtl';
var PNGFile = 'models/textures/ROACH_DIFF.png';

new MTLLoader()
.load(MTLFile, function (materials) {
    materials.preload();
    new OBJLoader()
        .setMaterials(materials)
        .load(OBJFile, function (object) {
            object.position.y = 50;
            object.rotation.x = 30;
            var texture = new THREE.TextureLoader().load(PNGFile);

            object.traverse(function (child) {   
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture;
                }
            });
            scene.add(object);
            // bouncing animation
            let step = 0;
            function animate () {
              requestAnimationFrame(animate);
          
              object.rotation.z += 0.02;
              step += 0.03;
              object.position.y = 50 * Math.abs(Math.sin(step))
            }
            animate()
        });
});


function animate () {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}
animate()


