var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var width = 640;
var height = 480;

navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    })
    .then(streamVideo);

function streamVideo(stream) {
    video.srcObject = stream;
    video.play();

    var audioContext = new(window.AudioContext || window.webkitAudioContext)();
    var analyser = audioContext.createAnalyser();
    source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    if (canvas) {
        var canvasContext = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        window.draw(canvas, canvasContext, analyser, video);
    }
};