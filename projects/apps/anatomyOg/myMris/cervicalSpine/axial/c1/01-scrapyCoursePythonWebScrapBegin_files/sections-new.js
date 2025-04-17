const nav = document.querySelector('nav.section-lesson-title')
export const targetDiv = document.querySelector('#targetDiv')
const aside = document.querySelector('aside')
const backlink = document.querySelector('#backlink')
const homelink = document.querySelector('#homelink')
const regexCmds = document.querySelector('#regexCmds')
const programShorcuts = document.querySelector('#programShorcuts')
const tutorialLink = document.querySelector('#tutorialLink')
const header = document.querySelector('header')
const sections = document.querySelectorAll('.section')
const lessons = document.querySelectorAll('.sub-section > li > a')
let started = false // Made this so the "s" key will go to section 1 when page first opens
let sectionsFocus = true
let lessonsFocus = false
let targetDivFocus = false

let iSection = 0
let iLesson = 0
let lastSection
let currentSelection 
function hideSubSections(){
    sections.forEach(el => {
        const sectionContainer = getSectionContainer(el.parentElement)
        const subSection = sectionContainer.querySelector('.sub-section')
        if(!subSection.classList.contains('show')){
            subSection.classList.add('hide')
        }
    })
}
hideSubSections()

nav.addEventListener("click", e => {
    
})
nav.addEventListener("keydown", e => {
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){
        aside.classList.toggle('hide')
    }
    if(letter == 's' || letter == 'a'){
        if(aside.classList.contains('hide')){
            aside.classList.remove('hide')
            if(currentSelection){
                currentSelection.focus()
            } else {
                sections[0].focus()
            }
        }
    }
    
    
})
aside.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'enter'){
        if(!currentSelection){
            sections[0].focus()
        } else {
            currentSelection.focus()
        }
        
    }
    
})
targetDiv.addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    if(letter == 's'){
        if(currentSelection){
            currentSelection.focus()
        } else {
            sections[0].focus()
        }
    }
})
const keys = {
    shift : { pressed: false}
}
function mainElementsFocus(letter) {
    switch (letter) {
        case 'a':
            aside.focus()
            scroll(0, 0)
            break
        case 'b':
            backlink.focus()
            break
        case 'h':
            homelink.focus()
            break
        case 'n':
            nav.focus()
            break
        case 'r':
            regexCmds.focus()
            break
        case 'm':
            targetDiv.focus()
            scrollTo(0, 0)
            break
        case 'p':
            programShorcuts.focus()
            break
        case 't':
            tutorialLink.focus()
            break
    }
}
sections.forEach(el => {
    el.addEventListener('focus', e => {
        sectionsFocus = true
        lessonsFocus = false
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        loadPage(e.target.href)
        scrollTo(0,0)
        toggleSubSections(e)
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        handleSections(e, letter)
        if(letter == 'enter'){
            currentSelection = e.target
        }
    })
})
function toggleSubSections(e){
    const sectionContainer = getSectionContainer(e.target.parentElement)
    const subSection = sectionContainer.querySelector('.sub-section')
    // if(subSection.classList.contains('show')){
    //     subSection.classList.remove('show')
    //     subSection.classList.add('hide')
    // } 
    console.log(subSection)
    if(subSection.classList.contains('hide')){
        hideSubSections()
        subSection.classList.remove('hide')
    } else {
        subSection.classList.add('hide')
    }
    
}
lessons.forEach(el => {
    el.addEventListener('focus', e => {
        sectionsFocus = false
        lessonsFocus = true
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        loadPage(e.target.href)
        currentSelection = e.target
    })
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        e.stopPropagation()
        if(letter == 'enter'){    
            loadPage(e.target.href)
            if(e.target == currentSelection){
                targetDiv.focus()
            }
        }
        if(letter == 's'){    
            const sectionContainer = getSectionContainer(e.target.parentElement)
            const section = sectionContainer.querySelector('.section')
            section.focus()
        }
        if(letter == 'm'){
            targetDiv.focus()
            scrollTo(0,0)
        }
        if (!isNaN(letter)) {
            const intLet = parseInt(letter)
            if(lessonsFocus){
                const subSection = getSubSection(e.target.parentElement)
                const lessons = subSection.querySelectorAll('li > a')
                console.log(lessons)
                lessons[intLet - 1].focus()
            }
        }
        currentSelection = e.target
    })

})
function handleSections(e,letter){
    if (sectionsFocus && !targetDivFocus) {
        if(!isNaN(letter)){
            iSection = parseInt(letter)
            iSection -= 1

        }else if (letter == 's' && !keys.shift.pressed) {
            iSection = (iSection + 1) % sections.length
        }else if (letter == 's' && keys.shift.pressed) {
            iSection = iSection > 0 ? (iSection - 1) : sections.length - 1
        }
        sections[iSection].focus()
    }
}
addEventListener('keyup', e => {
    let letter = e.key.toLowerCase()
    if(letter == 'shift'){
        keys.shift.pressed = false
    }    
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    mainElementsFocus(letter)
    if(letter == 'shift'){
        keys.shift.pressed = true
    }    
    if(letter == 's' && !started){
        sections[0].focus()
        started = true
        
    }
      
    if(letter == 'm'){
        targetDiv.focus()
        scrollTo(0,0)       
    }
    
})
function getSectionContainer(parent){
    if(parent.classList.contains('section-container')){
        return parent
    } else if (parent.parentElement){
        return getSectionContainer(parent.parentElement)
    } else {
        return null
    }
}
function getSubSection(parent){
    if(parent.classList.contains('sub-section')){
        return parent
    } else if (parent.parentElement){
        return getSubSection(parent.parentElement)
    } else {
        return null
    }
}
function loadPage(href){
    fetch(href)
    .then(response => response.text())
    .then(html => {
        targetDiv.innerHTML = html
    })
    .catch(error => console.log('no href'))
}

[backlink,homelink,regexCmds,programShorcuts,tutorialLink].forEach(el => {
    el.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 's' || letter == 'a'){
            if(aside.classList.contains('hide')){
                aside.classList.remove('hide')
            }
            if(currentSelection){
                currentSelection.focus()
            } else {
                sections[0].focus()
            }
            
        }
        
    })
})