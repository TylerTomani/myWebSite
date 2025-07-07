(() => {
    const targets = Array.from(document.querySelectorAll('.whitespace-pre-wrap'));
    const currentIndexMap = {}; // Tracks index per digit (1–9)

    // Initialize current positions
    for (let i = 1; i <= 9; i++) {
        currentIndexMap[i] = i - 1;
    }

    document.addEventListener('keydown', (e) => {
        // Don't run if modifier keys are pressed
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        // Prevent if focus is inside #prompt-textarea
        const inputContainer = document.getElementById('prompt-textarea');
        if (inputContainer && inputContainer.contains(document.activeElement)) {
            return; // Skip handling this key event
        }

        const digit = parseInt(e.key);
        if (!digit || digit < 1 || digit > 9) return;

        const total = targets.length;
        const offset = digit - 1;

        // Navigate based on Shift
        if (e.shiftKey) {
            currentIndexMap[digit] -= 10;
            if (currentIndexMap[digit] < offset) {
                currentIndexMap[digit] = (Math.floor((total - offset - 1) / 10) * 10) + offset;
            }
        } else {
            currentIndexMap[digit] += 10;
            if (currentIndexMap[digit] >= total) {
                currentIndexMap[digit] = offset;
            }
        }

        const idx = currentIndexMap[digit];
        const el = targets[idx];
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.focus({ preventScroll: true });

            el.style.outline = '2px solid orange';
            setTimeout(() => (el.style.outline = ''), 1000);
        }
    });

    // Make all targets focusable
    targets.forEach(t => t.setAttribute('tabindex', '-1'));
})();
