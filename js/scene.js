import {OBJLoader} from 'https://unpkg.com/three@0.121.0/examples/jsm/loaders/OBJLoader.js';

let map = function(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

let container = document.getElementById('threejsDiv');

let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 10000);
// let cam = new THREE.OrthographicCamera(0, container.clientWidth, 0, container.clientHeight, 0.1, 10000);
cam.position.set(0, 0, 10);
scene.add(cam);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

let dirColor = new THREE.Color("hsl(209, 98%, 41%)");
let light = new THREE.DirectionalLight(dirColor, 5);
let helper = new THREE.DirectionalLightHelper(light, 5);
light.castShadow = true;
light.position.set(0, 2, 0);
scene.add(light);
scene.add(helper);

let hemisphere = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.3);
let col = new THREE.Color("hsl(210, 60%, 53%)");
let groundCol = new THREE.Color("hsl(210, 98%, 33$");
hemisphere.color = col;
hemisphere.groundColor = groundCol;
hemisphere.position.set(0, 150, 0);
// scene.add(hemisphere);

let loader;
loader = new OBJLoader();
loader.load('assets/obj/toy-fox.obj', function (obj) {
});

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshPhongMaterial({
  color: 0x00ff00
});
let cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.position.x -= 1;
scene.add(cube);
light.target = cube;
// scene.add(light.target);

let groundGeom = new THREE.PlaneGeometry(10, 10, 1, 1);
let groundMat = new THREE.MeshLambertMaterial({color: 0x00ff00});
let ground = new THREE.Mesh(groundGeom, groundMat);
ground.position.set(0, 5, 0);
ground.receiveShadow = true;
ground.material.side = THREE.DoubleSide;
ground.position.y = -2;
ground.rotation.x = -1.54;
scene.add(ground);

let calcSun = function() {
  requestAnimationFrame(calcSun);
  let lat = 34.1
  let long = -118.4
  let radius = 5;

  let sunPos = SunCalc.getPosition(new Date(), lat, long);
  if (activeStart != undefined) {
      sunPos = SunCalc.getPosition(activeStart, lat, long)
  } else {
    sunPos = SunCalc.getPosition(new Date(), lat, long);
  }
  // console.log(sunPos);

  let lightX = radius * Math.cos(sunPos.azimuth + Math.PI) * Math.sin(sunPos.altitude);
  let lightY = radius * Math.sin(sunPos.azimuth + Math.PI) * Math.sin(sunPos.altitude);
  let lightZ = radius * Math.cos(sunPos.altitude);
  lightX += 0.01;

  light.position.set(lightX, lightY, lightZ);
}

calcSun();

let render = function() {
  requestAnimationFrame(render);


  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;

  // ground.rotation.x += 0.01;
  // ground.rotation.y += 0.01;

  renderer.render(scene, cam);
};

render();

let onWindowResize = function (){
    cam.aspect = container.clientWidth / container.clientHeight;
    cam.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
}

window.addEventListener('resize', onWindowResize, false);