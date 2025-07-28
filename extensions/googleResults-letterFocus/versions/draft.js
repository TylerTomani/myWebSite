// draft
document.addEventListener('keydown', function (e) {
    // Don't trigger inside input or textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const key = e.key.toLowerCase();

    // Only continue if it's a single a-z or 0-9 key
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    // Get all visible <a> elements
    const allLinks = [...document.querySelectorAll('a')].filter(link => {
        const rect = link.getBoundingClientRect();
        return link.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    // Filter those that start with the key
    const matchingLinks = allLinks.filter(link =>
        link.textContent.trim().toLowerCase().startsWith(key)
    );

    if (matchingLinks.length === 0) return;

    const activeElement = document.activeElement;
    const activeIndexAll = allLinks.indexOf(activeElement);
    const activeIndexMatch = matchingLinks.indexOf(activeElement);

    let newIndex;

    if (key !== window.lastLetterPressed) {
        // New key pressed
        if (e.shiftKey) {
            // Go UP to previous matching link
            const prev = [...matchingLinks].reverse().find(link => allLinks.indexOf(link) < activeIndexAll);
            newIndex = matchingLinks.indexOf(prev);
            if (newIndex === -1) newIndex = matchingLinks.length - 1;
        } else {
            // Go DOWN to next matching link
            const next = matchingLinks.find(link => allLinks.indexOf(link) > activeIndexAll);
            newIndex = matchingLinks.indexOf(next);
            if (newIndex === -1) newIndex = 0;
        }
    } else {
        // Same key pressed again
        if (e.shiftKey) {
            newIndex = (activeIndexMatch - 1 + matchingLinks.length) % matchingLinks.length;
        } else {
            newIndex = (activeIndexMatch + 1) % matchingLinks.length;
        }
    }

    matchingLinks[newIndex]?.focus();
    window.lastLetterPressed = key;
});
