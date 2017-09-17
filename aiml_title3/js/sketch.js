var img, svg;
// var font;
// var dotsArtificial = [];
// var dotsIntelligence = [];
// var dotsEnabling = [];
var textHeight1, textHeight2, textHeight3;
var waitress;
var viewfs;
var exitfs;
var showing = true;
var bg_image;

// var VerletPhysics2D = toxi.physics2d.VerletPhysics2D,
//     VerletParticle2D = toxi.physics2d.VerletParticle2D,
//     VerletSpring2D = toxi.physics2d.VerletSpring2D,
//     VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D,
//     Vec2D = toxi.geom.Vec2D,
//     Rect = toxi.geom.Rect;
//
// import toxi.geom.*;
// import toxi.physics2d.*;
// import toxi.physics2d.behaviors.*;


var physics;

var particles = [];
var attractors = [];
var points = [];


// VerletPhysics2D physics;
// AttractionBehavior mouseAttractor;

// Vec2D mousePos;
//
// var clusters,
//     physics;

function preload() {
  font = loadFont('data/font/Titillium_Web/TitilliumWeb-ExtraLight.ttf');
  img = loadImage('data/AIML_logo_white_on_black2.png');
  // svg = loadSVG('data/AIML_logo_white_on_black.svg');

}

function setup() {
  // createCanvas(1920/2, 1080/2);
  // createCanvas(windowWidth,windowHeight);
  var p5Renderer2D = createCanvas(window.innerWidth, window.innerHeight);
  colorMode(RGB, 255);

  physics = new VerletPhysics2D();


  physics.setDrag(0.05);
  physics.setWorldBounds(new Rect(0, 0, width, height));

  image(img, 0, 0);
  img.resize(windowWidth,windowHeight);
  img.loadPixels();
  // bg_image = get();
  // console.log(bg_image.pixels[100][100]);
  var density = displayDensity();
  pixelDensity(density);
  var d = pixelDensity();
  d = 1;
  console.log(density, d, img.width, img.height, displayWidth, displayHeight, windowWidth, windowHeight);
  for (var i=10; i<(img.width-10); i+=10) {
    for (var j=10; j<(img.height-10); j+=10) {
      // var idx = 4 * ((y * d + j) * width * d + (x * d + i));
      var idx = (j * img.width + i) * d * 4;
      var r = img.pixels[idx];
      var g = img.pixels[idx+1];
      var b = img.pixels[idx+2];
      var a = img.pixels[idx+3];
      if (r>50) {
        // console.log(r,g,b,a);
        // points.push(new Vec2D(i,j));
        particles.push(new Particle(new Vec2D(i,j),2,4,-0.01));
      }
    }
  }

  for (var i=1; i<particles.length; i++) {
    p1 = particles[i];
    p2 = particles[i-1];
    pos1 = p1.getPreviousPosition();
    pos2 = p2.getPreviousPosition();
    if (pos1.distanceTo(pos2)<16) {
      physics.addSpring(new VerletSpring2D(p1, p2, 8, 0.2));
    }
  }

  // for (var i = 0; i < points.length; i++) {
  //   var pt = points[i];
  //   // particles.push(new Particle(new Vec2D(pt.x,pt.y),4,16,-1));
  //   particles.push(new Particle(new Vec2D(pt.x,pt.y),2,16,-1));
  // }

  // console.log(img.width, img.height);
  // for (var i=0; i<img.width; i+=20) {
  //   for (var j=0; j<img.height; j+=20) {
  //     c = img.get(i,j);
  //     if (c[0]==255) {
  //       // console.log(i,j,c);
  //       points.push(new Vec2D(i,j));
  //     }
  //   }
  // }

  viewfs = document.getElementById("enter_btn");
  exitfs = document.getElementById("exit_btn");



  // physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.15)));
  textHeight1 = height/4;
  textHeight2 = height/5.3;
  textHeight3 = height/9.9;
  // background(0,0,0);
  // fill(255,255,255);
  // noStroke();
  textFont(font);
  textAlign(CENTER,CENTER);
  // var textHeight1 = height/4;
  textSize(textHeight1);
  var x = width/2;
  var y = textHeight1;
  // // text('ARTIFICIAL',x,y);
  var pointsArtificial = font.textToPoints('ARTIFICIAL',x-textWidth('ARTIFICIAL')/2,y+textHeight1/2);
  // console.log(pointsArtificial);
  // for (var i = 0; i < points.length; i++) {
  //   var pt = points[i];
  //   // particles.push(new Particle(new Vec2D(pt.x,pt.y),4,16,-1));
  //   particles.push(new Particle(new Vec2D(pt.x,pt.y),2,16,-1));
  // }
  //attractor = new Particle(new Vec2D(width/2,height/2),24,width,0.1);
  //
  // textSize(textHeight2);
  // // var intelligence = text('INTELLIGENCE',width/2,height/2.1);
  var pointsIntelligence = font.textToPoints('INTELLIGENCE',x-textWidth('INTELLIGENCE')/2,y+textHeight1+textHeight2/2);
  //
  // textSize(textHeight3);
  // // var subtitle = text('Enabling machines to learn',width/2,height/1.45);
  // // var pointsEnabling = font.textToPoints('ENABLING MACHINES TO LEARN',x-textWidth('ENABLING MACHINES TO LEARN')/2,y+textHeight1+textHeight2+textHeight3/2);
  var pointsEnabling = font.textToPoints('Enabling.machines.to.learn',x-textWidth('Enabling.machines.to.learn')/2,y+textHeight1+textHeight2+textHeight3/2);
  //
  // // console.log(pointsArtificial);
  // // stroke(255,0,0);
  // // strokeWeight(8);
  // for (i=0; i<pointsArtificial.length; i++) {
  //   var pt = pointsArtificial[i];
  //   var dot = new Dot(pt.x,pt.y);
  //   dotsArtificial.push(dot);
  //   // point(pt.x,pt.y);
  // }
  //
  // for (i=0; i<pointsIntelligence.length; i++) {
  //   var pt = pointsIntelligence[i];
  //   var dot = new Dot(pt.x,pt.y);
  //   dotsIntelligence.push(dot);
  //   // point(pt.x,pt.y);
  // }
  //
  // for (i=0; i<pointsEnabling.length; i++) {
  //   var pt = pointsEnabling[i];
  //   var dot = new Dot(pt.x,pt.y);
  //   dotsEnabling.push(dot);
  //   // point(pt.x,pt.y);
  // }
  //



  waitress = millis() + 10000;
}

// void addParticle() {
//   Vec2D randLoc = Vec2D.randomVector().scale(5).addSelf(width / 2, 0);
//   VerletParticle2D p = new VerletParticle2D(randLoc);
//   physics.addParticle(p);
//   physics.addBehavior(new AttractionBehavior(p, 20, -1.2, 0.01));
// }


function draw() {

  var currtime = millis();
  physics.update();
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
  // image(bg_image, 0, 0, width, height);

  // for (var i = 0; i < dotsArtificial.length; i++) {
  //   var v = dotsArtificial[i];
  //   v.behaviours();
  //   v.update();
  //   // if (i<32 || (i>36 && i<50) || (i>54 && i<383) || (i>389 && i<401) || i>405)  { v.show();}
  //   v.show();
  // }
  //
  // for (var i = 0; i < dotsIntelligence.length; i++) {
  //   var v = dotsIntelligence[i];
  //   v.behaviours();
  //   v.update();
  //   v.show();
  // }
  //
  // for (var i = 0; i < dotsEnabling.length; i++) {
  //   var v = dotsEnabling[i];
  //   v.behaviours();
  //   v.update();
  //   // if (i<10 && i>20) { v.show();}
  //   v.show();
  // }

  for (var i = 0; i < particles.length; i++) {


    stroke(255);
    strokeWeight(1);
    if (i<(particles.length-1)) {
      p1 = particles[i];
      p2 = particles[i+1];
      pos1 = p1.getPreviousPosition();
      pos2 = p2.getPreviousPosition();
      if (pos1.distanceTo(pos2)<16) {
        line(p1.x, p1.y, p2.x, p2.y);
      }
    }
    particles[i].display();
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
