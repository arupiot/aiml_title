
// take a random position from a point's radius
PVector generateRandomPos(int x, int y, float mag) {
  PVector randomDir = new PVector(random(0, width), random(0, height));
  
  PVector pos = new PVector(x, y);
  pos.sub(randomDir);
  pos.normalize();
  pos.mult(mag);
  pos.add(x, y);
  
  return pos;
}

// draw the next word in framebuffer and generate particles
void makeWordandParticles(String word) {
  
  // draw word in framebuffer
  PGraphics pg = createGraphics(width, height);
  pg.beginDraw();
  pg.fill(0);
  pg.textSize(100);
  pg.textAlign(CENTER);
  PFont font = createFont(fontName, 100);
  pg.textFont(font);
  pg.text(word, width/2, height/2);
  pg.endDraw();
  pg.loadPixels();

  // set pixel colour
  color newColor = color(255,255,255);

  int particleCount = particles.size();
  int particleIndex = 0;

  // collect coordinates as indexes into an array list by resampling every pixelSteps
  ArrayList<Integer> coordsIndexes = new ArrayList<Integer>();
  for (int i = 0; i < (width*height)-1; i+= pixelSteps) {
    coordsIndexes.add(i);
  }

  for (int i = 0; i < coordsIndexes.size (); i++) {
    // pick a random coordinate 
    int randomIndex = (int)random(0, coordsIndexes.size());
    int coordIndex = coordsIndexes.get(randomIndex);
    coordsIndexes.remove(randomIndex);
    
    // skip pixels that are outside of the word
    if (pg.pixels[coordIndex] != 0) {
      // convert index to its coordinates
      int x = coordIndex % width;
      int y = coordIndex / width;

      Particle newParticle;

      if (particleIndex < particleCount) {
        // use a particle that's already on the screen 
        newParticle = particles.get(particleIndex);
        newParticle.isKilled = false;
        particleIndex += 1;
      } else {
        // Create a new particle
        newParticle = new Particle();
        
        PVector randomPos = generateRandomPos(width/2, height/2, (width+height)/2);
        newParticle.pos.x = randomPos.x;
        newParticle.pos.y = randomPos.y;
        
        newParticle.maxSpeed = random(2.0, 5.0);
        newParticle.maxForce = newParticle.maxSpeed*0.05;
        newParticle.particleSize = random(3, 6);
        newParticle.colorBlendRate = 0.002; //random(0.0025, 0.03);
        
        particles.add(newParticle);
      }
      
      // colour blending
      //newParticle.startColor = lerpColor(newParticle.startColor, newParticle.targetColor, newParticle.colorWeight);
      newParticle.startColor = color(0);
      newParticle.targetColor = newColor;
      newParticle.colorWeight = 0;
      
      // assign the new target to the particle 
      newParticle.target.x = x;
      newParticle.target.y = y;
    }
  }

  // kill any left over particles
  if (particleIndex < particleCount) {
    for (int i = particleIndex; i < particleCount; i++) {
      Particle particle = particles.get(i);
      particle.kill();
    }
  }
}

void springTo(Particle p1, Particle p2)
{
  float dx = p2.pos.x - p1.pos.x;
  float dy = p2.pos.y - p1.pos.y;
  float dist = sqrt(dx * dx + dy * dy);
  
  if ((dist < 20) && (dist>5)) 
  {
    float ax = dx * spring;
    float ay = dy * spring;
    float alpha = 50 + (dist/100) * 200;   
    
    p1.vel.x += ax;
    p1.vel.y += ay;
    p2.vel.x -= ax;
    p2.vel.y -= ay;
    
    stroke(alpha);
    line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
  }
}