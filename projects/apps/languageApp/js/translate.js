const translateSentence = document.querySelector('.translate-sentence')
const translation = document.querySelector('.translation')
import { translateSentenceTextArea } from "./letterFocus.js";
import { translationTextArea } from "./letterFocus.js";
import { keys } from "./letterFocus.js";
const translateBtn = document.getElementById('translateBtn')
const pasteBtn = document.getElementById('pasteBtn')
let started = false

/**
    Fix the below code in textarea so the pasteBtn only appears if text is in 
 clipboard.
 */
translateSentenceTextArea.addEventListener('input', e => {
    if(e.target.value == 't' && !started){
        pasteBtn.classList.add('active')
        e.target.value = ''
    }
    else{
        pasteBtn.classList.remove('active')
    }
    
    started = true
})
translateSentenceTextArea.addEventListener('keydown', e => {
    let key = e.keyCode
    if(!keys.shift.pressed && key == 9){
        e.preventDefault()
        translateBtn.focus()
        console.log(translateBtn)
    }
})
translateSentenceTextArea.addEventListener('focus', e => {
    if (e.target.value == '') {
        pasteBtn.classList.add('active')
    } 
})
translateSentenceTextArea.addEventListener('focusout', e => {
    pasteBtn.classList.remove('active')
    
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if (letter == 'meta') {
        keys.cmd.pressed = true
    }
})

translateSentence.addEventListener('focusin', e => {
    translateBtn.classList.add('active')
})
translation.addEventListener('focusin', e => {
    translateBtn.classList.remove('active')
})
translateSentenceTextArea.addEventListener('keyup', e => {
    keys.cmd.pressed = false
})
translateSentenceTextArea.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(keys.cmd.pressed && letter == 'enter'){
        translationTextArea.classList.add('active')      
        translationTextArea.focus()
    }
})
translationTextArea.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(keys.cmd.pressed && letter == 'enter'){
        translateSentenceTextArea.focus()
    }
})
translateBtn.addEventListener('click', e => {
    translationTextArea.classList.add('active')
    translationTextArea.focus()
    translateBtn.classList.remove('active')
})