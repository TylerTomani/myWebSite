export const mainTargetDiv = document.getElementById('mainTargetDiv')
import { addCopyCodes } from "./copy-code-export.js"
import { handleQuestions } from "./toggleQuestions.js"
import { ToggleTopicQuestions } from "./toggleTopicQuestions.js"
import {MarginDropQuestions} from "./margin-drop-questions.js"
import { letterFocus } from "./letterFocus-myChatGpt.js"
document.addEventListener('DOMContentLoaded', () => {

    const topics = document.querySelectorAll('.sidebar-topics-container > li > a')
    let clicked = false

    topics.forEach(el => {
        if (el.hasAttribute('autofocus')) {
            fetchLessonHref(el.href)
            return
        } else {
            // fetchLessonHref('home.html')
        }
        el.addEventListener('focusout', e => {
            clicked = false
        })
        el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            fetchLessonHref(e.target.href)
            if (!clicked) {
                clicked = true
            } else if (clicked) {
                mainTargetDiv.focus()
            }
        })
    })

    function fetchLessonHref(href) {
        fetch(href)
            .then(response => response.text())
            .then(html => {
                mainTargetDiv.innerHTML = html
                addCopyCodes()
                handleQuestions()
                ToggleTopicQuestions()
                MarginDropQuestions()
                letterFocus()
            })
            .catch(error => console.log('Error fetching content.html:', error))
    }
    // I don't get this from chatGPT !! 
    /**
     * Problem (putting this in a forLoop like you usually do ):
        -It loops through every topic.
        - It fetches either the element’s href or home.html for each one — which means you might fetch multiple times on load (one for each element).
        
        If your goal is to fetch only once:

        If one has autofocus, fetch that and stop.

        Otherwise, fetch home.html.

        Then yes — using .some() is more efficient and semantically clearer.
     */
    // Load 'home.html' by default if no link has autofocus
    // const hasAutoFocus = Array.from(topics).some(el => el.hasAttribute('autofocus'))
    // if (!hasAutoFocus) {
    //     fetchLessonHref('home.html')
    // } else {
    //     fetchLessonHref()
    // }
})
