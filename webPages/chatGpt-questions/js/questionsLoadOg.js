export const mainTargetDiv = document.getElementById('mainTargetDiv')
import { addCopyCodes } from "./copy-code-export.js"
import { handleQuestions } from "./toggleQuestions.js"
import { DropTopics } from "./dropTopic.js"
import { letterFocus } from "./letterFocus-myChatGpt.js"
const topics = document.querySelectorAll('.topics-container > li > a')
let clicked = false
topics.forEach(el => {
    if(el.hasAttribute('autofocus')){
        fetchLessonHref(el.href)
        console.log(el.href)
    } else {
        fetchLessonHref(`home.html`)
    }
    el.addEventListener('focusout', e => {
        clicked = false
    })
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        fetchLessonHref(e.target.href)
        if(!clicked){
            clicked = true
        } else
        if(clicked){
            mainTargetDiv.focus()

        } 
    })
})

function fetchLessonHref(href) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            // Inject the retrieved HTML into the target div
            mainTargetDiv.innerHTML = html;
            ////////////// This function is located in lesson-temp.js ////////////////////////////////////////////////////////////////////////////////////
            addCopyCodes()
            handleQuestions()
            DropTopics()
            letterFocus()
            
        })
        .catch(error => console.log('Error fetching content.html:', error));
}
