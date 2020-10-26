import {OBJLoader} from 'https://unpkg.com/three@0.121.0/examples/jsm/loaders/OBJLoader.js';

let map = function(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

let container = document.getElementById('threejsDiv');

let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

let dirColor = new THREE.Color("hsl(209, 98%, 41%)");
let light = new THREE.DirectionalLight(dirColor);
light.castShadow = true;
light.position.set(0, 100, 200);
scene.add(light);

let hemisphere = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.3);
let col = new THREE.Color("hsl(210, 60%, 53%)");
let groundCol = new THREE.Color("hsl(210, 98%, 33$");
hemisphere.color = col;
hemisphere.groundColor = groundCol;
hemisphere.position.set(0, 150, 0);
scene.add(hemisphere);

let loader;
loader = new OBJLoader();
loader.load('assets/obj/toy-fox.obj', function (obj) {
    obj.s
    scene.add(obj);
});

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshLambertMaterial({
  color: 0x00ff00
});
let cube = new THREE.Mesh(geometry, material);
scene.castShadow = true;
scene.add(cube);

cam.position.z = 5;

let render = function() {
  requestAnimationFrame(render);


  cube.rotation.x += 0.07;

  renderer.render(scene, cam);
};

render();

let onWindowResize = function (){
    cam.aspect = container.clientWidth / container.clientHeight;
    cam.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
}

window.addEventListener('resize', onWindowResize, false);