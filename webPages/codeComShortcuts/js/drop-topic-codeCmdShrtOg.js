// const allIdEls = document.querySelectorAll('[id]') // 
const allAs = document.querySelectorAll('a') // 
const topicTitles = document.querySelectorAll('.topic-title')
const topicSnips = document.querySelectorAll('.topic-snips')
 const allSubTopicChildren = document.querySelectorAll('.topic-snips > *')
export let currentTopic 
let clicked = false
const keys = {
    meta :{
        pressed: false
    }
}
function hideAllTopicSnips(){
    topicSnips.forEach(el => {
        if(!el.classList.contains('show')){
            el.classList.add('hide')
        } 
    })
}
hideAllTopicSnips()
topicTitles.forEach(el => {
    
    el.addEventListener('focusout', e => {
        clicked = false
    })
    el.addEventListener('focus', e => {
        const topic = getTopic(e.target.parentElement)
        const subTopic = topic.querySelector('.topic-snips')
        clicked = false
        if (!subTopic.classList.contains('hide')) {
            currentTopic = topic

        }
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        const topic = getTopic(e.target.parentElement)
        const subTopic = topic.querySelector('.topic-snips')      
        subTopic.classList.toggle('hide')
        currentTopic = topic
    })
    
})
function getTopic(parent){
    if(parent.classList.contains('topic')){
        return parent
    } else if (parent.parentElement){
        return getTopic(parent.parentElement)
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
    if(!e.metaKey){
        topicTitles.forEach(el => {
            console.log(el)
            if (letter == el.innerText[0].toLowerCase()) {
                el.focus()
            }
        })
    }
    if(currentTopic){
        if(!isNaN(letter)){
            const intLetter = parseInt(letter)
            const topicChildren = currentTopic.querySelectorAll('.topic-snips > *')
            numFocus(topicChildren, intLetter)
        }
    } else {
        if(!isNaN(letter)){
            const intLetter = parseInt(letter)
            allSubTopicChildren.forEach(el => {
                el.setAttribute('tabindex', 0)
            })
            allSubTopicChildren[intLetter - 1].focus()
        }
    }

});
function numFocus(arr,intLetter){
    arr.forEach(el => {
        el.setAttribute('tabindex','0')
    })
    arr[intLetter - 1].focus()
}       