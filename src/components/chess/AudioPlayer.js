const audio1 = new Audio("piece1.mp3");
const audio2 = new Audio("piece2.mp3");
const audio3 = new Audio("piece3.mp3");

const sounds = [audio1, audio2, audio3];

function playSound(sound, delay) {        
    const audio = sounds[Math.floor(Math.random() * sounds.length)];    
    if (delay) {
        setTimeout(() => {                
            audio.play();
        }, delay);
    } else {
        audio.play();
    }
}

export default playSound;