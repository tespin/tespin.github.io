let cyanotypes = [];
let cyanoButtons = [];
let numImgs = 10;

let cyanoButton;
let metadata;
let activeStart;
let activeEnd;

let dateContainer;
let timeContainer;

let buttonWidth;
let buttonHeight;
let cols = 4;

let clicked;

let diff;
let midnight;

function preload() {
  metadata = loadJSON('assets/metadata.json', loadCyanotypes);
}

function setup() {
  noCanvas();
  
  container = select('#p5div');
  timeContainer = select('#time');
  dateContainer = select('#date');

  setupCyanoButtons();

  for (let i = 0; i < cyanotypes.length; i++) {
    cyanoButtons[i].img.mouseClicked(setMetadata(i));
    cyanoButtons[i].img.parent(container);
  }

  buttonWidth = container.width / cols;
}

function draw() {
  if (!clicked) {
    dateContainer.html(getFormattedDate(new Date()));
    timeContainer.html(getFormattedTime(new Date()));

    activeStart = new Date();
  }
  else {}
}

function loadCyanotypes() {
  for (let i = 0; i < numImgs; i++)
  {
    cyanotypes[i] = createImg('./assets/cyanotypes/' + metadata.metadata[i].filename, 'test', '', printSize(i));
  }
}

function printSize(index) {
  return function() {
    ratio = buttonWidth / cyanotypes[index].size().width;
    buttonHeight = cyanotypes[index].size().height * ratio;
  }
}

function printMetadata(index) {
  return function() {
    let d = new Date(cyanoButtons[index].startTime);
    console.log(d);
  }
}

function setMetadata(index) {
  return function() {
    clicked = true;
    let start = new Date(cyanoButtons[index].startTime);
    let end = new Date(cyanoButtons[index].endTime);

    diff = new Date().getTime() - start.getTime();

    dateContainer.html(getFormattedDate(start));
    timeContainer.html(getFormattedTime(start) + " - " + getFormattedTime(end));

    activeStart = start;
    activeEnd = end;
  }
}

function getFormattedDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth()+1;
  let yyyy = date.getFullYear();

  if (dd < 10) {
    dd = '0'+dd;
  }

  if (mm < 10) {
    mm = '0'+mm;
  }

  let formatted = mm+'/'+dd+'/'+yyyy;
  return formatted;
}

function getFormattedTime(date) {
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

function setupCyanoButtons() {
  for (let i = 0; i < cyanotypes.length; i++) {
    cyanoButtons[i] = new CyanoButton(cyanotypes[i],
                                      cyanotypes[i].position().x,
                                      cyanotypes[i].position().y,
                                      metadata.metadata[i].startTime,
                                      metadata.metadata[i].endTime,
                                      metadata.metadata[i].caption
                                     );
  }
}

function imageLoaded(index) {
  console.log(`Image ${index} loaded`);
}

function imageNotLoaded(error) {
  console.log(error);
}

class CyanoButton {
  constructor(img, x, y, startTime, endTime, caption) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.startTime = startTime;
    this.endTime = endTime;
    this.caption = caption;
  }

  printSize() {
    console.log(this.img.size());
  }
}