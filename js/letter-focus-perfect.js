export function letterFocus(){
    document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    const allEls = [...document.querySelectorAll('a')].filter(a => {
        const rect = a.getBoundingClientRect();
        return a.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    const letteredELs = allEls.filter(a => {
        const text = a.textContent.trim().toLowerCase();
        console.log(a)
        return text.startsWith(key);
    });

    if (letteredELs.length === 0) return;

    const active = document.activeElement;
    const iActiveA = [...allEls].indexOf(active);
    const currentIndexInFiltered = letteredELs.indexOf(active);

    if (key !== window.lastLetterPressed) {
        // New letter pressed
        let iLetter;
        if (e.shiftKey) {
            // Shift + new letter = move UP from current position
            const prev = [...letteredELs].reverse().find(a => allEls.indexOf(a) < iActiveA);
            iLetter = letteredELs.indexOf(prev);
            if (iLetter === -1) iLetter = letteredELs.length - 1;
        } else {
            // New letter = move DOWN from current position
            const next = letteredELs.find(a => allEls.indexOf(a) > iActiveA);
            iLetter = letteredELs.indexOf(next);
            if (iLetter === -1) iLetter = 0;
        }

        letteredELs[iLetter]?.focus();
    } else {
        // Same letter as last key press
        let iLetter;
        if (e.shiftKey) {
            iLetter = (currentIndexInFiltered - 1 + letteredELs.length) % letteredELs.length;
        } else {
            iLetter = (currentIndexInFiltered + 1) % letteredELs.length;
        }
        letteredELs[iLetter]?.focus();
    }

    window.lastLetterPressed = key;
});

}