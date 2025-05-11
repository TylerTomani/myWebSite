export function handleQuestions(){
    // const dropTopics = document.querySelectorAll('.drop-topic')
    const dropQuestions = document.querySelectorAll('.dropQuestion, .drop-question')
    const questionsContainer = document.querySelectorAll('.questions-container')
    const answersTxt = document.querySelectorAll('.answer-txt')
    function hideQuestionsContainer() {
        questionsContainer.forEach(el => {
            if(!el.classList.contains('show')){
                el.classList.add('hide')
            }
        })  
    }
    hideQuestionsContainer()
    function hideAnswers() {
        answersTxt.forEach((el => {
            if(!el.classList.contains('show')){
                
                el.classList.add('hide')
            }
        }))
    }
    hideAnswers()
    
    dropQuestions.forEach((el) => {
        el.addEventListener('click', e => {
            console.log(e.target)
            e.preventDefault()
            toggleAnswer(e)
        })
        el.addEventListener('keydown', e => {
            let letter = e.key.toLowerCase()
            if (letter == 'enter') {
                toggleAnswer(e)
            }
        })
    })
    
    function toggleAnswer(e) {
        // e.preventDefault()
        const parent = getQuestionAnswerContainer(e.target.parentElement)
        const answerTxt = parent.querySelector('.answer-txt')
        if(answerTxt){
            answerTxt.classList.toggle('hide')
        }
        // console.log(parent)

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
function getQuestionAnswerContainer(parent){
    if(parent.classList.contains('question-answer')){
        return parent
    } else if (parent.parentElement){
        return getQuestionAnswerContainer(parent.parentElement)
    } else {
        return null
    }
}
handleQuestions()