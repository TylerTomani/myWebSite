export function letterFocus() {
    let letteredEls = [];
    let iLetter = 0;
    let currentLetter = '';
    let cmdCEl 
    
    addEventListener('keydown', (e) => {
        const isCopyCodeFocused = e.target.classList.contains('copy-code');
        const letter = e.key.toLowerCase();
        if ((e.metaKey || e.ctrlKey) && letter === 'c') {
            
            return; // don't move focus, don't trigger letterFocus or anything else
        }

        // Special case: scroll to top if 'm' is pressed while mainTargetDiv is focused
        if (letter === 'm' && e.target.id === 'mainTargetDiv') {
            scrollTo(0, 0);
            return;
        }


        // Build the list of elements with ids starting with the pressed letter
        const allFocusEls = document.querySelectorAll('[id]');
        letteredEls = Array.from(allFocusEls).filter(el => el.id[0].toLowerCase() === letter);

        if (letteredEls.length === 0) return;

        // If a new letter is pressed, reset index
        if (letter !== currentLetter) {
            iLetter = 0;
        } else {
            iLetter = e.shiftKey
                ? (iLetter - 1 + letteredEls.length) % letteredEls.length // Move back
                : (iLetter + 1) % letteredEls.length; // Move forward
        }

        // Focus the target element
        letteredEls[iLetter].focus();

        currentLetter = letter;
        if (cmdCEl != null) {
            cmdCEl.focus()
        }
    });
}

// letterFocus();
