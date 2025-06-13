document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    const allIds = [...document.querySelectorAll('[id]')].filter(id => {
        const rect = id.getBoundingClientRect();
        return id.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    const letteredIds = allIds.filter(a => {
        const text = a.id.toLowerCase();
        return text.startsWith(key);
        
    });

    if (letteredIds.length === 0) return;

    const active = document.activeElement;
    const iActiveId = [...allIds].indexOf(active);
    const currentIndexInFiltered = letteredIds.indexOf(active);

    if (key !== window.lastLetterPressed) {
        // New letter pressed
        console.log(e.target)
        let iLetter;
        if (e.shiftKey) {
            // Shift + new letter = move UP from current position
            const prev = [...letteredIds].reverse().find(a => allIds.indexOf(a) < iActiveId);
            console.log(a.id)
            iLetter = letteredIds.indexOf(prev);
            if (iLetter === -1) iLetter = letteredIds.length - 1;
        } else {
            // New letter = move DOWN from current position
            const next = letteredIds.find(a => allIds.indexOf(a) > iActiveId);
            iLetter = letteredIds.indexOf(next);
            if (iLetter === -1) iLetter = 0;
        }

        letteredIds[iLetter]?.focus();
    } else {
        // Same letter as last key press
        let iLetter;
        if (e.shiftKey) {
            iLetter = (currentIndexInFiltered - 1 + letteredIds.length) % letteredIds.length;
        } else {
            iLetter = (currentIndexInFiltered + 1) % letteredIds.length;
        } 
        letteredIds[iLetter]?.focus();
    }

    window.lastLetterPressed = key;
});
