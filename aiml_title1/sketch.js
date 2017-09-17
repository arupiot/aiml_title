var img, svg;
var font;
var dotsArtificial = [];
var dotsIntelligence = [];
var dotsEnabling = [];
var textHeight1, textHeight2, textHeight3;
var waitress;
var viewfs;
var exitfs;
var showing = true;

function preload() {
  font = loadFont('data/font/Titillium_Web/TitilliumWeb-ExtraLight.ttf');
  // img = loadImage('data/AIML_logo_white_on_black.svg');
  // svg = loadSVG('data/AIML_logo_white_on_black.svg');
}

function setup() {
  // createCanvas(1920/2, 1080/2);
  createCanvas(windowWidth,windowHeight);
  viewfs = document.getElementById("enter_btn");
  exitfs = document.getElementById("exit_btn");
  textHeight1 = height/4;
  textHeight2 = height/5.3;
  textHeight3 = height/9.9;
  background(0,0,0);
  fill(255,255,255);
  noStroke();
  textFont(font);
  // textAlign(CENTER,CENTER);
  var textHeight1 = height/4;
  textSize(textHeight1);
  var x = width/2;
  var y = textHeight1;
  // text('ARTIFICIAL',x,y);
  var pointsArtificial = font.textToPoints('ARTIFICIAL',x-textWidth('ARTIFICIAL')/2,y+textHeight1/2);

  textSize(textHeight2);
  // var intelligence = text('INTELLIGENCE',width/2,height/2.1);
  var pointsIntelligence = font.textToPoints('INTELLIGENCE',x-textWidth('INTELLIGENCE')/2,y+textHeight1+textHeight2/2);

  textSize(textHeight3);
  // var subtitle = text('Enabling machines to learn',width/2,height/1.45);
  // var pointsEnabling = font.textToPoints('ENABLING MACHINES TO LEARN',x-textWidth('ENABLING MACHINES TO LEARN')/2,y+textHeight1+textHeight2+textHeight3/2);
  var pointsEnabling = font.textToPoints('Enabling.machines.to.learn',x-textWidth('Enabling.machines.to.learn')/2,y+textHeight1+textHeight2+textHeight3/2);

  // console.log(pointsArtificial);
  // stroke(255,0,0);
  // strokeWeight(8);
  for (i=0; i<pointsArtificial.length; i++) {
    var pt = pointsArtificial[i];
    var dot = new Dot(pt.x,pt.y);
    dotsArtificial.push(dot);
    // point(pt.x,pt.y);
  }

  for (i=0; i<pointsIntelligence.length; i++) {
    var pt = pointsIntelligence[i];
    var dot = new Dot(pt.x,pt.y);
    dotsIntelligence.push(dot);
    // point(pt.x,pt.y);
  }

  for (i=0; i<pointsEnabling.length; i++) {
    var pt = pointsEnabling[i];
    var dot = new Dot(pt.x,pt.y);
    dotsEnabling.push(dot);
    // point(pt.x,pt.y);
  }

  waitress = millis() + 10000;
}

function draw() {
  var currtime = millis();
  background(0);

  fill(255);
  noStroke();
  // textFont(font);
  // textAlign(LEFT,BOTTOM);
  // textSize(textHeight1);
  // var x = width/2;
  // var y = textHeight1;
  // text('ARTIFICIAL',x-textWidth('ARTIFICIAL')/2,y+textHeight1/2);

  // image(img, 0, 0, width, height);
  // image(svg, 0, 0, width, height);

  for (var i = 0; i < dotsArtificial.length; i++) {
    var v = dotsArtificial[i];
    v.behaviours();
    v.update();
    // if (i<32 || (i>36 && i<50) || (i>54 && i<383) || (i>389 && i<401) || i>405)  { v.show();}
    v.show();
  }

  for (var i = 0; i < dotsIntelligence.length; i++) {
    var v = dotsIntelligence[i];
    v.behaviours();
    v.update();
    v.show();
  }

  for (var i = 0; i < dotsEnabling.length; i++) {
    var v = dotsEnabling[i];
    v.behaviours();
    v.update();
    // if (i<10 && i>20) { v.show();}
    v.show();
  }



  // Show mouse pointer and Enter/Exit FS image when mouse is moved.
  // Hide them 10 seconds after page loads, or 2 seconds after last
  // mouse movement or window resize.
  if ((mouseX != pmouseX) || (mouseY != pmouseY)) { // if mouse moved,
    if (!showing) { // and if they're hidden,
      cursor(); // show pointer and relevant image
      if (fullscreen()) {
        exitfs.style.display = "block";
      } else {
         viewfs.style.display = "block";
      }
      showing = true;
    }
    if (waitress < currtime + 2000) { // if not in first 10 seconds,
      waitress = currtime + 2000; // hide stuff 2 seconds from now
    }
  } else { // mouse has not moved
    if (showing) {
      if (currtime > waitress) { // they've been visible long enough,
        noCursor(); showing = false; // so hide pointer and images
        viewfs.style.display = "none";
        exitfs.style.display = "none";
      }
    }
  }
}

function mouseReleased() {
  if (mouseX>windowWidth-64-20 && mouseX<windowWidth-20
    && mouseY>windowHeight-64-20 && mouseY<windowHeight-20) {
    var fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  waitress = millis() + 2000;
  if (fullscreen()) {
    resizeCanvas(displayWidth, displayHeight);
    viewfs.style.display = "none";
    exitfs.style.display = "block";
  } else {
    resizeCanvas(windowWidth,windowHeight);
    exitfs.style.display = "none";
    viewfs.style.display = "block";
  }
  cursor();
  showing = true;
  background(0);
}
