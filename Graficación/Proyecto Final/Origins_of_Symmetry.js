// Elaborado con la biblioteca p5.js (Lenguaje capaz de ser ejecutado por navegadores web)
// Declaracion de variables definidas(const)

//PARAMETROS DE LORENZ
const SIGMA = 10;
const RHO = 28;
const BETA = 8/3;

//CONDICIONES INICIALES
const X_0 = 0.11;
const Y_0 = 1;
const Z_0 = 1;

//CAMBIO EN EL TIEMPO
const DT = 1/60;
const MAX_LEN = 60;

// Variables globales
let offset = 0;
let p;
let Lorenz;
let prev;
let next;
let path = []; // Arreglo

function setup() 
{
  createCanvas(windowWidth, windowHeight, WEBGL); //lienzo
  colorMode(HSB, 100); // Cambia la forma en que p5.js interpreta los datos de color; Hub, Saturation and Brightness
  p = createVector(X_0, Y_0, Z_0);
}

function draw() 
{
    //inicio del rgabador de gif
   // if(frameCount===1){ capturer.start(); }

  // Rotación
  rotateY(frameCount * 0.005); //del eje Y
  rotateZ(frameCount * 0.005); //... Z
  scale(width/80); // Función que permite modificar el tamaño de un elemento en el plano 
  background(15); // color de fondo
  strokeWeight(0.6); // Establece el ancho del trazo utilizado
  stroke(255); // Define el color trazado
  noFill(); // Sin relleno la figura formada

  Lorenz = createVector(
	  SIGMA * (p.y - p.x),
  	p.x * (RHO - p.z) - p.y,
  	p.x * p.y - BETA * p.z 
  );

  Lorenz.mult(DT);
  p.add(Lorenz);
  path.push(p.copy());

  // Condicional para conocer si la longitud del path (ruta cookies) es mayor al valor de MAX_LEN ya definido
  if (path.length > MAX_LEN) 
  {
    path.splice(0, 1);
    ++offset;
  }
  
  prev = path[0];

  for (let i = 1; i < path.length; ++i)
  {
    //trazado y color de rectangulos
    fill(199+Math.random())
    rect(prev.x+noise(prev.x), prev.x+noise(prev.x),prev.y+noise(prev.y), prev.z*
    noise(prev.z));
    next = path[i];
    stroke(i + offset, 50, 50 - (path.length - i) * MAX_LEN); 
    prev = next;
  }
}