import { imgContainers } from "./letterFocus.js";
import { catButtons } from "./letterFocus.js";
catButtons.forEach(el => {
    el.addEventListener('keydown', e => {
        
    })
})
let imgIndex
function focusToImaging(letter) {
    let intlet = parseInt(letter)
    intlet -= 1
    if (intlet <= imgContainers.length - 1) {
        imgContainers[intlet].focus()
    }
}
function keysChangeImage(e) {
    let letter = e.key.toLowerCase()
    let img = e.target.querySelector('img')
    let imgsrc = img.src
    console.log(letter)
    if (letter == 'enter') {
        console.log(imgsrc)
        console.log(imgsrc.length)
        imgIndex = true
        console.log(imgsrc[imgsrc.length - 6])
    }

}
imgContainers.forEach(el => {
    el.addEventListener('keydown', keysChangeImage)
    // el.addEventListener('click', clickChangeImage)
})

function changeImage(next = true,imgIndex){
    
}