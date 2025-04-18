export function letterFocus() {
    let letteredEls = [];
    let iLetter = 0;
    let currentLetter = '';

    addEventListener('keydown', (e) => {
        const isCopyCodeFocused = e.target.classList.contains('copy-code');
        const letter = e.key.toLowerCase();

        // Special case: allow Cmd+C for copying inside .copy-code elements
        if (isCopyCodeFocused && e.metaKey && letter === 'c') {
            // Let the browser handle copy natively
            return;
        }
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'c') {
            return; // don't move focus, don't trigger letterFocus or anything else
        }

        // Special case: scroll to top if 'm' is pressed while mainTargetDiv is focused
        if (letter === 'm' && e.target.id === 'mainTargetDiv') {
            scrollTo(0, 0);
            return;
        }

        // Skip handling if meta key is held (except for Cmd+C above)
        if (e.metaKey) {
            e.preventDefault();
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
    });
}

letterFocus();
