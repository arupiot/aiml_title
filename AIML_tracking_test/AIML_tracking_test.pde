import gab.opencv.*;
import processing.video.*;
import java.awt.*;

int scaleFactor = 1;
PImage blur;

Capture video;
OpenCV opencv1;

int x = 640;
int y = 480;

void setup() {
  //size(800, 600);
  fullScreen();
  video = new Capture(this, x/scaleFactor, y/scaleFactor);
  opencv1 = new OpenCV(this, x/scaleFactor, y/scaleFactor);
  opencv1.startBackgroundSubtraction(5, 3, 0.5);
  video.start();  
}

void draw() {
  background(0);
  scale(width/x*scaleFactor);
  opencv1.loadImage(video);
  
  image(video, 0, 0 );
  
  opencv1.updateBackground();
  //if (video.available() == true) {
  //  video.read();
  //}
  noFill();
  stroke(255, 255, 255);
  strokeWeight(2);
  
  for (Contour contour : opencv1.findContours()) {
    contour.draw();
  }

  
  //opencv1.blur(10);
  //blur = opencv1.getSnapshot();
  //image(blur,0,0);
}

void captureEvent(Capture c) {
  c.read();
}