const allLinks = Array.from(document.querySelectorAll('a'));
let lastLetter = '';
let indexInMatches = 0;

// Helper: returns true if the element or one of its parents is hidden via CSS or not `.show`
function isVisible(el) {
    return el.offsetParent !== null;
}

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key.length !== 1 || !/[a-zA-Z]/.test(key)) return;

    const letter = key.toLowerCase();

    // Filter visible links with matching first letter
    const matchingLinks = allLinks.filter(link => {
        const text = link.innerText.trim();
        return text[0]?.toLowerCase() === letter && isVisible(link);
    });

    if (matchingLinks.length === 0) return;

    // New letter? Start fresh
    if (letter !== lastLetter || document.activeElement.tagName !== 'A') {
        indexInMatches = e.shiftKey ? matchingLinks.length - 1 : 0;
    } else {
        // Cycle through
        indexInMatches = (indexInMatches + (e.shiftKey ? -1 : 1) + matchingLinks.length) % matchingLinks.length;
    }

    matchingLinks[indexInMatches]?.focus();
    lastLetter = letter;
});
