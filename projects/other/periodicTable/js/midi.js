window.AudioContext = window.AudioContext || window.webskitAudioContent 
const elements = document.querySelectorAll('.element')
const arrElements = Array.from(elements)
const startBtn = document.getElementById('start')
let oscillators = {}
let ctx 
document.addEventListener('DOMContentLoaded', () => {
    startBtn.addEventListener('click', () => {
        if (!ctx || ctx.state === 'closed') {
            ctx = new AudioContext();
        } else if (ctx.state === 'suspended') {
            ctx.resume();
        }
    });

    // Auto-start the AudioContext
    setTimeout(() => {
        startBtn.click();
    }, 200);
});

console.log(ctx)

if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success,failure);
}
function success(midiAccess){
    midiAccess.onstatechange = updateDevices 
    const inputs = midiAccess.inputs
    inputs.forEach(input => {
        input.addEventListener('midimessage', handleInput)
    })
}
function updateDevices(event){
    // console.log(`name ${event.port.name}`)
}
function failure(){console.log('could not connect midi')}
function handleInput(e){
    const data = e.data; // data should be a Uint8Array
    // console.log('Data is Uint8Array:', data instanceof Uint8Array);
    // Convert Uint8Array to a normal array for easier inspection
    const normalArray = Array.from(data);
    // Access elements directly from Uint8Array
    const command = data[0];
    const note = data[1];
    const velocity = data[2];
    // console.log('command',command,'note',note,'velocity',velocity)

    switch (command){
        case 144:
            if(velocity > 0){
                arrElements[note].classList.add('highlight')
                noteOn(note,velocity)
                 
            }else {
                noteOff(note)
                arrElements[note].classList.remove('highlight')
            }
            break
        case 128:
                arrElements[note].classList.remove('highlight')
                noteOff(note)
            break        
    }
    
}
function noteOn(note, velocity) {
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = midiNoteToFrequency(note);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    oscGain.gain.value = velocity / 127 * 0.3; // Normalize velocity to gain

    osc.start();
    oscillators[note.toString()] = { osc, oscGain };
}

function noteOff(note) {
    const oscObj = oscillators[note.toString()];
    if (oscObj) {
        const { osc, oscGain } = oscObj;
        oscGain.gain.setValueAtTime(oscGain.gain.value, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
        osc.stop(ctx.currentTime + 0.03);
        delete oscillators[note.toString()];
        console.log(oscillators);
    }
}

function midiNoteToFrequency(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}   