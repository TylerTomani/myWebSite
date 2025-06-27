/** propbably don't need all sideBarTopic, only 
 the last clicked side bar*/
import { sideBarTopics } from "./toggleSidebar-topic.js"
function updateDropTopics(){
    return document.querySelectorAll('.drop-topic')
}
function updateTopicsQuestions(){
    return document.querySelector('.topics-questions')
}
export function letterFocus() {
    const topicsQuestions = updateTopicsQuestions()
    const mainTargetDiv = document.querySelector('#mainTargetDiv')
    let letteredEls = [];
    let iLetter = 0;
    let currentLetter = '';
    let lastFocusedEl 
    let mainTopicsQuestionsFocued = false
    // const 
    /** since drop-topics are changed when loaded we need to get them all here */
    /** NOT sure if this is a waste ofYour Wi-Fi now back to Dr. Phil $50 million definition no traffic traffic gas station yeah try to come Parton court sorry dude apologize but I will see you bhad Bhabie famous computer space */
    mainTargetDiv.addEventListener('keydown', e => {
        let key = e.key
        if(key === 13){
            console.log(mainTargetDiv)
            const dropQuestions = document.querySelectorAll('.dropQuestion, .drop-question')
            dropQuestions.forEach(el => {
                console.log(el)
                el.classList.add('hide')
            })
        }
        
    })
    const dropTopics = updateDropTopics()
    let dropTopicsFocused = false
    dropTopics.forEach(el => {
        addEventListener('focusin',  e => {dropTopicsFocused = true});
        addEventListener('focusout',  e => {dropTopicsFocused = false});
    })
    // topicsQuestions.addEventListener('focusin', e => mainTopicsQuestionsFocued = true)
    // topicsQuestions.addEventListener('focusout', e => mainTopicsQuestionsFocued = false)
    addEventListener('keydown', e => {
        const allFocusEls = document.querySelectorAll('[id]');
        let letter = e.key.toLowerCase();
        let topicsQuestions = findTopicsQuestions(e.target.parentElement)
        if (letter == 'b') {
            const homelink = document.getElementById("#homelink")
            letteredEls.push(homelink)
            letteredEls.forEach(el => console.log(el))
        }
        if (topicsQuestions) {
            lastFocusedEl = e.target
            if(!mainTopicsQuestionsFocued && lastFocusedEl && letter == 'm'){
                // console.log(mainTopicsQuestionsFocued)
                console.log(lastFocusedEl)
            }
        }
        if(!isNaN(letter)){
            numFocusCodeSnips(e,letter)
        } else if(!e.metaKey){
            if (letter == 'm' && e.target.id == 'mainTargetDiv') {
                scrollTo(0, 0)
            }
            // Rebuild the array of elements matching the first letter
            letteredEls = [];
            allFocusEls.forEach(el => {
                if (el.id[0].toLowerCase() === letter) {
                    letteredEls.push(el);
                }
            });

            if (letteredEls.length === 0) return; // Exit if no elements match

            // If pressing a different letter, reset the index
            if (letter !== currentLetter) {
                iLetter = 0;
            } else {
                if (!e.shiftKey) {
                    // Move forward
                    iLetter = (iLetter + 1) % letteredEls.length;
                } else {
                    // Move backward correctly
                    iLetter = (iLetter - 1 + letteredEls.length) % letteredEls.length;
                }
            }

            // Focus on the correct element
            letteredEls[iLetter].focus();

            // special case 'm'
            if (lastFocusedEl && e.target.id == 'mainTargetDiv' && letter == 'm') {
                lastFocusedEl.focus()
                console.log(lastFocusedEl)
            }
        }
        // Update current letter for next key press
        currentLetter = letter;
    });

}
function numFocusCodeSnips(e,letter){
    const questionAnswer = getQuestionAnswer(e.target.parentElement)
    const answerTxt = questionAnswer.querySelector('.answer-txt')
    if(answerTxt.classList.contains('hide'))return
    
    let intLet = parseInt(letter)
    let codeSnips = answerTxt.querySelectorAll('.copy-code')
    console.log(codeSnips.length)
    if(intLet <= codeSnips.length){
        codeSnips[intLet - 1].focus()
    }
}
function findTopicsQuestions(parent){
    if(parent.classList.contains('topics-questions')){
        return parent
    } else if (parent.parentElement){
        return findTopicsQuestions(parent.parentElement)
    } else {
        return null
    }
}
function getQuestionAnswer(parent){
    if(parent.classList.contains('question-answer')){
        return parent
    } else if (parent.parentElement){
        return getQuestionAnswer(parent.parentElement)
    } else {
        return null
    }
}
letterFocus();
