// draft script
(() => {
    let navMode = false;
    let targets = [];
    const currentIndexMap = {};
    for (let i = 1; i <= 9; i++) currentIndexMap[i] = i - 1;

    const getTargets = () =>
        Array.from(document.querySelectorAll('article[data-testid^="conversation-turn-"] .whitespace-pre-wrap')).filter(Boolean);

    function updateTargets() {
        targets = getTargets();
        targets.forEach(t => t.setAttribute('tabindex', '-1'));
        console.log(`[NAV MODE] Updated targets: ${targets.length}`);
    }

    function scrollToTarget(index) {
        const el = targets[index];
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.focus({ preventScroll: true });
            const originalOutline = el.style.outline;
            el.style.outline = '3px solid orange';
            setTimeout(() => (el.style.outline = originalOutline), 1500);
        }
    }

    function scrollToBottom() {
        const chatContainer = document.querySelector('main');
        if (chatContainer) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight,
                behavior: 'smooth',
            });
            showPopup('Scrolled to bottom');
        }
    }

    function toggleNavMode() {
        navMode = !navMode;
        console.log(`[NAV MODE] ${navMode ? 'Activated' : 'Deactivated'}`);
        if (navMode) {
            updateTargets();
            if (targets.length) {
                scrollToTarget(0);
                // Initialize scroll state for that element at center
                scrollStates.set(targets[0], 1);
                showQuestionBanner(1);
            }
            showPopup('Navigation mode ON');
        } else {
            // When nav mode ends, focus back to prompt textarea
            const prompt = document.getElementById('prompt-textarea');
            if (prompt) {
                prompt.focus();
            }
            showPopup('Navigation mode OFF');
        }
    }

    function showPopup(message) {
        let popup = document.getElementById('nav-help-popup');
        if (!popup) {
            popup = document.createElement('div');
            popup.id = 'nav-help-popup';
            popup.style.position = 'fixed';
            popup.style.bottom = '20px';
            popup.style.right = '20px';
            popup.style.padding = '10px 15px';
            popup.style.background = 'rgba(0,0,0,0.8)';
            popup.style.color = 'white';
            popup.style.borderRadius = '6px';
            popup.style.zIndex = 9999;
            popup.style.fontFamily = 'Arial, sans-serif';
            popup.style.fontSize = '14px';
            popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
            document.body.appendChild(popup);
        }
        popup.textContent = message;
        clearTimeout(popup._timeout);
        popup.style.opacity = '1';
        popup._timeout = setTimeout(() => {
            popup.style.opacity = '0';
        }, 2000);
    }

    function togglePopup() {
        let popup = document.getElementById('nav-help-popup-info');
        if (popup) {
            popup.remove();
            return;
        }

        popup = document.createElement('div');
        popup.id = 'nav-help-popup-info';
        popup.style.position = 'fixed';
        popup.style.bottom = '60px';
        popup.style.right = '20px';
        popup.style.padding = '15px 20px';
        popup.style.background = 'rgba(0,0,0,0.9)';
        popup.style.color = 'white';
        popup.style.borderRadius = '8px';
        popup.style.zIndex = 9999;
        popup.style.fontFamily = 'Arial, sans-serif';
        popup.style.fontSize = '14px';
        popup.style.boxShadow = '0 0 15px rgba(0,0,0,0.7)';
        popup.style.maxWidth = '280px';
        popup.style.lineHeight = '1.4';
        popup.style.userSelect = 'text';
        popup.innerHTML = `
        <strong>🔢 Navigation Shortcuts</strong><br><br>
        Press <kbd>1</kbd>–<kbd>9</kbd>: Jump to every 10th .whitespace-pre-wrap<br>
        Press <kbd>Shift + 1</kbd>–<kbd>Shift + 9</kbd>: Jump backward<br>
        Press <kbd>?</kbd>: Toggle this help popup<br>
        Press <kbd>Cmd/Ctrl + Shift + P</kbd>: Toggle Navigation Mode<br>
        Press <kbd>E</kbd>: Scroll to bottom (when nav mode is ON)<br>
        Press <kbd>Enter</kbd>: Cycle scroll position on focused question
      `;
        document.body.appendChild(popup);
    }

    // Scroll cycle positions for Enter key: start → center → end
    const scrollCycleOrder = ['start', 'center', 'end'];
    const scrollStates = new WeakMap();

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        // Toggle navMode with Cmd/Ctrl + Shift + P
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && key === 'p') {
            e.preventDefault();
            toggleNavMode();
            return;
        }

        // Toggle help popup with '?'
        if (key === '?') {
            e.preventDefault();
            togglePopup();
            return;
        }

        if (!navMode) {
            // navMode off, allow all keys normal behavior including numbers
            return;
        }

        // Allow Tab to behave normally — don't block it
        if (key === 'tab') {
            return;
        }

        // Scroll to bottom on 'e'
        if (key === 'e') {
            e.preventDefault();
            scrollToBottom();
            return;
        }

        // Number keys for navigation ONLY if navMode is true
        const digit = parseInt(e.key);
        if (digit >= 1 && digit <= 9) {
            e.preventDefault();
            e.stopPropagation();

            if (!targets.length) updateTargets();

            const offset = digit - 1;
            const total = targets.length;

            if (e.shiftKey) {
                currentIndexMap[digit] -= 10;
                if (currentIndexMap[digit] < offset) {
                    currentIndexMap[digit] = Math.floor((total - offset - 1) / 10) * 10 + offset;
                }
            } else {
                currentIndexMap[digit] += 10;
                if (currentIndexMap[digit] >= total) {
                    currentIndexMap[digit] = offset;
                }
            }

            scrollToTarget(currentIndexMap[digit]);
            scrollStates.set(targets[currentIndexMap[digit]], 1); // start at center on jump
            showPopup(`Jumped to question #${currentIndexMap[digit] + 1}`);
            showQuestionBanner(currentIndexMap[digit] + 1);

            return;
        }

        // Handle Enter key for scroll cycling on focused question
        if (key === 'enter') {
            const active = document.activeElement;
            if (targets.includes(active)) {
                e.preventDefault();
                e.stopPropagation();

                const currentState = scrollStates.get(active) ?? 0;
                const nextState = (currentState + 1) % scrollCycleOrder.length;
                scrollStates.set(active, nextState);

                active.scrollIntoView({ behavior: 'smooth', block: scrollCycleOrder[nextState] });
            }
        }

        // Prevent typing letters inside whitespace-pre-wrap elements in nav mode
        if (/^[a-z0-9]$/i.test(key)) {
            const active = document.activeElement;
            if (active && active.classList.contains('whitespace-pre-wrap')) {
                e.preventDefault();
            }
        }
    }, true);

    // Question number banner setup
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
    function showQuestionBanner(number) {
        questionBanner.textContent = `Question #${number}`;
        questionBanner.style.opacity = 1;

        if (questionBannerTimeout) clearTimeout(questionBannerTimeout);
        questionBannerTimeout = setTimeout(() => {
            questionBanner.style.opacity = 0;
        }, 2000);
    }

    // Automatically re-update targets if chat changes
    const observer = new MutationObserver((mutations) => {
        const hasNewTurns = mutations.some(m =>
            Array.from(m.addedNodes).some(n =>
                n.nodeType === 1 && n.querySelector?.('.whitespace-pre-wrap')
            )
        );
        if (hasNewTurns) {
            updateTargets();
        }
    });

    const chatContainer = document.querySelector('main');
    if (chatContainer) {
        observer.observe(chatContainer, { childList: true, subtree: true });
        updateTargets(); // Initial run
    } else {
        console.warn("Could not find chat container to observe.");
    }
})();
