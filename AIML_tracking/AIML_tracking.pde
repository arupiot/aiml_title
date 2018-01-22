import gab.opencv.*;
import processing.video.*;
import java.awt.*;

Capture video;
OpenCV opencv1;
OpenCV opencv2;
OpenCV opencv3;


int x = 640;
int y = 480;

void setup() {
  //size(x, y);
  fullScreen();
  video = new Capture(this, x/2, y/2);
  
  opencv1 = new OpenCV(this, x/2, y/2);
  opencv1.startBackgroundSubtraction(5, 3, 0.5);
  
  opencv2 = new OpenCV(this, x/2, y/2);
  opencv2.loadCascade(OpenCV.CASCADE_FRONTALFACE);
  
  opencv3 = new OpenCV(this, x/2, y/2);
  opencv3.loadCascade(OpenCV.CASCADE_PEDESTRIAN);
  
//CASCADE_CLOCK
//CASCADE_EYE
//CASCADE_FRONTALFACE
//CASCADE_FULLBODY
//CASCADE_LOWERBODY
//CASCADE_MOUTH
//CASCADE_NOSE
//CASCADE_PEDESTRIAN
//CASCADE_PEDESTRIANS
//CASCADE_PROFILEFACE
//CASCADE_RIGHT_EAR

  video.start();
}

void draw() {
  background(0);
  scale(width*2/x);
  opencv1.loadImage(video);
  opencv2.loadImage(video);
  opencv3.loadImage(video);
  
  //image(video, 0, 0 );
  
  opencv1.updateBackground();
  //opencv1.dilate();
  //opencv1.erode();

  noFill();
  stroke(255, 255, 255);
  strokeWeight(2);
  
  for (Contour contour : opencv1.findContours()) {
    contour.draw();
  }

  stroke(200, 200, 255);
  Rectangle[] faces = opencv2.detect();
  println(faces.length);
  
  for (int i = 0; i < faces.length; i++) {
    println(faces[i].x + "," + faces[i].y);
    rect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
  }  

  stroke(100, 100, 255);
  Rectangle[] bodies = opencv3.detect();
  println(bodies.length);
  
  for (int i = 0; i < bodies.length; i++) {
    println(bodies[i].x + "," + bodies[i].y);
    rect(bodies[i].x, bodies[i].y, bodies[i].width, bodies[i].height);
  }  

  
}

void captureEvent(Capture c) {
  c.read();
}