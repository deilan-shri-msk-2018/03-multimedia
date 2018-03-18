var audioBufferLength;
var audioData;

window.draw = function draw(canvas, canvasContext, analyser, video) {
    if (!audioBufferLength || !audioData) {
        audioBufferLength = analyser.frequencyBinCount;
        audioData = new Uint8Array(audioBufferLength);
    }
    drawVideo(canvasContext, video);
    drawBlend(canvasContext);
    drawAudio(analyser, canvasContext, audioData);

    requestAnimationFrame(function () {
        draw(canvas, canvasContext, analyser, video);
    });
}

function drawVideo(canvasContext, video) {
    canvasContext.drawImage(video, 0, 0);
}

function drawBlend(canvasContext) {
    canvasContext.globalCompositeOperation = "hard-light";
    canvasContext.fillStyle = "rgba(80, 0, 0, 0.5)";
    canvasContext.fillRect(0, 0, width, height);
}

function drawAudio(analyser, canvasContext) {
    analyser.getByteTimeDomainData(audioData);
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(255, 255, 255)';

    canvasContext.beginPath();
    var sliceWidth = width / audioBufferLength;
    var x = 0;
    for (var i = 0; i < audioBufferLength; i++) {

        var v = audioData[i] / 128;
        var y = v * height / 10;

        if (i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }

        x += sliceWidth;
    }
    canvasContext.lineTo(width, height);
    canvasContext.stroke();
}