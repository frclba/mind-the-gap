let model;

let testFile, trainFile;
let trainData, testData;

let trainButton, testButton, guessButton;

const IMG_SQUARE = 28;
const IMG_SIZE = IMG_SQUARE * IMG_SQUARE;
let DATA_AMOUNT;


function preload() {
  trainFile = loadTable("zdata/train1001.csv", 'csv', 'header');
  // testFile = loadTable("zdata/test1001.csv", 'csv', 'header');
  testFile = trainFile;
  console.log(trainFile);
}


function handleButtons(){
  trainButton.mouseClicked(() => {
    trainModel(trainData);
  });

  testButton.mousePressed(() => {
    console.log("Testing");
    const result = model.evaluate(testData.xs, testData.ys, {batchSize: 30});
    result.print();
  });

  guessButton.mousePressed(() => {
    guess();
  });
}

function setup() {
  createCanvas(200, 200);
  background(0);
  DATA_AMOUNT = trainFile.rows.length;

  createModel();
  trainData = cleanData(trainFile);

  //TODO -> fix train data without label

  // testData = cleanData(trainFile);
  testData = trainData;

  trainButton = createButton("Train");
  testButton = createButton("Test");
  guessButton = createButton("Guess");
}

function guess(){
  let inputs = [];
  let img = get();
  img.resize(IMG_SQUARE, IMG_SQUARE);
  img.loadPixels();
  for (let i = 0; i < IMG_SIZE; i++) {
    let bright = img.pixels[i * 4];
    inputs[i] = (bright) / 255.0;
  }
  let xs = tf.tensor2d(inputs);
  const guess = model.predict(inputs);

  let prediction = createP("Number: " + indexOf(guess.argMax(1)));
}

function draw() {
  strokeWeight(8);
  stroke(255);

  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  handleButtons();
}
