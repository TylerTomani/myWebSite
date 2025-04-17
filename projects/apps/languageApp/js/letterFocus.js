export const translateSentenceTextArea = document.querySelector('.translate-sentence textarea');
export const translationTextArea = document.querySelector('.translation textarea');
// import { translateBtn } from "./translate.js";
const changeLangItems = document.querySelectorAll('.change-lang-container > *');
const playBtn = document.querySelector('#playBtn');
const playItems = document.querySelectorAll('.play-container > *');
const homelink = document.querySelector('#homelink');
let iChangeLangItems = 0;
let iPlayItems = 1 /** [2]index is middle  playBtn */;
let textareaFocus = false;
let firstPress = true;  // Tracks first press of 'L'

let lastTextArea 
let lastLanguageBtn
let startedLang = false
let startedPlay = false
let lastPlayBtn = playItems[2] // [2] is middle play button normal speed


export const keys = {
    cmd: { pressed: false },
    shift: { pressed: false },
};
addEventListener('keyup', (e) => {
    if (e.key.toLowerCase() === 'shift') {
        keys.shift.pressed = false;
    }
});

// Navigation logic on keydown
addEventListener('keydown', (e) => {
    let letter = e.key.toLowerCase();
    if (letter === 'shift') {
        keys.shift.pressed = true;
    }
    if (!textareaFocus) {
        if (letter === 'h') {
            homelink.focus()
        }
        if (letter === 't') {
            scrollTo(0, 0);
            translateSentenceTextArea.focus();
        }
        ////////////  This below code could be cleaner
        
        if(letter == 'l'){
            if(!startedLang){
                changeLangItems[0].focus()
                startedLang = true
            } else{
                if (keys.shift.pressed) {
                    // Navigate backward
                    iChangeLangItems = (iChangeLangItems + changeLangItems.length - 1) % changeLangItems.length;
                    lastLanguageBtn = changeLangItems[iChangeLangItems]
                } else {
                    // Navigate forward
                    iChangeLangItems = (iChangeLangItems + 1) % changeLangItems.length;
                    lastLanguageBtn = changeLangItems[iChangeLangItems]
                }
                if(lastLanguageBtn){

                    lastLanguageBtn.focus();
                }
            }                
        }
        if(letter == 'p'){
            if(!startedPlay){
                playItems[2].focus()
                startedPlay = true
            } else{
                if (keys.shift.pressed) {
                    // Navigate backward
                iPlayItems = (iPlayItems + playItems.length - 1) % playItems.length;
                lastPlayBtn = playItems[iPlayItems]
                } else {
                    // Navigate forward
                    iPlayItems = (iPlayItems + 1) % playItems.length;
                    lastPlayBtn = playItems[iPlayItems]
                }
                lastPlayBtn.focus();
            }                
        }
        
        ////////////////////////////////////////////////
    }
        
});

[translateSentenceTextArea,translationTextArea].forEach(el => {
    el.addEventListener('focus', e => {
        textareaFocus = true
        lastTextArea = e.target
    })
    el.addEventListener('focusout', e => {
        textareaFocus = false
    })
})
changeLangItems.forEach(el => {
    el.addEventListener('focus', e => {
        lastLanguageBtn = e.target
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if (letter == 'p') {
            // iPlayItems -= 1
            // lastPlayBtn = playItems[iPlayItems]
            if(lastPlayBtn){
                lastPlayBtn.focus()
            }
        }

    })
})
playItems.forEach(el => {
    el.addEventListener('focus', e => {
        lastPlayBtn = e.target
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'l'){
            iChangeLangItems -= 1
            // lastLanguageBtn = changeLangItems[iChangeLangItems]
            if(lastLanguageBtn){
                lastLanguageBtn.focus()
            }   
        }
        
    })
})

