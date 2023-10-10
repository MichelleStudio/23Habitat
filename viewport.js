class Viewport {
  constructor(sceneHeight){
    // deck perspective 45 degrees
    this.sceneHeight = sceneHeight
    this.deckExtraWidth = height - sceneHeight
    this.sceneWidth = width - 2 * this.deckExtraWidth
    this.deck = [createVector(this.deckExtraWidth, this.sceneHeight),
                createVector(width-this.deckExtraWidth, this.sceneHeight),
                createVector(0,height),
                createVector(width,height)]
  }
  

  render() {
    
    push()
    //fill(225)
    //noStroke()
    //rect(this.deckExtraWidth, 0, this.sceneWidth,sceneHeight)
    image(bckgrnd,0,0,width,height);
    
    pop()
    /*
    stroke(0)
    line(this.deckExtraWidth, this.sceneHeight, width-this.deckExtraWidth, this.sceneHeight)
    line(this.deckExtraWidth, this.sceneHeight, 0, height)
    line(width-this.deckExtraWidth, this.sceneHeight, width, height)
    line(0,height,width,height)
    */
    
  }
  
  position() {     
    let margin = 30
    let y = random(sceneHeight + margin, height-margin)
    let x = random(height-y+margin, width-(height-y)-margin) 

     //console.log(createVector(x,y))
     return createVector(x,y)
  
  }
}