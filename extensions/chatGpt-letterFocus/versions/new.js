// New
(() => {
    let scrollCycleOrder = ['start', 'center', 'end'];
    let navMode = false;
    let targets = [];
    let oddTargets = [];
    let lastKeyPressed = null;
    let currentOffset = 0;
    let lastFocusedTarget = null;

    const scrollStates = new WeakMap();

    const getTargets = () =>
        Array.from(document.querySelectorAll('article[data-testid^="conversation-turn-"] .whitespace-pre-wrap')).filter(Boolean);

    const getOddTargets = () => {
        return getTargets().filter(t => {
            const article = t.closest('article');
            if (!article) return false;
            const id = article.dataset.testid?.match(/\d+/)?.[0];
            return id && parseInt(id) % 2 === 1;
        });
    };

    function updateTargets() {
        targets = getTargets();
        oddTargets = getOddTargets();
        targets.forEach(t => t.setAttribute('tabindex', '-1'));
    }

    function toggleNavMode() {
        navMode = !navMode;
        console.log(`[NAV MODE] ${navMode ? 'Activated' : 'Deactivated'}`);
        if (navMode) {
            updateTargets();
            if (targets.length) {
                const lastIndex = targets.length - 1;
                scrollToTarget(targets, lastIndex);
                scrollStates.set(targets[lastIndex], 1);
                currentOffset = Math.floor(lastIndex / 10) * 10;
                showQuestionBanner(lastIndex + 1);
            }
            showPopup('Navigation mode ON');
        } else {
            showPopup('Navigation mode OFF');
        }
    }

    function showPopup(message) {
        let popup = document.getElementById('nav-help-popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'nav-help-popup';
            Object.assign(popup.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                padding: '10px 15px',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                borderRadius: '6px',
                zIndex: 9999,
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                opacity: '1',
                transition: 'opacity 0.2s ease'
            });
            document.body.appendChild(popup);
        }
        popup.textContent = message;
        clearTimeout(popup._timeout);
        popup.style.opacity = '1';
        popup._timeout = setTimeout(() => popup.style.opacity = '0', 2000);
    }

    const questionBanner = document.createElement('div');
    Object.assign(questionBanner.style, {
        position: 'fixed',
        top: '40px',
        right: '10px',
        background: '#444',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '6px',
        fontSize: '13px',
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.2s ease',
        pointerEvents: 'none'
    });
    document.body.appendChild(questionBanner);

    function showQuestionBanner(number) {
        questionBanner.textContent = `Question #${number}`;
        questionBanner.style.opacity = 1;
        setTimeout(() => questionBanner.style.opacity = 0, 1500);
    }

    const observer = new MutationObserver(mutations => {
        if (mutations.some(m => Array.from(m.addedNodes).some(n => n.nodeType === 1 && n.querySelector?.('.whitespace-pre-wrap')))) {
            updateTargets();
        }
    });

    const chatContainer = document.querySelector('main');
    if (chatContainer) {
        observer.observe(chatContainer, { childList: true, subtree: true });
        updateTargets();
    }

    const prompt = document.getElementById('prompt-textarea');
    function isPromptActive(target) {
        return prompt && prompt.contains(target);
    }

    // Disable nav mode on prompt activity
    ['focusin', 'keydown', 'input', 'click'].forEach(evt => {
        document.addEventListener(evt, (e) => {
            if (isPromptActive(e.target)) {
                if (navMode) {
                    navMode = false;
                    showPopup('Navigation mode OFF (prompt activity)');
                    console.log('[NAV MODE] Deactivated from prompt interaction');
                }
            }
        }, true);
    });

    function scrollToTarget(arr, index) {
        const el = arr[index];
        if (!el) return;

        const parent = el.closest('div.relative');
        el.style.border = 'none';
        el.style.outline = 'none';

        if (parent) {
            parent.style.outline = '3px solid #00ffff';
            parent.style.outlineOffset = '2px';
            setTimeout(() => parent.style.outline = '', 1500);
        }

        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        // Toggle nav mode
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === 'x') {
            e.preventDefault();
            toggleNavMode();
            return;
        }

        if (!navMode) return;

        // Number key navigation
        const digitMatch = e.code.match(/^Digit([0-9])$/);
        if (digitMatch) {
            e.preventDefault();
            if (!targets.length) updateTargets();
            const total = targets.length;
            const digit = parseInt(digitMatch[1]);
            const positionInRange = digit === 0 ? 9 : digit - 1;

            if (e.shiftKey) {
                if (lastKeyPressed === digit) {
                    currentOffset -= 10;
                    if (currentOffset < 0) {
                        const maxOffset = Math.floor((total - 1 - positionInRange) / 10) * 10;
                        currentOffset = Math.max(0, maxOffset);
                    }
                } else {
                    const activeIndex = targets.indexOf(document.activeElement);
                    if (activeIndex !== -1 && activeIndex % 10 === positionInRange) {
                        currentOffset = Math.floor(activeIndex / 10) * 10;
                    } else {
                        currentOffset = Math.floor((targets.length - 1) / 10) * 10;
                    }
                }
                lastKeyPressed = digit;
            } else if (lastKeyPressed === digit) {
                currentOffset += 10;
                if (currentOffset + positionInRange >= total) {
                    currentOffset = 0;
                }
            } else {
                lastKeyPressed = digit;
            }

            let finalIndex = currentOffset + positionInRange;
            if (finalIndex >= total) finalIndex = total - 1;

            const target = targets[finalIndex];
            if (!target) return;

            scrollToTarget(targets, finalIndex);
            scrollStates.set(target, 0);
            lastFocusedTarget = target;
            showPopup(`Jumped to question #${finalIndex + 1}`);
            showQuestionBanner(finalIndex + 1);
            return;
        }

        // Odd navigation with f/d
        if (key === 'f' || key === 'd') {
            e.preventDefault();
            if (!oddTargets.length) updateTargets();

            const dir = key === 'f' ? 1 : -1;
            const step = e.shiftKey ? 10 : 1;
            const currentIndex = oddTargets.indexOf(document.activeElement);
            let nextIndex = currentIndex + dir * step;

            if (nextIndex < 0) nextIndex = 0;
            if (nextIndex >= oddTargets.length) nextIndex = oddTargets.length - 1;

            scrollToTarget(oddTargets, nextIndex);
            showPopup(`Odd question #${nextIndex + 1}`);
            return;
        }
    }, true);
})();
