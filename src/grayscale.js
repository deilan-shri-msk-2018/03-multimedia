// var video = document.getElementById('video');
var video = document.createElement('video');
var canvas = document.getElementById('canvas');
var width = 640;
var height = 480;

var handleSuccess = function (stream) {
    video.srcObject = stream;
    // video.play();
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    draw(video, context);
};

navigator.mediaDevices.getUserMedia({
        video: true
    })
    .then(handleSuccess);

function draw(video, canvasContext) {
    canvasContext.drawImage(video, 0, 0);
    canvasContext.globalCompositeOperation = "hard-light"; 
    canvasContext.fillStyle = "rgba(80, 0, 0, 0.5)";
    canvasContext.fillRect(0, 0, width, height);

    // var img = new Image();
    // img.onload = function () {
    //     canvasContext.drawImage(img, 0, 0);
    // };
    // img.src = 'noise.png';

    // var imageData = canvasContext.getImageData(0, 0, 640, 480);
    // var data = imageData.data;

    // for (var i = 0; i < data.length; i += 4) {
    //     var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    //     // red
    //     data[i] = brightness;
    //     // green
    //     data[i + 1] = brightness;
    //     // blue
    //     data[i + 2] = brightness;
    // }

    // canvasContext.putImageData(imageData, 0, 0);
    requestAnimationFrame(() => {
        draw(video, canvasContext);
    });
}