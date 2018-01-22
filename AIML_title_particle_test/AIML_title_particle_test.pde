ArrayList<Particle> particles = new ArrayList<Particle>();
color bgColor = color(0);
int numParticles = 10;

void setup() {
  fullScreen();
  noCursor();
  background(bgColor);
  makeParticles(numParticles);
}

void draw() {
  background(0);
  for (int x = particles.size ()-1; x > -1; x--) {
    // Simulate and draw pixels
    Particle particle = particles.get(x);
    particle.move();
    
    particle.draw();


  }
}

void makeParticles(int particlesNumber) {
  for (int i = 0; i < particlesNumber; i++) {
    Particle newParticle;
    newParticle = new Particle();
        
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
  
  PVector pos = new PVector(x, y);
  pos.sub(randomDir);
  pos.normalize();
  pos.mult(mag);
  pos.add(x, y);
  
  return pos;
}