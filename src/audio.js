window.analyzeAudio = function (stream) {
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();
    var analyser = audioContext.createAnalyser();
    source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
}