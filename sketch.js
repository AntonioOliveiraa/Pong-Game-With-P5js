// Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 23;
let raio = 12;
//let esquerdaBolinha = xBolinha - raio;
//let superiorBolinha = yBolinha - raio;
//let inferiorBolinha = yBolinha + raio;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
//let direitaRaquete = xRaquete + raqueteComprimento;
//let superiorRaquete = yRaquete;
//let inferiorRaquete = yRaquete + raqueteAltura;

// Variáveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

// Placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

let colidiu = false;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
  
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
  yRaquete = constrain(yRaquete, 5, 305);
}

/*function verificaColisaoRaquete() {
  if (esquerdaBolinha < direitaRaquete && superiorBolinha < inferiorRaquete && inferiorBolinha > superiorRaquete) {
    velocidadeXBolinha *= -1;
  }
}*/

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

// Movimento Automático
function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
  yRaqueteOponente = constrain(yRaqueteOponente, 5, 305);
}

// ===============================================================
// Modo Multiplayer
/*function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  yRaqueteOponente = constrain(yRaqueteOponente, 5, 305);
}*/
// ===============================================================

function incluiPlacar() {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if(xBolinha > 590) {
    meusPontos++;
    ponto.play();
  }
  if(xBolinha < 10) {
    pontosDoOponente++;
    ponto.play();
  }
}


