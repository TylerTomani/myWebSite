(() => {
    // Select all conversation turn articles containing questions and answers
    const turns = Array.from(document.querySelectorAll('article[data-testid^="conversation-turn-"]'));

    // Within each turn, find the main question text container with class .whitespace-pre-wrap
    // This will be our "target" for navigation
    const targets = turns.map(turn => turn.querySelector('.whitespace-pre-wrap')).filter(Boolean);

    // Map to keep track of current index per number key 1-9 for cycling through targets
    const currentIndexMap = {};
    for (let i = 1; i <= 9; i++) {
        currentIndexMap[i] = i - 1;
    }

    // Make all targets focusable for keyboard focus
    targets.forEach(t => t.setAttribute('tabindex', '-1'));

    document.addEventListener('keydown', (e) => {
        // Parse the pressed key as a digit 1-9
        const digit = parseInt(e.key);
        if (!digit || digit < 1 || digit > 9) return;

        e.preventDefault();
        e.stopPropagation();

        const total = targets.length;
        const offset = digit - 1;

        if (e.shiftKey) {
            // Move backward by 10 steps in the list for that digit
            currentIndexMap[digit] -= 10;
            if (currentIndexMap[digit] < offset) {
                currentIndexMap[digit] = Math.floor((total - offset - 1) / 10) * 10 + offset;
            }
        } else {
            // Move forward by 10 steps in the list for that digit
            currentIndexMap[digit] += 10;
            if (currentIndexMap[digit] >= total) {
                currentIndexMap[digit] = offset;
            }
        }

        const idx = currentIndexMap[digit];
        const el = targets[idx];
        if (el) {
            // Scroll smoothly to the target question text container
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Focus it for accessibility
            el.focus({ preventScroll: true });

            // Briefly highlight the target for visual feedback
            const originalOutline = el.style.outline;
            el.style.outline = '3px solid orange';
            setTimeout(() => (el.style.outline = originalOutline), 1500);
        }
    }, true); // capture phase

    console.log(`[NAV MODE] Navigation on ${targets.length} question blocks ready.`);
})();
  