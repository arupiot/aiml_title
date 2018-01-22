class Particle2D
{
  PVector pos = new PVector(0, 0);    // position
  PVector vel = new PVector(0, 0);    // velocity
  PVector acc = new PVector(0, 0);    // acceleration
  PVector target = new PVector(0, 0); // target position

  float maxSpeed = 10.0;     // maximum speed
  float maxForce = 1.5;      // attraction force
  float particleSize = 5; 
  
  Particle2D () {   
  }
  
  Particle2D (PVector position) {
    pos = position;
  } 
  
  Particle2D(PVector p, PVector v) {
    pos = p;
    vel = v;
  }
  
  
  // particle move
  void move() {
    //float distance = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

    // create vector towards target
    PVector towardsTarget = new PVector(this.target.x, this.target.y);
    towardsTarget.sub(this.pos);
    towardsTarget.normalize();
    towardsTarget.mult(this.maxSpeed);

    // create acceleration vector
    PVector steer = new PVector(towardsTarget.x, towardsTarget.y);
    steer.sub(this.vel);
    steer.normalize();
    steer.mult(this.maxForce);
    this.acc.add(steer);

    // move particle
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  
  
  void draw() {
    ellipse(this.pos.x, this.pos.y, this.particleSize, this.particleSize);
  }
   

} 