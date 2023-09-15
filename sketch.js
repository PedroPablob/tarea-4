let angleSlider;
let tree = [];
let maxDepth = 10; // Profundidad máxima del árbol
let canvasWidth = 2600;
let canvasHeight = 1190;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  angleSlider = createSlider(0, TWO_PI, PI / 4, 0.01);
  angleSlider.input(generateTree); // Llama a generateTree cuando se cambia el valor del deslizador
  let p0 = createVector(width / 2, height);
  let p1 = createVector(width / 2, height - 200); // Ajusta la longitud de la raíz
  let root = new Branch(p0, p1, 1); // La raíz tiene profundidad 1
  tree[0] = root;

  // Árbol fractal (copia de tu código)
  let p2 = createVector(width / 2, height); // Cambia las coordenadas según tu necesidad
  let p3 = createVector(width / 2, height - 200); // Ajusta la longitud de la raíz
  let root2 = new Branch(p2, p3, 1); // La raíz tiene profundidad 1
  tree[1] = root2;
}

function draw() {
  background(51);
  angle = angleSlider.value();
  translate(canvasWidth / 2, canvasHeight); // Centra el árbol en el nuevo lienzo
  for (let i = 0; i < tree.length; i++) {
    tree[i].show();
  }
}

function generateTree() {
  tree = []; // Borra el árbol existente
  let p0 = createVector(0, 0); // Origen en el centro del nuevo lienzo
  let p1 = createVector(0, -200); // Ajusta la longitud de la raíz
  let root = new Branch(p0, p1, 1); // La raíz tiene profundidad 1
  tree[0] = root;
  growTree(root);
}

function growTree(branch) {
  if (branch.depth < maxDepth) {
    let branchA = branch.branchA();
    let branchB = branch.branchB();
    tree.push(branchA);
    tree.push(branchB);
    growTree(branchA);
    growTree(branchB);
  }
}

class Branch {
  constructor(begin, end, depth) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.depth = depth;

    this.branchA = function () {
      let dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(angle);
      dir.mult(0.67);
      let newEnd = p5.Vector.add(this.end, dir);
      let b = new Branch(this.end, newEnd, this.depth + 1);
      return b;
    };

    this.branchB = function () {
      let dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(-angle);
      dir.mult(0.67);
      let newEnd = p5.Vector.add(this.end, dir);
      let b = new Branch(this.end, newEnd, this.depth + 1);
      return b;
    };

    this.show = function () {
      stroke(255);
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    };
  }
}









