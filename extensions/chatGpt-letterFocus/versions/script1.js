// working
(() => {
    const targets = Array.from(document.querySelectorAll('.whitespace-pre-wrap'));
    const currentIndexMap = {};
    let navMode = false; // false = normal typing, true = navigation mode

    for (let i = 1; i <= 9; i++) {
        currentIndexMap[i] = i - 1;
    }

    const inputContainer = document.getElementById('prompt-textarea');
    // ====== NAV MODE BANNER ======
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '10px';
    banner.style.right = '10px';
    banner.style.background = '#222';
    banner.style.color = '#fff';
    banner.style.padding = '6px 12px';
    banner.style.borderRadius = '6px';
    banner.style.fontSize = '14px';
    banner.style.zIndex = 9999;
    banner.style.opacity = 0;
    banner.style.transition = 'opacity 0.3s ease';
    banner.style.pointerEvents = 'none';
    document.body.appendChild(banner);

    function showBanner(text) {
        banner.textContent = text;
        banner.style.opacity = 1;
        setTimeout(() => banner.style.opacity = 0, 1200);
    }

    // ====== POPUP NUMBER LABEL ======
    function showLabel(el, labelText) {
        const rect = el.getBoundingClientRect();
        const label = document.createElement('div');

        label.textContent = `#${labelText}`;
        label.style.position = 'fixed';
        label.style.left = `${rect.left - 50}px`; // Adjust left if needed
        label.style.top = `${rect.top}px`;
        label.style.background = 'orange';
        label.style.color = 'white';
        label.style.padding = '4px 8px';
        label.style.borderRadius = '6px';
        label.style.fontSize = '13px';
        label.style.fontWeight = 'bold';
        label.style.zIndex = 10000;
        label.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
        label.style.opacity = 1;
        label.style.transition = 'opacity 0.4s ease';

        document.body.appendChild(label);

        setTimeout(() => {
            label.style.opacity = 0;
            setTimeout(() => label.remove(), 400);
        }, 1000);
    }

    document.addEventListener('keydown', (e) => {
        // Toggle nav mode: Command + Shift + P
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
            e.preventDefault();
            e.stopImmediatePropagation();

            navMode = !navMode;
            showBanner(navMode ? 'NAV MODE ON' : 'NAV MODE OFF');
            console.log(`[NAV MODE] ${navMode ? 'Enabled' : 'Disabled'}`);

            if (!navMode && inputContainer) {
                inputContainer.focus();

                // Optional: move caret to end
                const range = document.createRange();
                const sel = window.getSelection();
                const lastChild = inputContainer.lastChild;
                if (lastChild) {
                    range.selectNodeContents(lastChild);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }

            return;
        }

        // ✅ Only run this block if nav mode is ON
        if (navMode) {
            const digit = parseInt(e.key);
            if (!digit || digit < 1 || digit > 9) return;

            // Prevent default typing and stealing focus
            e.preventDefault();
            e.stopImmediatePropagation();

            const total = targets.length;
            const offset = digit - 1;

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
                setTimeout(() => {
                    showLabel(el, idx + 1);
                }, 150);
            }
        }
    }, true); // useCapture = true

    // Make all targets focusable
    targets.forEach(t => t.setAttribute('tabindex', '-1'));
})();

