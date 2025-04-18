
export function MarginDropQuestions(){
    const dropQuestions = document.querySelectorAll('.drop-question')
    const questH6Titles = document.querySelectorAll('.question-txt > h6.sr-only')
    dropQuestions.forEach((el, i) => {
        if (i == 0 || i % 2 == 0) {
            el.style.marginLeft = '30%';
        } else {
            el.style.marginRight = '30%';
            el.style.marginLeft = '3%';
        }
    })
    questH6Titles.forEach((el, i) => {
        if (i == 0 || i % 2 == 0) {
            el.style.marginLeft = '30%';
        } else {
            el.style.marginRight = '30%';
            el.style.marginLeft = '3%';
        }
    })
}
MarginDropQuestions()