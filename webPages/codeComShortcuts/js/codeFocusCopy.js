import { allSubSectionChildren } from "./focusDrops.js"
const childs = allSubSectionChildren
const copycodes = document.querySelectorAll('.copy-code')
// Childs are any items focused on in sub-section
childs.forEach(el =>{
    el.addEventListener('click', e => {
        e.preventDefault()
        console.log(e.target)
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){   
            const copycodes = e.target.querySelectorAll('.copy-code')
            focusCopyCodes(copycodes)
        }
    })
    el.addEventListener('focus', e => {
        copycodes.forEach(el => {
            removeTabIndex(el)
        })
    })
})
function removeTabIndex(el){
    el.removeAttribute('tabindex')
}
function focusCopyCodes(copycodes){
    copycodes.forEach(el => {
        el.setAttribute('tabindex','0')
    })
}