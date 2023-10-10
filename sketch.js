// 231010 reduce audio file size
// 231010 half the size of foliage
// 231010 quater size scale

// sequence: viewport, agent, dna, plant, habitat, sounds
// disturb negative is bad

let sscale = .5
let canvasHeight = 1052 * sscale
let canvasWidth = 1869 * sscale
let sceneHeight = 620 * sscale
let agentSize = 40 * sscale

let viewport
let agent
let agentimg

let bckgrnd  
let habitat

let ftype = ['BV','CA','CS']
let fset = ['1a','2b','3c']
let fcolor = [[255,0,0],[0,255,0],[0,0,255]]
let foliage = {'BV': [], 'CA': [], 'CS': []}

let countImg = {}

let ambientSounds = [];
let soundEffects = [-40, -40, -30, -50, -50, -20, -30, -30, 20, 40, 50, 50, 50, 30, 25, 25]
let soundIndex =0;
let soundInterval = 10;
let disturbanceLevel = 0;


function preload() {
  bckgrnd = loadImage("peripheral/background.jpg");
  agentimg = loadImage("peripheral/agent.png");
  
  //bvCountImg = loadImage("peripheral/frameBV.png");
  //caCountImg = loadImage("peripheral/frameCA.png");
  //cvCountImg = loadImage("peripheral/frameCS.png");
  
  countImg['BV'] = loadImage("foliage/BV1a.png");
  countImg['CA'] = loadImage("foliage/CA1a.png");
  countImg['CS'] = loadImage("foliage/CS1a.png");
  
  for (let i = 0; i < ftype.length; i++) {
    for (let j = 0; j < fset.length; j++) {
        foliage[ftype[i]].push(loadImage('foliage/'+ftype[i]+fset[j]+'.png'));
    }
  }
  streamsound = createAudio('audio/loop.mp3')
  
  for (let i = 0; i < 16; i++) {
     ambientSounds[i] = createAudio('audio/sample'+(i+1)+'.mp3')
  }
}

function setup() {
  frameRate(5);
  createCanvas(canvasWidth, canvasHeight)
  
  viewport = new Viewport(sceneHeight)
  agent = new Agent(agentSize)
  habitat = new Habitat(5)
}

function draw() {
  clear()

  viewport.render()
 
  agent.move(random(-5,5)*sscale,random(-5,5)*sscale)
  agent.update()
  agent.render()
  
  habitat.evolve();
  habitat.display();
  
  soundInterval -= 1;
  if(soundInterval == 0) {
      soundIndex =                           parseInt(random(ambientSounds.length)) ;
      ambientSounds[soundIndex].play();
      disturbanceLevel = soundEffects[soundIndex]
      habitat.disturb(disturbanceLevel);
      //console.log(soundIndex);
      soundInterval = parseInt(random(10, 50));      
  }
  

  const darkerGray = color(70,69,80)
  const lightPurple = color(168,162,215)
  //const darkerGray = color(0,255,0)
  //const lightPurple = color(255,0,0)
  textSize(40*sscale);
  
  for (let i = 0; i < ftype.length; i++) {
    let t = 30
    let p = habitat.plants[ftype[i]].length
    let b = map((p>t)?t:p, 0, t, 0, 1);
    let c = lerpColor(lightPurple, darkerGray, b)
    //console.log(b)
    push()
    fill(c)
    text(p, (600+i*220)*sscale, 400*sscale);
 
    tint(c)
    image(countImg[ftype[i]],(550+i*220)*sscale,440*sscale, 120*sscale, 120*sscale)
    pop()
  }

}

function mousePressed(){
    getAudioContext().resume() 
    streamsound.play()
    streamsound.loop(true)
    streamsound.volume(0.8)
}