class Plant{
  constructor(l, dna_, category) {
    this.position = l.copy(); // Location
    this.health = 200; // Life timer
    this.dna = dna_; // DNA
    this.category = category;
    
    // DNA will determine 
    this.species = parseInt(random(3)); 
    this.fcolor = parseInt(random(3));
    this.width = map(this.dna.genes[1], 0, 1, 100*sscale, 200*sscale);
    this.height = map(this.dna.genes[2], 0, 1, 100*sscale, 200*sscale);
    this.rotation = map(this.dna.genes[3], 0, 1, 0, 2*PI);
  }

  evolve(environ=1000) {
    this.health -= 1 + environ/1000;
    this.width += 0.1 + environ/10000;
    this.height += 0.1 + environ/10000; 
    if(dist(agent.stretchX(),agent.pos.y, this.position.x,this.position.y) < 50) {
       this.health -= 20
    }
    
  }

  reproduce(environ=1000) {
    // asexual reproduction
    //random(number), bigger, slower
    if (random(7) < environ/10000) {
      // Child is exact copy of single parent
      let childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.01);
      return new Plant(viewport.position(), childDNA, this.category);
    } else {
      return null;
    }
  }

  display() {
    if (!this.dead()) {
      push();
      tint(255, this.health);
      imageMode(CENTER);
      translate(this.position.x, this.position.y);
      rotate(this.rotation);
      //console.log(this.category)
      //console.log(this.species)
      //image(foliage[this.category][this.species], 0, 0, this.width, this.height);
       let d = this.species * 3 + this.fcolor
       //console.log(d)
       image(foliage[this.category][d], 0, 0, this.width, this.height);
      pop();
    }
  }

  dead() {
    // close to agent die

    if (this.health < 0.0) {
      return true;
    } else {
      return false;
    }
  }
  
}