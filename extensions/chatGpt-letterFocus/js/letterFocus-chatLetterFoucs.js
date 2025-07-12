const mainScript = document.querySelector('#mainScript')
const homelink = document.querySelector('#homelink')
const endToTopBtn = document.querySelector('#endToTopBtn')
const textarea = document.querySelector('textarea')
const copyCodes = document.querySelectorAll('.code-elements-container .copy-code')
let iCopyCodes = 0
let elsArr = [nxtBtn,backBtn, endToTopBtn]
let iEl = 0
import { nxtBtn } from "./load-textarea-code.js"
import { backBtn } from "./load-textarea-code.js"
let focusedMainScript = false
textarea.addEventListener('focus', e => {
    e.target.scrollTop = 0;
});
textarea.addEventListener('keydown', e => {
    let key = e.key.toLowerCase()
    if(key === 'm'){
        scrollTo(0,0)
    }
})

mainScript.addEventListener('focus', () =>{
    
    focusedMainScript = true
})
mainScript.addEventListener('focusout', () =>{
    focusedMainScript = false
})
addEventListener('keydown', e => {

    let key = e.key.toLowerCase()
    if((e.metaKey || e.ctrlKey) && e.shiftKey && e.key == 'x'){
        focusedMainScript = false
        elsArr[iEl].focus()
        iEl = (iEl + 1) % elsArr.length
    }
    if(focusedMainScript) return
    if (key === 'm') {
        // e.preventDefault()
        mainScript.focus()
        // scrollTo(0,0)
    }
    if (key === 'b') {
        e.preventDefault()
        backBtn.focus()
    }
    if (key === 'n') {
        e.preventDefault()
        nxtBtn.focus()
    }
    if (key === 'h') {
        if (!homelink.hasAttribute('tabindex')) {
            homelink.setAttribute('tabindex', '0')
        }
        console.log(homelink)
        homelink.focus()
    }
    if (key === 'e') {
        if (!endToTopBtn.hasAttribute('tabindex')) {
            endToTopBtn.setAttribute('tabindex', '0')
        }
        endToTopBtn.focus()
    }
    if (key === 't') {
        nxtBtn.focus()
        
    }
    if(!isNaN(key)){
        let intlet = parseInt(key)
        copyCodes[intlet -1]?.focus()
        let iCopyCodes = intlet - 1 
    }
    if(!isNaN(key)){
        let intlet = parseInt(key)
        copyCodes[intlet - 1]?.focus()
        let iCopyCodes = intlet - 1
    }
    if (key == 'c') {
        // copyCodes[iCopyCodes].focus()
        if(e.metaKey)return
        if (e.shiftKey) {

            console.log('shift c')
            iCopyCodes = (iCopyCodes - 1 + copyCodes.length) % copyCodes.length
            copyCodes[iCopyCodes].focus()
            // if (iCopyCodes === -1) iCopyCodes = copyCodes.length - 1;
            return
        } else if (!e.shiftKey) {
            console.log('c')
            copyCodes[iCopyCodes].focus()
            iCopyCodes = (iCopyCodes + 1) % copyCodes.length
            if (iCopyCodes === -1) iCopyCodes = 0;
        }

    }
});

endToTopBtn.addEventListener('keydown', e => {
    let key = e.keyCode
    if(key === 13){
        console.log(endToTopBtn)
        endToTopBtn.click()
    }
})

copyCodes.forEach(el => {
    el.addEventListener('focus', e =>{e.target.scrollIntoView({behavior:'smooth', block: 'start'})})
})