// import { mainTargetDiv } from "./questionsLoad.js";
import { mainTargetDiv } from "./inject-html.js";


export function ToggleTopicQuestions(){
    const dropTopics = document.querySelectorAll('.drop-topic');
    let mainTargetDivFocused = false
    mainTargetDiv.addEventListener('focusin', e => {
        mainTargetDivFocused = true
    })
    mainTargetDiv.addEventListener('focusout', e => {
        mainTargetDivFocused = false
    })
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()        
        if (mainTargetDivFocused){
            dropTopics.forEach(el => {
                if(!e.metaKey || !e.ctrlKey){
                    if (letter == el.innerText[0].toLowerCase()) {
                        // el.focus()
                    }
                }
            })
        }
    })
    dropTopics.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            toggleTopicQuestions(e)
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if(letter == 'enter'){                
                e.preventDefault()
                toggleTopicQuestions(e)
            }
        })
    })
    function hideAllTopicQuestionsContainers(){
        dropTopics.forEach(el =>  {
            const topic = getTopic(el.parentElement)
            if(topic){
                const questionsContainer = topic.querySelector('.questions-container')
                if(questionsContainer && !questionsContainer.classList.contains('show')){
                    questionsContainer.classList.add('hide')   
                } 
            } 
        })
    }
    hideAllTopicQuestionsContainers()
}
function toggleTopicQuestions(e){
    const topic = getTopic(e.target.parentElement)
    const questionsContainer = topic.querySelector('.questions-container')
    questionsContainer.classList.toggle('hide') 
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
