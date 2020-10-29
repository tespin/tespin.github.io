import {OBJLoader} from 'https://unpkg.com/three@0.121.0/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'https://unpkg.com/three@0.121.0/examples/jsm/loaders/MTLLoader.js';
// import {OrbitControls} from 'https://unpkg.com/three@0.121.0/examples/jsm/controls/OrbitControls.js';

let map = function(value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

let container = document.getElementById('threejsDiv');
let timeContainer = document.getElementById('time');

let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 10000);
// let cam = new THREE.OrthographicCamera(0, container.clientWidth, 0, container.clientHeight, 0.1, 10000);
cam.position.set(0, 10, 20);
scene.add(cam);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
container.appendChild(renderer.domElement);

// let controls = new OrbitControls(cam, renderer.domElement);
// controls.update();

let dirColor = new THREE.Color("hsl(205, 100%, 16%)");
let light = new THREE.DirectionalLight(dirColor, 3);
// let helper = new THREE.DirectionalLightHelper(light, 5);
light.castShadow = true;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
light.shadow.bias = -0.0005;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 100;
light.shadow.camera.bottom = -30;
light.shadow.camera.top = 30;
light.shadow.camera.left = -30;
light.shadow.camera.right = 30;
scene.add(light);
// scene.add(helper);

let cameraHelper = new THREE.CameraHelper(light.shadow.camera);
// scene.add(cameraHelper);

let hemisphere = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
let col = new THREE.Color("hsl(210, 60%, 53%)");
let groundCol = new THREE.Color("hsl(210, 98%, 33$");
hemisphere.color = col;
hemisphere.groundColor = groundCol;
hemisphere.position.set(0, 150, 0);
scene.add(hemisphere);

let obj;
let mtlLoader = new MTLLoader();
mtlLoader.setPath('assets/obj/');
mtlLoader.load('parent-navel-50.obj', function (materials) {
  materials.preload();

  let objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('assets/obj/');
  objLoader.load('parent-navel-50.obj', function (object) {
    object.position.y = -2.5;
    object.traverse(function(child) {
      child.castShadow = true;
      child.receiveShadow = true;
    });
    obj = object;
    // camera.lookAt(object);
    scene.add(object);
  });
});

cam.lookAt(0, 2, 0);

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshPhongMaterial({
  color: 0x00ff00
});
let cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.position.y = -3;;
scene.add(cube);
light.target = cube;
// scene.add(light.target);

let groundGeom = new THREE.PlaneGeometry(100, 100, 1, 1);
let groundMat = new THREE.MeshLambertMaterial({color: 0xffffff});
let ground = new THREE.Mesh(groundGeom, groundMat);
ground.position.set(0, 5, 0);
ground.receiveShadow = true;
ground.material.side = THREE.DoubleSide;
ground.position.y = -2;
ground.rotation.x = -1.54;
scene.add(ground);

let getFormattedHour =  function(date) {
  let d = new Date(date);
  let hh = date.getHours();
  let min = date.getMinutes();
  let mer = "AM";

  let h = hh;
  if (h >= 12) {
    h = hh - 12;
    mer = "PM";
  }
  if (h == 0) {
    h = 12;
  }
  min = min < 10 ? "0" + min : min;

  let formatted = h + ":" + min + " " + mer;
  return formatted;
}

let current = new Date();
let calcSun = function() {
  requestAnimationFrame(calcSun);
  // timer();
  let lat = 34.1
  let long = -118.4
  let radius = 25;
  let rate = 50.0;

  let sunPos = SunCalc.getPosition(new Date(), lat, long);
  if (activeStart != undefined && activeEnd != undefined) {
      let interval = activeEnd.getTime() - activeStart.getTime();
      let currentCounter = new Date().getTime() - (activeStart.getTime() + diff);
      currentCounter = Math.ceil(currentCounter * rate);
      let t = currentCounter%interval + activeStart.getTime();
      timeContainer.innerHTML = getFormattedHour(new Date(t));
      let cyanoTime = new Date(t);

      sunPos = SunCalc.getPosition(cyanoTime, lat, long)
  } else {
    sunPos = SunCalc.getPosition(new Date(), lat, long);
  }
  // console.log(sunPos);
  // console.log(new Date().getTime());

  let lightX = radius * Math.cos(sunPos.azimuth + Math.PI) * Math.cos(sunPos.altitude);
  let lightY = radius * Math.sin(sunPos.azimuth + Math.PI) * Math.cos(sunPos.altitude);
  let lightZ = radius * Math.sin(sunPos.altitude);

  // console.log(sunPos.azimuth + Math.PI );
  // console.log(sunPos.altitude);
  // let lightX = radius * Math.sin(sunPos.altitude) * Math.cos(sunPos.azimuth + Math.PI);
  // let lightY = radius * Math.sin(sunPos.altitude) * Math.sin(sunPos.azimuth + Math.PI);
  // let lightZ = radius * Math.cos(sunPos.altitude);

  light.position.set(lightX, lightY, lightZ);
}

// console.log(obj.position);

calcSun();

let render = function() {
  requestAnimationFrame(render);

  renderer.render(scene, cam);
};

render();

let onWindowResize = function (){
    cam.aspect = container.clientWidth / container.clientHeight;
    cam.updateProjectionMatrix();
    renderer.setSize( container.clientWidth, container.clientHeight );
}

window.addEventListener('resize', onWindowResize, false);