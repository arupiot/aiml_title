/*
AIML network particles text 
2017 francesco.anselmo@arup.com
*/

// Global variables

// Particles variables
ArrayList<Particle> particles = new ArrayList<Particle>();
int pixelSteps = 6; // amount of pixels to skip when sampling
boolean drawAsPoints = false;
boolean showWord = false;
boolean showTargets = false;

// Words variables
ArrayList<String> words = new ArrayList<String>();
int wordIndex = 0;
color bgColor = color(0);
String fontName = "TitilliumWeb-Regular";

// Time variables
int time;
int[] wait = {62000, 20000, 62000, 20000};

float spring = 0.0000001;

void setup() {
  //size(displayWidth, displayHeight);
  //size(800,300);
  fullScreen();
  noCursor();
  background(bgColor);

  // Initialise words
  words.add("ARTIFICIAL INTELLIGENCE");
  words.add("    ");
  words.add("Enabling machines to learn");
  words.add("    ");

  // initialise words and particles
  makeWordandParticles(words.get(wordIndex));
  time = millis();//store the current time
}

void draw() {
  // Background 
  fill(bgColor);
  noStroke();
  //rect(0, 0, width*2, height*2);
  rect(0, 0, width, height);

  for (int x = particles.size ()-1; x > -1; x--) {
    // Simulate and draw pixels
    Particle particle = particles.get(x);
    particle.move();
    for (int y = (particles.size()-1)/5; y > -1; y--) {
      springTo(particles.get(x), particles.get(y));  
    }
    particle.draw();

    // Remove any dead pixels out of bounds
    if (particle.isKilled) {
      if (particle.pos.x < 0 || particle.pos.x > width || particle.pos.y < 0 || particle.pos.y > height) {
        particles.remove(particle);
      }
    }
  }

  // Display control tips
  //fill(255-red(bgColor));
  //textSize(9);
  //String tipText = "Left-click for a new word.";
  //tipText += "\nDrag right-click over particles to interact with them.";
  //tipText += "\nPress any key to toggle draw styles.";
  //text(tipText, 10, height-40);
  //check the difference between now and the previously stored time is greater than the wait interval
  if(millis() - time >= wait[wordIndex]){
    wordIndex += 1;
    if (wordIndex > words.size()-1) { 
      wordIndex = 0;
    }
    makeWordandParticles(words.get(wordIndex));
    time = millis();//also update the stored time
  }
  
  if (showWord) {
    fill(255);
    textSize(100);
    textAlign(CENTER);
    PFont font = createFont(fontName, 100);
    textFont(font);
    text(words.get(wordIndex), width/2, height/2);
  }

}


// show the word
void mousePressed() {
  if (mouseButton == RIGHT) {
    showWord = !showWord;
  }
  if (mouseButton == LEFT) {
    showTargets = !showTargets;
  }
}


// Kill pixels that are in range
//void mouseDragged() {
//  if (mouseButton == RIGHT) {
//    for (Particle particle : particles) {
//      if (dist(particle.pos.x, particle.pos.y, mouseX, mouseY) < 50) {
//        particle.kill();
//      }
//    }
//  }
//}


// Toggle draw modes
//void keyPressed() {
//  drawAsPoints = (! drawAsPoints);
//  if (drawAsPoints) {
//    background(0);
//    bgColor = color(0, 40);
//  } else {
//    background(255);
//    bgColor = color(255, 100);
//  }
//}