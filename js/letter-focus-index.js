const allAs = Array.from(document.querySelectorAll('a'))
let lastLetterPressed = ''
let iLetter = 0

addEventListener('keydown', (e) => {
    const key = e.key
    if (key.length > 1 || !/[a-zA-Z]/.test(key)) return // Ignore non - letter keys

    const letter = key.toLowerCase()
    const activeEl = document.activeElement
    const iActiveA = allAs.indexOf(activeEl)

    const letteredAs = allAs.filter(a => a.innerText.trim()[0]?.toLowerCase() ===
        letter)
    if (!letteredAs.length) return

    const currentIndexInFiltered = letteredAs.indexOf(activeEl)

    if (letter !== lastLetterPressed) {
        // New letter key pressed
        if (e.shiftKey) {
            // Go up the page from current position
            const previous = [...letteredAs].reverse().find(a => allAs.indexOf(a) < iActiveA) iLetter = letteredAs.indexOf(previous)
            if (iLetter === -1) iLetter = letteredAs.length - 1 // fallback to last match } else { // Go down the page from current
        position const next = letteredAs.find(a => allAs.indexOf(a) > iActiveA)
            iLetter = letteredAs.indexOf(next)
            if (iLetter === -1) iLetter = 0 // fallback to first match
        }
    } else {
        // Same letter key pressed again
        if (e.shiftKey) {
            iLetter = (currentIndexInFiltered - 1 + letteredAs.length) % letteredAs.length
        } else {
            iLetter = (currentIndexInFiltered + 1) % letteredAs.length
        }
    }

    letteredAs[iLetter]?.focus()
    lastLetterPressed = letter
})