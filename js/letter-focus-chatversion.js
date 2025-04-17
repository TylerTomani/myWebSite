document.addEventListener('DOMContentLoaded', () => {
    const allLinks = Array.from(document.querySelectorAll('a')); // Get all <a> elements
    let lastFocusedIndex = {}; // Track the last focused index for each letter

    // Initialize the lastFocusedIndex object with letters
    allLinks.forEach(link => {
        const text = link.textContent.trim().toLowerCase();
        if (text) {
            const firstLetter = text[0];
            if (!lastFocusedIndex[firstLetter]) {
                lastFocusedIndex[firstLetter] = -1;
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        const pressedKey = e.key.toLowerCase(); // Get the pressed key
        const isShiftPressed = e.shiftKey; // Check if Shift is pressed

        const matchingLinks = allLinks.filter(link =>
            link.textContent.trim().toLowerCase().startsWith(pressedKey)
        );

        if (matchingLinks.length > 0) {
            if (isShiftPressed) {
                // Move in the reverse direction
                lastFocusedIndex[pressedKey] =
                    (lastFocusedIndex[pressedKey] - 1 + matchingLinks.length) % matchingLinks.length;
            } else {
                // Move in the forward direction
                lastFocusedIndex[pressedKey] =
                    (lastFocusedIndex[pressedKey] + 1) % matchingLinks.length;
            }

            const nextLink = matchingLinks[lastFocusedIndex[pressedKey]];
            nextLink.focus();
            nextLink.scrollIntoView({ behavior: 'auto', inline: "start" });
        }
    });
});
