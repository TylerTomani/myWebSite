(() => {
    const targets = Array.from(document.querySelectorAll('.whitespace-pre-wrap'));
    const currentIndexMap = {};
    let navMode = false;
    const scrollStates = new WeakMap(); // to track current scroll state of each element

    for (let i = 1; i <= 9; i++) {
        currentIndexMap[i] = i - 1;
    }

    const inputContainer = document.getElementById('prompt-textarea');

    // ====== NAV MODE BANNER ======
    const navBanner = document.createElement('div');
    navBanner.style.position = 'fixed';
    navBanner.style.top = '10px';
    navBanner.style.right = '10px';
    navBanner.style.background = '#333';
    navBanner.style.color = 'white';
    navBanner.style.padding = '6px 12px';
    navBanner.style.borderRadius = '6px';
    navBanner.style.fontSize = '14px';
    navBanner.style.zIndex = 9999;
    navBanner.style.opacity = 0;
    navBanner.style.transition = 'opacity 0.3s ease';
    navBanner.style.pointerEvents = 'none';
    document.body.appendChild(navBanner);

    function showNavBanner(text) {
        navBanner.textContent = text;
        navBanner.style.opacity = 1;
        setTimeout(() => {
            navBanner.style.opacity = 0;
        }, 1200);
    }

    // ====== QUESTION NUMBER BANNER ======
    const questionBanner = document.createElement('div');
    questionBanner.style.position = 'fixed';
    questionBanner.style.top = '40px';
    questionBanner.style.right = '10px';
    questionBanner.style.background = '#444';
    questionBanner.style.color = 'white';
    questionBanner.style.padding = '5px 10px';
    questionBanner.style.borderRadius = '6px';
    questionBanner.style.fontSize = '13px';
    questionBanner.style.zIndex = 9999;
    questionBanner.style.opacity = 0;
    questionBanner.style.transition = 'opacity 0.2s ease';
    questionBanner.style.pointerEvents = 'none';
    document.body.appendChild(questionBanner);

    let questionBannerTimeout;
    function showQuestionBanner(text) {
        questionBanner.textContent = `Question #${text}`;
        questionBanner.style.opacity = 1;

        if (questionBannerTimeout) clearTimeout(questionBannerTimeout);
        questionBannerTimeout = setTimeout(() => {
            questionBanner.style.opacity = 0;
        }, 2000);
    }

    // Allow scroll cycling via Enter
    const scrollCycleOrder = ['start', 'center', 'end'];

    document.addEventListener('keydown', (e) => {
        if (navMode) {
            const allowedKeys = [
                'Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9',
                'Enter','Tab'
            ];
            const keyIsAllowed = allowedKeys.includes(e.code);

            const isToggle = (e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'p';

            if (!keyIsAllowed && !isToggle) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        }
    }, true);

    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
            e.preventDefault();
            e.stopImmediatePropagation();

            navMode = !navMode;
            showNavBanner(navMode ? 'NAV MODE ON' : 'NAV MODE OFF');

            if (!navMode && inputContainer) {
                inputContainer.focus();
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

        if (!navMode) return;

        const digit = parseInt(e.key);
        if (digit >= 1 && digit <= 9) {
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

                scrollStates.set(el, 1); // Start at center (1)

                el.style.outline = '2px solid orange';
                setTimeout(() => (el.style.outline = ''), 1000);

                showQuestionBanner(idx + 1);
            }

            return;
        }

        if (e.key === 'Enter') {
            const active = document.activeElement;
            if (targets.includes(active)) {
                e.preventDefault();
                e.stopImmediatePropagation();

                const index = scrollStates.get(active) ?? 0;
                const nextIndex = (index + 1) % scrollCycleOrder.length;
                scrollStates.set(active, nextIndex);

                active.scrollIntoView({ behavior: 'smooth', block: scrollCycleOrder[nextIndex] });
            }
        }

    }, true);

    targets.forEach(t => t.setAttribute('tabindex', '-1'));
})();


