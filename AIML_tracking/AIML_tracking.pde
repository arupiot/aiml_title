import gab.opencv.*;
import processing.video.*;
import java.awt.*;

Capture video;
OpenCV opencv;

void setup() {
  //size(640, 480);
  fullScreen();
  video = new Capture(this, width/2, height/2);
  opencv = new OpenCV(this, width/2, height/2);
  opencv.startBackgroundSubtraction(5, 3, 0.5);
  opencv.loadCascade(OpenCV.CASCADE_FRONTALFACE);  

  video.start();
}

void draw() {
  background(0);
  scale(2);
  opencv.loadImage(video);

  //image(video, 0, 0 );
  
  opencv.loadImage(video);
  opencv.updateBackground();
  
  opencv.dilate();
  opencv.erode();

  noFill();
  stroke(255, 255, 255);
  strokeWeight(3);
  for (Contour contour : opencv.findContours()) {
    contour.draw();
  }

  //stroke(255, 255, 255);
  //strokeWeight(3);
  //Rectangle[] faces = opencv.detect();
  //println(faces.length);
  
  //for (int i = 0; i < faces.length; i++) {
  //  println(faces[i].x + "," + faces[i].y);
  //  rect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
  //}
  
}

void captureEvent(Capture c) {
  c.read();
}