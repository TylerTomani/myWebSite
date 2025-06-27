import { letterFocus } from "./letterFocus-myChatGpt.js"
// import { letterFocus } from "./letterFocus-myChatGptOg.js"
export const mainTargetDiv = document.getElementById('mainTargetDiv')
import { addCopyCodes } from "./copy-code-export.js"
import { handleQuestions } from "./toggleQuestions.js"
import { ToggleTopicQuestions } from "./toggleTopicQuestions.js"
import { MarginDropQuestions } from "./margin-drop-questions.js"

document.addEventListener('DOMContentLoaded', () => {
    const topics = document.querySelectorAll('.sidebar-topics-container > li > a')
    let clicked = false
    let loaded = false

    function rmveHighlight(){
        topics.forEach(el => {
            el.classList.remove('highlight')
        })
    }
    topics.forEach(el => {
        // If any <a> has autofocus, fetch its href first and only once
        // if (!loaded && el.hasAttribute('autofocus')) {
        if (!loaded && el.classList.contains('show') || el.hasAttribute('autofocus')) {
            fetchLessonHref(el.href)
            loaded = true
        }

        el.addEventListener('focusout', () => {
            clicked = false
        })

        el.addEventListener('mousedown', e => {
            fetchLessonHref(e.target.href)
        })
        el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            rmveHighlight()
            e.target.classList.toggle('highlight')
            if (!clicked) {
                clicked = true
                fetchLessonHref(e.target.href)
            } else {
                mainTargetDiv.focus()
            }
        })

        el.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault()
                e.stopPropagation()
                fetchLessonHref(el.href)
                if (!clicked) {
                    clicked = true
                } else {
                    mainTargetDiv.focus()
                }
            }
        })
    })

    // If no element had autofocus, load home.html by default
    if (!loaded) {
        fetchLessonHref('home.html')
    }

    function fetchLessonHref(href) {
        fetch(href)
            .then(response => response.text())
            .then(html => {
                mainTargetDiv.innerHTML = html
                handleQuestions()
                ToggleTopicQuestions()
                MarginDropQuestions()
                letterFocus()
                addCopyCodes()
            })
            .catch(error => console.log('Error fetching content:', error))
    }
})