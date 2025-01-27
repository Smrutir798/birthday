document.addEventListener("DOMContentLoaded", function () {
    const flames = document.querySelectorAll(".flame, .flame2, .flame3");
    const text = document.querySelector(".text");
    const audio = new Audio('happy.mp3'); 
    let stream; 
    function blowOutCandles() {
        flames.forEach((flame) => {
            flame.style.transition = "opacity 0.5s ease";
            flame.style.opacity = 0;
        });
        
        text.style.transition = "top 0.5s ease, opacity 0.5s ease";
        text.style.top = "-90px";
        text.style.opacity = 1;

        audio.play();
    }


    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const dataArray = new Uint8Array(analyser.fftSize);

        analyser.fftSize = 2048; 
        microphone.connect(analyser);

        function detectBlow() {
            analyser.getByteTimeDomainData(dataArray);

            
            let maxAmplitude = 0;
            for (let i = 0; i < dataArray.length; i++) {
                const amplitude = Math.abs(dataArray[i] - 128); 
                if (amplitude > maxAmplitude) {
                    maxAmplitude = amplitude;
                }
            }

      
            if (maxAmplitude > 50) {
                blowOutCandles();
            }

            requestAnimationFrame(detectBlow);
        }

        detectBlow();
    }).catch((error) => {
        console.error("Microphone access denied:", error);
    });
});

function stopMicrophoneAccess() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

function blowOutCandles() {
    flames.forEach((flame) => {
        flame.style.transition = "opacity 0.5s ease";
        flame.style.opacity = 0;
    });
    text.style.transition = "top 0.5s ease, opacity 0.5s ease";
    text.style.top = "-90px";
    text.style.opacity = 1;

    audio.play();
    stopMicrophoneAccess();
}
