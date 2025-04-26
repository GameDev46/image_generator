/*

 _____                         ______                 ___   ____ 
|  __ \                        |  _  \               /   | / ___|
| |  \/  __ _  _ __ ___    ___ | | | |  ___ __   __ / /| |/ /___ 
| | __  / _` || '_ ` _ \  / _ \| | | | / _ \\ \ / // /_| || ___ \
| |_\ \| (_| || | | | | ||  __/| |/ / |  __/ \ V / \___  || \_/ |
 \____/ \__,_||_| |_| |_| \___||___/   \___|  \_/      |_/\_____/


*/

/* 
	AUTHOR: GameDev46

	Youtube: https://www.youtube.com/@gamedev46
	Github: https://github.com/GameDev46
*/

import { NeuralNetwork } from "./neuralNetwork.js";

const pixelWidth = 50;
const pixelHeight = 50;

const pixelSize = 10;

const normalisingNum = 4;

// type can be either "classification" or "imageClassification"

let presets = {
	inputs: 10,
	layers: [50, 50],
	outputs: 3,
	type: "classification",
	learningRate: 0.2,
	decimalPlaces: 5,
	activation: ["sigmoid", "sigmoid", "sigmoid"]
}

let net = new NeuralNetwork(presets);

let trainingData = []

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = pixelSize * pixelWidth;
canvas.height = pixelSize * pixelHeight;

document.getElementById("activationSelect").addEventListener("change", e => {

	let activation = document.getElementById("activationSelect").value;

	presets.activation = [activation, activation]

	if (activation == "tanh") {

		presets.activation = ["sigmoid", activation, activation];
		
	}

	/*if (activation == "sin") {
		presets.activation = [activation, activation];
	}*/

	resetNetwork();
	updateImage();

})


document.getElementById("uploadFolder").addEventListener("change", e => {

	const selectedFolder = e.target.files;
	processFolder(selectedFolder)

})

let loadedImages = [];

function createImageFromUpload(image) {
	let capture;

	let canvas = document.getElementById("photoCanvas");
	let ctx = canvas.getContext('2d')

	let width = pixelWidth;
	let height = pixelHeight;

	canvas.width = width;
	canvas.height = height;

	ctx.drawImage(image, 0, 0, width, height);
	capture = ctx.getImageData(0, 0, width, height);

	let pixels = capture.data;

	// Normalise data

	for (let i = 0; i < pixels.length; i++) {

		pixels[i] = pixels[i] / 255;

		//pixels[i] *= 2;
		//pixels[i] -= 1;

	}

	/*let grayscale = [];
	
	// Grayscale

	for (let i = 0; i < pixels.length; i++) {

		let averageCol = pixels[i] + pixels[i + 1] + pixels[i + 2];
		averageCol = averageCol / 4
		averageCol = averageCol / 255

		grayscale.push(averageCol)
		
	}*/

	return pixels;
}

function processFolder(folder) {

	trainingData = [];

	for (let i = 0; i < Math.min(2, folder.length); i++) {

		let imgURL = URL.createObjectURL(folder[i]);

		loadedImages[i] = new Image;

		loadedImages[i].onload = function() {

			let cap = createImageFromUpload(loadedImages[i]);

			URL.revokeObjectURL(this.src)

			trainingData[i] = {
				targets: cap
			}

		}

		loadedImages[i].src = imgURL;

	}

}


let isTraining = false;

let trainInterval;

document.getElementById("trainButton").addEventListener("click", e => {

	isTraining = !isTraining;

	if (isTraining) {

		document.getElementById("trainButton").innerText = "Training";

		trainInterval = setInterval(trainNet, 200);

	}
	else {

		clearInterval(trainInterval);

		document.getElementById("trainButton").innerText = "Train";

	}

})

let trainingOnce = false

document.getElementById("trainOnce").addEventListener("click", e => {

	if (!trainingOnce) {

		trainingOnce = true;

		document.getElementById("trainOnce").innerText = "Training";

		trainNet()

		document.getElementById("trainOnce").innerText = "1 Epoch";

		trainingOnce = false;

	}

})

document.getElementById("resetButton").addEventListener("click", e => {

	resetNetwork();

});

function resetNetwork() {

	net = new NeuralNetwork(presets);

	updateImage();

}

function setupListeners() {

	let inputElements = document.getElementsByTagName("input");

	for (let i = 0; i < inputElements.length; i++) {

		if (inputElements[i].type == "range") {

			inputElements[i].addEventListener("input", e => {

				updateImage();

			})

		}

	}

}

function trainNet() {

	for (let x = 0; x < pixelWidth * 4; x += 4) {
		for (let y = 0; y < pixelHeight * 4; y += 4) {

			let index = x + (y * pixelWidth);

			let normX = x / (pixelWidth * normalisingNum);
			let normY = y / (pixelHeight * normalisingNum);

			if (presets.activation[2] == "tanh" || presets.activation[0] == "leakyrelu" || presets.activation[0] == "sin") {
				normX *= 2;
				normX -= 1;

				normY *= 2;
				normY -= 1;
			}

			for (let i = 0; i < trainingData.length; i++) {

				let red = trainingData[i].targets[index];
				let green = trainingData[i].targets[index + 1];
				let blue = trainingData[i].targets[index + 2];

				let s = i;

				if (presets.activation[3] == "tanh") {
					red = (trainingData[i].targets[index] * 2) - 1;
					green = (trainingData[i].targets[index + 1] * 2) - 1;
					blue = (trainingData[i].targets[index + 2] * 2) - 1;

					s *= 2;
					s -= 1;
				}

				if (presets.outputs == 1) {

					let alpha = (red + green + blue) / 3;

					net.train([normX, normY, s, s, s, s, s, s, s, s], [alpha]);

				}
				else {

					net.train([normX, normY, s, s, s, s, s, s, s, s], [red, green, blue]);

				}

			}

		}

	}

	updateImage();

}

document.getElementById("colourMode").addEventListener("change", e => {

	if (document.getElementById("colourMode").value == "grayscale") {
		presets.outputs = 1;
	}
	else {
		presets.outputs = 3;
	}

	resetNetwork();

	updateImage();

})

document.getElementById("learningRate").addEventListener("change", e => {

	presets.learningRate = Number(document.getElementById("learningRate").value);
	net.learningRate = Number(document.getElementById("learningRate").value);

})

function updateImage() {

	let input1 = Number(document.getElementById("slider1").value)
	let input2 = Number(document.getElementById("slider2").value)
	let input3 = Number(document.getElementById("slider3").value)
	let input4 = Number(document.getElementById("slider4").value)
	let input5 = Number(document.getElementById("slider5").value)
	let input6 = Number(document.getElementById("slider6").value)
	let input7 = Number(document.getElementById("slider7").value)
	let input8 = Number(document.getElementById("slider8").value)

	if (presets.activation[2] == "tanh" || presets.activation[0] == "leakyrelu" || presets.activation[0] == "sin") {
		input1 = (input1 * 2) - 1;
		input2 = (input2 * 2) - 1;
		input3 = (input3 * 2) - 1;
		input4 = (input4 * 2) - 1;
		input5 = (input5 * 2) - 1;
		input6 = (input6 * 2) - 1;
		input7 = (input7 * 2) - 1;
		input8 = (input8 * 2) - 1;
	}

	for (let x = 0; x < pixelWidth * 4; x += 4) {
		for (let y = 0; y < pixelHeight * 4; y += 4) {

			let normX = x / (pixelWidth * normalisingNum);

			let normY = y / (pixelHeight * normalisingNum);

			if (presets.activation[0] == "tanh" || presets.activation[0] == "leakyrelu" || presets.activation[0] == "sin") {
				normX *= 2;
				normX -= 1;

				normY *= 2;
				normY -= 1;
			}

			let guess = net.predict([normX, normY, input1, input2, input3, input4, input5, input6, input7, input8]);

			let red = 0;
			let green = 0;
			let blue = 0;

			if (presets.outputs == 1) {

				red = guess[0] * 255;
				green = guess[0] * 255;
				blue = guess[0] * 255;

			}
			else {

				red = guess[0] * 255;
				green = guess[1] * 255;
				blue = guess[2] * 255;

			}

			if (presets.activation[3] == "tanh") {
				red = ((red / 255) + 1) * 255 * 0.5;
				green = ((green / 255) + 1) * 255 * 0.5;
				blue = ((blue / 255) + 1) * 255 * 0.5;
			}

			ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")";
			ctx.fillRect(x * 0.25 * pixelSize, y * 0.25 * pixelSize, pixelSize, pixelSize);

		}
	}

}

updateImage();

setupListeners();
