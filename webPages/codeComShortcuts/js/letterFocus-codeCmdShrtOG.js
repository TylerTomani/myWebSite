const allAs = Array.from(document.querySelectorAll('a'))
let lastLetterPressed = ''
let iLetter = 0

addEventListener('keydown', (e) => {
    const key = e.key
    if (key.length > 1 || !/[a-zA-Z]/.test(key)) return  // ignore keys like Shift, Alt, etc.

    const letter = key.toLowerCase()
    const activeEl = document.activeElement
    const iActiveA = allAs.indexOf(activeEl)

    const letteredAs = allAs.filter(a => a.innerText.trim()[0]?.toLowerCase() === letter)
    if (!letteredAs.length) return

    const currentIndexInFiltered = letteredAs.indexOf(activeEl)

    if (letter !== lastLetterPressed) {
        // First press of this letter: go to first match below activeEl
        const next = letteredAs.find(a => allAs.indexOf(a) > iActiveA)
        iLetter = letteredAs.indexOf(next)
        if (iLetter === -1) iLetter = 0 // fallback to first match
    } else {
        // Repeated key: cycle forward or backward
        if (e.shiftKey) {
            iLetter = (currentIndexInFiltered - 1 + letteredAs.length) % letteredAs.length
        } else {
            iLetter = (currentIndexInFiltered + 1) % letteredAs.length
        }
    }

    letteredAs[iLetter]?.focus()
    lastLetterPressed = letter
})
