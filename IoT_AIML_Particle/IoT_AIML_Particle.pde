ArrayList<Particle2D> particles = new ArrayList<Particle2D>();
int numParticles = 1000;

void setup() {
  size(800,600);
  background(0);
  makeParticles(numParticles);
}

void draw() {
  background(0);
  for (int x = particles.size ()-1; x > -1; x--) {
    // Simulate and draw pixels
    Particle2D particle = particles.get(x);
    particle.move();
    
    particle.draw();
  }
  
}