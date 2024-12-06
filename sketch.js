let population = [];
let targetSize = 50;
let mutationRate = 0.1;

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 20; i++) {
    population.push({ size: random(10, 100), x: random(width), y: random(height) });
  }
}

function draw() {
  background(220);
  
  // Display the population
  noStroke();
  for (let individual of population) {
    fill(individual.size > targetSize ? 'red' : 'green');
    circle(individual.x, individual.y, individual.size);
  }
  
  // Display target size
  fill(0);
  textSize(16);
  text(`Target Size: ${targetSize}`, 10, 20);  // Corrected template literal syntax
}

function mousePressed() {
  // Apply mutation
  for (let individual of population) {
    if (random() < mutationRate) {
      individual.size += random(-5, 5); // Mutate size slightly
    }
  }
  
  // Select survivors based on proximity to target size
  population = population.sort((a, b) => abs(a.size - targetSize) - abs(b.size - targetSize));
  population = population.slice(0, 10); // Keep the best half
  
  // Reproduce to maintain population size
  while (population.length < 20) {
    let parent = random(population);
    population.push({ size: parent.size + random(-2, 2), x: random(width), y: random(height) });
  }
}
