"use strict";

function generateMeme (img, canvas, context, topTextInput, bottomTextInput) {
    canvas.width = img.width;
    canvas.height = img.height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0);

    let fontSize = canvas.width*document.getElementById('textSize').value;
    context.font = fontSize + 'px Impact';
    context.fillStyle = document.getElementById('textColor').value;
    context.strokeStyle = "black";
    context.lineWidth = fontSize/20;
    context.textAlign = 'center';

    context.textBaseline = 'top';
    topTextInput.split('\n').forEach((text, index) => {
        context.fillText(text, canvas.width / 2, fontSize * index, canvas.width);
        context.strokeText(text, canvas.width / 2, fontSize * index, canvas.width);
    });

    context.textBaseline = 'bottom';
    bottomTextInput.split('\n').reverse().forEach((text, index) => {
        context.fillText(text, canvas.width / 2, canvas.height - (fontSize * index), canvas.width);
        context.strokeText(text, canvas.width / 2, canvas.height - (fontSize * index), canvas.width);
    });
    
}

function init() {
    let topTextInput = document.getElementById('topText');
    let bottomTextInput = document.getElementById('bottomText');
    let imageInput = document.getElementById("image-input");
    let generateBtn = document.getElementById('generate-btn');
    let canvas = document.getElementById('meme-canvas');
    let context = canvas.getContext('2d');

    canvas.width = canvas.height = 0;

    generateBtn.addEventListener("click", () => {
        setEventForButton(imageInput, canvas, context, topTextInput, bottomTextInput);
    });
}

function setEventForButton(imageInput, canvas, context, topTextInput, bottomTextInput) {
    let reader = new FileReader();
    reader.onload = () => {
        let img = new Image;
        img.src = reader.result;
        img.onload = () => {generateMeme(img, canvas, context, 
            topTextInput.value, bottomTextInput.value);}
    }
    reader.readAsDataURL(imageInput.files[0]);
}

$('.format').on('input', () => {
    let topTextInput = document.getElementById('topText');
    let bottomTextInput = document.getElementById('bottomText');
    let imageInput = document.getElementById("image-input");
    let canvas = document.getElementById('meme-canvas');
    let context = canvas.getContext('2d');
    setEventForButton(imageInput, canvas, context, topTextInput, bottomTextInput);
});

init();