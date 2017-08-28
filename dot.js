function Dot(x,y) {
  this.pos = createVector(random(width),random(height));
  this.target = createVector(x,y);
  this.vel = p5.Vector.random2D();//createVector();
  this.acc = createVector();
  this.r = 2;
  this.maxspeed = 5; //5
  this.maxforce = 2; //.3
  this.radius = 200;
}

Dot.prototype.behaviours = function () {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX,mouseY);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Dot.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Dot.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Dot.prototype.show = function() {
  stroke(255);
  strokeWeight(this.r);
  point(this.pos.x,this.pos.y);
  // ellipse(this.pos.x,this.pos.y,this.r,this.r);
}

Dot.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d<this.radius) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Dot.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  desired.setMag(this.maxspeed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Dot.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d<this.radius) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0,0);
  }
}
