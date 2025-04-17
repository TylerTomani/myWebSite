// Check if the browser supports the Web MIDI API
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(success, onMIDIFailure);
    }

    function success(midiAccess) {
        // document.getElementById('status').textContent = 'MIDI Access Obtained!';

        const inputs = midiAccess.inputs;
        inputs.forEach(input => {
            input.addEventListener('midimessage', onMIDIMessage);
        });
    }

    function onMIDIFailure() {
        console.log('Could not access MIDI devices.');
    }

    

    function onMIDIMessage(event) {
        // const [command, note, velocity] = event.data;
        const arrData = Array.from(event.data)
        // console.log(typeof(arrData))
        // Logging the MIDI data
        // console.log(`Command: ${command}, Note: ${note}, Velocity: ${velocity}`);

        
        
        
        
    }