class Agent{
  constructor(size){
    this.pos = createVector (width/2, height - viewport.deckExtraWidth/2)
    this.size = size

    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.friction = 0.99 
  }
  
  bounceEdges(){
      if(this.pos.x < viewport.deckExtraWidth || this.pos.x > width-viewport.deckExtraWidth){
        this.vel.x *=-.1
    }
      if(this.pos.x < viewport.deckExtraWidth ){
        this.pos.x = viewport.deckExtraWidth
    }
          if(this.pos.x > width-viewport.deckExtraWidth){
        this.pos.x = width - viewport.deckExtraWidth
        this.vel.x *=-.1
    }
      if(this.pos.y < viewport.sceneHeight || this.pos.y > height){
        this.vel.y*=-.1
    }
          if(this.pos.y < viewport.sceneHeight){
        this.pos.y =viewport.sceneHeight
    }
          if(this.pos.y > height ){
        this.pos.y = height
        this.vel.y*=-.1
    }
  }

  move(x,y){
    this.acc.add(x,y)
    this.vel.add(this.acc)
    this.acc.mult(0)
  }  

  stretchX() {   
    // render into the viewport deck, stretch x
   if(this.pos.x >= width/2) {
        return(this.pos.x + (this.pos.y - viewport.sceneHeight))
    } else {
        return(this.pos.x - (this.pos.y - viewport.sceneHeight))
    } 
  }
  
  render(){
    push()
    //rect(this.stretchX(), this.pos.y-this.size, 5, this.size);
    imageMode(CENTER);
    image(agentimg,this.stretchX(), this.pos.y,agentSize,agentSize*2.5);
    pop()
  }
  
  update() {
      this.vel.mult(this.friction)
      this.pos.add(this.vel)
      this.bounceEdges()
  }
}