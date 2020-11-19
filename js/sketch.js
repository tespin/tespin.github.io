let stViewImgs = [];
let captions;
let caption;
let numImgs = 50;

let prevButton;
let nextButton;

let idx = 0;

let w = 275;
let h = 275;

let tw = 225;
let th = 100;

let xoffset = 20;
let yoffset = -25;

function preload() {
  loadImages();
  loadCaptions();
}

function setup() {
  createCanvas(720, 450);
  setupButtons();
  textSize(16);
}

function draw() {
  background(107, 107, 104);
  image(stViewImgs[idx], 50+xoffset, height/2-h/2 + yoffset, w, h);
  fill(255);
  text(caption, width/2 + tw/5 + xoffset, height/2 - th/2 + yoffset, tw, th);
  // text(caption, width - textWidth(caption)/2, h/2+275, 200, 75);
  // rect(width-textWidth(caption)/2, h/2+275, 200, 75);
}

function setupButtons() {
  prevButton = createButton('Prev');
  nextButton = createButton('Next');
  
  prevButton.position(width/2-prevButton.width, 400);
  prevButton.mousePressed(prevImage);
  
  nextButton.position(prevButton.x+prevButton.width, prevButton.y);
  nextButton.mousePressed(nextImage);
}

function prevImage() {
  idx--;
  if (idx < 0) idx = stViewImgs.length-1;
  
  // caption = random(captions);
  caption = captions[idx];
  
  print(`Image: ${idx}`);
}

function nextImage() {
  idx++;
  if (idx > numImgs-1) idx = 0;
  
  // caption = random(captions);
  caption = captions[idx];
  
  print(`Image: ${idx}`);
}

function loadImages() {
  for (let i = 0; i < numImgs; i++)
  {
    stViewImgs[i] = loadImage('assets/stview-90/'+nf(i, 4, 0)+'.jpg', () => 
    { imageLoaded(i) }, 
      imageNotLoaded);
  }
}

function imageLoaded(index) {
  console.log(`Image ${index} loaded`);
}

function imageNotLoaded(error) {
  console.log(error);
}

function loadCaptions() {
  captions = loadStrings('../assets/captions.txt', captionsLoaded);
}

function captionsLoaded(result) {
  // caption = random(result);
  caption = result[idx];
  // console.log(random(resut));
}