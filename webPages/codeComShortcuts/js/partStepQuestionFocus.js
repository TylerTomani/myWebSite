(function(){
    const homelink = document.getElementById('homelink')
const parts = document.querySelectorAll('.dropPart')
const stepsContainers = document.querySelectorAll('.steps-container')
const stepTxts = document.querySelectorAll('.step-txt')

 let partsFocused = true
 let stepsFocused = false

function hideStepsContainers(){
    stepsContainers.forEach(el => {
        if(!el.classList.contains('hide') && !el.classList.contains('show')){
            el.classList.add('hide')
        }
        if(el.classList.contains('show')){
            const stepTxts = el.querySelectorAll('.chatgpt-question-container > .chatgpt-question')
            addTabIndex(stepTxts)
        }
    })
}
hideStepsContainers()

function getPartContainer(parent){
    if(parent.classList.contains('part')){
        return parent
    } else if (parent.parentElement){
        return getPartContainer(parent.parentElement)
    } else {
        return null
    }
}

function partsFocus(key){
    if(key === 'p'){
        part01.focus()
    }
    parts.forEach(el => {
        if(key === el.innerText[5]){
            el.focus()
        }
    })
} 
function stepsFocus(key,e){
    const part = getPartContainer(e.target.parentElement)
    const dropPart = part.querySelector('.dropPart')
    const stepTxtx = part.querySelectorAll('.steps-container > .chatgpt-question-container > .step-txt')
    if(key === 'p'){
        dropPart.focus()
    }

    stepTxts.forEach(el => {
        const h4 = el.querySelector('h4')
        if(key === h4.innerText[h4.innerText.length - 1]){
            el.focus()
        }
    })
}

parts.forEach(el => {
    el.addEventListener('keydown', e => {
        let key = e.keyCode
        if(key === 13){
            toggleStepsContainer(e.target)
        }
    })
    el.addEventListener('click', e => {
        const children = e.target.querySelectorAll('*')
        children.forEach(el => {
            toggleStepsContainer(e.target)
        })
        e.preventDefault()
        toggleStepsContainer(e.target)
    })
    el.addEventListener('focus', e => {
        partsFocused = true
        stepsFocused = false
    })
})
stepsContainers.forEach(el => {
    el.addEventListener('focusin', e =>{
        stepsFocused = true
        partsFocused = false
    })
})

function toggleStepsContainer(el){
    const part  = getPartContainer(el.parentElement)
    const stepsContainer = part.querySelector('.steps-container')
    if(stepsContainer.classList.contains('hide')){
        hideStepsContainers()
        stepsContainer.classList.remove('hide')
        const stepTxt = stepsContainer.querySelectorAll('.chatgpt-question-container > .chatgpt-question')
        addTabIndex(stepTxt)
    } else {
        stepsContainer.classList.add('hide')
    }
}

function addTabIndex(els){
    els.forEach(el => {
        el.setAttribute('tabindex','1')
    })
}

addEventListener('keydown', e => {
    let key = e.key.toLowerCase()
    if(key === 'h'){
        homelink.focus()
    }
    if(partsFocused){
        partsFocus(key)
    } 
    if(stepsFocused) {
        stepsFocus(key,e)
    }
})
}())