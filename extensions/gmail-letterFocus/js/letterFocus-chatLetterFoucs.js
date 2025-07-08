const mainScript = document.querySelector('#mainScript')
const homelink = document.querySelector('#homelink')
const endToTopBtn = document.querySelector('#endToTopBtn')
const copyCodes = document.querySelectorAll('.copy-code')
import { nxtBtn } from "./load-textarea-code.js"
let focusedMainScript = false
mainScript.addEventListener('focus', () =>{
    
    focusedMainScript = true
})
mainScript.addEventListener('focusout', () =>{
    focusedMainScript = false
})
let elsArr = [nxtBtn, endToTopBtn, homelink]
let iEl = 0
addEventListener('keydown', e => {
    let key = e.key.toLowerCase()
    if((e.metaKey || e.ctrlKey) && e.shiftKey && e.key == 'x'){
        focusedMainScript = false
        elsArr[iEl].focus()
        iEl = (iEl + 1) % elsArr.length
    }
    if(focusedMainScript) return
    if (key === 'm') {
        e.preventDefault()
        mainScript.focus()
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
    // if(!isNaN(key)){
    //     let intlet = parseInt(key)
    //     copyCodes[intlet -1]?.focus()
    // }
    if(!isNaN(key)){
        let intlet = parseInt(key)
        copyCodes[intlet - 1]?.focus()
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