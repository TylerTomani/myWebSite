
const topicTitles = document.querySelectorAll('.topic-title')
const topicSnips = document.querySelectorAll('.topic-snips')
const dropCodeCmds = document.querySelectorAll('.drop-code-cmd')
const codeCmds = document.querySelectorAll('.code-cmd')
const allSubTopicChildren = document.querySelectorAll('.topic-snips > *')
export let currentTopic 
let clicked = false
const keys = {
    meta :{
        pressed: false
    }
}
function hideAllCodeCmds(){
    codeCmds.forEach(el => {
        if(!el.classList.contains('show')){
            el.classList.add('hide')
        } 
    })
}
hideAllCodeCmds()
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
dropCodeCmds.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        const snip = getSnip(e.target.parentElement)
        const codeCmd = snip.querySelector('.code-cmd')
        codeCmd.classList.toggle('hide')
    })
})

function getSnip(parent){
    if(parent.classList.contains('snip')){
        return parent
    } else if (parent.parentElement){
        return getSnip(parent.parentElement)
    } else {
        return null
    }
}
function getTopic(parent){
    if(parent.classList.contains('topic')){
        return parent
    } else if (parent.parentElement){
        return getTopic(parent.parentElement)
    } else {
        return null
    }
}

