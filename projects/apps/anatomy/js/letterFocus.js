export const imgContainers = Array.from(document.querySelectorAll('.images-container > .img-container'))
export const catButtons = Array.from(document.querySelectorAll('.cats button'))
/** we will have to make imagin async, use promises?? */
imgContainers.forEach(el => {
    el.setAttribute('tabindex', 0)
    // el.addEventListener('keydown', keysChangeImage)
    // el.addEventListener('click', changeCatImages)
    el.addEventListener('keydown', changeCatImages)
})
/** Add current letter function so if letter changes, it will go back to the previos element 
 * with that was last clicked or focused, SO, when Ax_t2_DNE_SMR has focus, then 'm' is pressed
 * and 'MRI has focus, if 'a' is pressed when 'MRI' or any other letter has focus, focus 
 * return to Ax_t2_dne_SMR
 */
document.addEventListener('DOMContentLoaded', () => {
    catButtons.forEach(el => {el.setAttribute('tabindex', 0)})
    
    /** FIGURE OUT what map is, it looks like an key value creater but i don't think it 
     * the right thing for this
     */


    const buttonMap = new Map();
    // Create a map to store buttons grouped by their first letter
    catButtons.forEach((button) => {
        const firstLetter = button.innerText[0].toLowerCase();
        if (!buttonMap.has(firstLetter)) {
            buttonMap.set(firstLetter, []);
        }
        buttonMap.get(firstLetter).push(button);
    });

    // Maintain the current index for each letter
    const buttonIndexes = new Map();
    document.addEventListener('keydown', (e) => {
        const letter = e.key.toLowerCase();
        const isShiftPressed = e.shiftKey;
        if(!isNaN(letter)){
            focusToImaging(letter)
        }
        // Check if the letter exists in the map
        if (buttonMap.has(letter)) {
            const buttons = buttonMap.get(letter);
            
            // Initialize index for the letter if not already set
            if (!buttonIndexes.has(letter)) {
                buttonIndexes.set(letter, 0);
            }

            let currentIndex = buttonIndexes.get(letter);

            // Adjust index based on Shift key (cycling backward)
            if (isShiftPressed) {
                currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            } else {
                // Cycle forward
                currentIndex = (currentIndex + 1) % buttons.length;
            }

            buttonIndexes.set(letter, currentIndex);

            // Focus the corresponding button
            buttons[currentIndex].focus();
        }
    });
});
function focusToImaging(letter){
    let intlet = parseInt(letter) 
    intlet -= 1 
    if(intlet <= imgContainers.length - 1){
        imgContainers[intlet].focus()
    }
}
function changeCatImages(e){
    // let letter = e.key.toLowerCase()
    console.log(letter)
    if(letter == 'enter'){
        console.log(e.target)
        
    }
    
}