void makeParticles(int particlesNumber) {
  for (int i = 0; i < particlesNumber; i++) {
    Particle2D newParticle;
    newParticle = new Particle2D();
        
    PVector randomPos = generateRandomPos(width/2, height/2, (width+height)/2);
    newParticle.pos.x = randomPos.x;
    newParticle.pos.y = randomPos.y;
    
    newParticle.maxSpeed = random(2.0, 5.0);
    newParticle.maxForce = newParticle.maxSpeed*0.05;
    newParticle.particleSize = random(3, 6);
    
    // move particles towards centre of screen
    newParticle.target.x = width/2;
    newParticle.target.y = height/2;
    
    particles.add(newParticle);
  }
}

PVector generateRandomPos(int x, int y, float mag) {
  PVector randomDir = new PVector(random(0, width), random(0, height));
  
  //PVector pos = new PVector(random(0, width), random(0, height));
  PVector pos = new PVector(x, y);
  pos.sub(randomDir);
  pos.normalize();
  pos.mult(mag);
  pos.add(x, y);
  
  return pos;
}