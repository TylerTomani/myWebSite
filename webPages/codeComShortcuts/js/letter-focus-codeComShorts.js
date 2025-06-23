addEventListener('DOMContentLoaded', () => {
    [...document.querySelectorAll('a')].forEach(el => {
    el.addEventListener('click', e =>{
        e.preventDefault()
    })
})
});

const codeCmdTitles = document.querySelectorAll('.code-cmd > h4 a')
codeCmdTitles.forEach(el => {
    el.addEventListener('click', e =>{
        e.preventDefault()
    })
})




function numChildrenFocus(e,letter){
    const intLetter = parseInt(letter)
    const subSection = getSection(e.target) ? getSection(e.target.parentElement) : null
    console.log(subSection)
    const codeCmds = subSection.querySelectorAll('.copy-code')
    codeCmds[intLetter - 1]?.focus()
}
function getSection(parent){
    if(parent.classList.contains('section')){
        return parent
    } else if (parent.parentElement){
        return getSection(parent.parentElement)
    } else {
        return null
    }
}
addEventListener('keydown', e => {
    const key = e.key.toLowerCase()
    if (!isNaN(key)) {
        if(e.target == document.activeElement){
            numChildrenFocus(e,key)
        }
    }
    const allEls = [...document.querySelectorAll('a, .copy-code')].filter(el => {
        const rect = el.getBoundingClientRect()
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0
    })
    const letteredEls = allEls.filter(el =>{
        const text = el.textContent.trim().toLowerCase()
        return text.startsWith(key)
    })
    if(letteredEls.length == 0) return

    let activeEl = document.activeElement
    let iActiveInAll = [...allEls].indexOf(activeEl)
    let iInLettered = [...letteredEls].indexOf(activeEl)

    if(key !== window.lastLetterPressed){
        let newIndex;
        if (e.shiftKey) {
            // Shift + new letter = move UP from current position
            const prev = [...letteredEls].reverse().find(a => allEls.indexOf(a) < iActiveInAll);
            newIndex = letteredEls.indexOf(prev);
            if (newIndex === -1) newIndex = letteredEls.length - 1;
        } else {
            // New letter = move DOWN from current position
            const next = letteredEls.find(a => allEls.indexOf(a) > iActiveInAll);
            newIndex = letteredEls.indexOf(next);
            if (newIndex === -1) newIndex = 0;
        }
        letteredEls[newIndex]?.focus();
    } else {
        let newIndex;
        if (e.shiftKey) {
            newIndex = (iInLettered - 1 + letteredEls.length) % letteredEls.length;
        } else {
            newIndex = (iInLettered + 1) % letteredEls.length;
        }
        letteredEls[newIndex]?.focus();
    }
    window.lastLetterPressed = key;    
});