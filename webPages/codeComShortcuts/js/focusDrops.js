const allIdEls = document.querySelectorAll('[id]')
const sectionTitles = document.querySelectorAll('.section-title')
export const allSubSectionChildren = document.querySelectorAll('.sub-section > *')
let currentSection 
const keys = {
    meta :{
        pressed: false
    }
}
sectionTitles.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        const section = getSection(e.target.parentElement)
        const subSection = section.querySelector('.sub-section')
        toggleShow(subSection)
        currentSection = section
    })
    el.addEventListener('focus', e => {
        const section = getSection(e.target.parentElement)
        const subSection = section.querySelector('.sub-section')
        if(!subSection.classList.contains('hide')){
            currentSection = section

        }
    })
})

function toggleShow(el){
    if(!el.classList.contains('hide')){
        el.classList.add('hide')
    } else {
        el.classList.remove('hide')
    }
}
function getSection(parent){
    if(parent.classList.contains('section')){
        return parent
    } else if (parent.parentElement){
        return getSection(parent.parentElement)
    } else {
        return null
    }
}

addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'meta'){
        keys.meta.pressed = false
    }
    
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if (letter == 'meta') {
        keys.meta.pressed = true

    }
    if(!keys.meta.pressed){

        allIdEls.forEach(el => {
            if (letter == el.id[0]) {
                el.focus()
            }
        })
    }
        if(currentSection){
            if(!isNaN(letter)){
                const intLetter = parseInt(letter)
                const sectionChildren = currentSection.querySelectorAll('.sub-section > *')
                numFocus(sectionChildren, intLetter)
            }
        } else {
        if(!isNaN(letter)){
            const intLetter = parseInt(letter)
            allSubSectionChildren.forEach(el => {
                el.setAttribute('tabindex', 0)
            })
            allSubSectionChildren[intLetter - 1].focus()
        }
    }

});
function numFocus(arr,intLetter){
    arr.forEach(el => {
        el.setAttribute('tabindex','0')
    })
    arr[intLetter - 1].focus()
}