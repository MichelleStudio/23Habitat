class Habitat {
  constructor(num) {
    this.environ = 1000;
    this.plants = {'BV': [], 'CA': [], 'CS': []};     
    
    for (let i = 0; i < num; i++) {
      this.plants['BV'].push(new Plant(viewport.position(), new DNA(), 'BV'));
      this.plants['CA'].push(new Plant(viewport.position(), new DNA(), 'CA'));
      this.plants['CS'].push(new Plant(viewport.position(), new DNA(), 'CS'));
    }
  }

  /* Make a new plant
  born(x, y) {
    let l = createVector(x, y);
    let dna = new DNA();
    this.plants.push(new Plant(l, dna));
  }
  */
  
  disturb(effect) {
    this.environ += effect;
    if(this.environ > 1000) {
      this.environ = 1000;
    }
    if(this.environ < 50) {
      this.environ = 50;
    }
  }
  
  evolve() {
    //this.environs.evolve();
    for (let j = 0; j<3; j++) {
    // Cycle through the ArrayList backwards b/c we are deleting
      for (let i = this.plants[ftype[j]].length - 1; i >= 0; i--) {
        // Plants grow
        let p = this.plants[ftype[j]][i];
        p.evolve();
        // If it's dead, make environs
        if (p.dead()) {
          this.plants[ftype[j]].splice(i, 1);
          this.disturb(1);
        }
      
        let child = p.reproduce(this.environ);
        if ((this.plants[ftype[j]].length < this.environ) && (child != null)) {                                                             this.plants[ftype[j]].push(child);
          this.disturb(-.9);
          //console.log(this.plants[ftype[j]].length)
        }  
      }  
    } // end of ftype
    
  }
  
  display () {
    for (let j = 0; j<3; j++) {
      for (let i = this.plants[ftype[j]].length - 1; i >= 0; i--) {
        let p = this.plants[ftype[j]][i];
        p.display();
      }
    }
  }
}