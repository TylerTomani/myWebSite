
js(() => {
        'use strict';

        function escapeHTML(str) {
            return str.replace(/[&<>"']/g, (m) => {
            switch (m) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#39;';
                default: return m;
            }
            });
        }

        function cleanNode(node) {
            node.querySelectorAll('svg, path, button, style, script, img, video, audio').forEach(el => el.remove());
            node.querySelectorAll('*').forEach(el => {
            [...el.attributes].forEach(attr => {
                if (attr.name !== 'tabindex') el.removeAttribute(attr.name);
            });
            });
        }

        function removeDataAttributes(node) {
            node.querySelectorAll('*').forEach(el => {
            [...el.attributes].forEach(attr => {
                if (attr.name.startsWith('data-')) el.removeAttribute(attr.name);
            });
            });
        }

        // Remove empty elements recursively
        function removeEmptyElements(node) {
            const children = Array.from(node.children);
            for (const child of children) {
            removeEmptyElements(child);
            if (
                !child.textContent.trim() &&
                child.children.length === 0
            ) {
                child.remove();
            }
            }
        }

        function transformPreBlocks(container) {
            const preBlocks = Array.from(container.querySelectorAll('pre'));
            preBlocks.forEach(pre => {
            if (pre.classList.contains('drop-question')) return; // skip question blocks

            const codeText = pre.textContent.trim();

            const codeContainer = document.createElement('div');
            codeContainer.className = 'code-container';

            const newPre = document.createElement('pre');
            newPre.className = 'copy-code';
            newPre.setAttribute('tabindex', '0');
            newPre.textContent = codeText;

            codeContainer.appendChild(newPre);
            pre.replaceWith(codeContainer);
            });
        }

        function extractQuestionText(questionEl) {
            const pre = questionEl.querySelector('pre.drop-question');
            if (pre) return pre.innerText.trim();
            return questionEl.innerText.trim();
        }

        function removeYouSaid(text) {
            return text.replace(/^You said:\s*/i, '').trim();
        }

        function unwrapDivsExceptCodeContainer(node) {
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT, null, false);
            let currentNode = walker.nextNode();
            while (currentNode) {
            const nextNode = walker.nextNode();

            if (
                currentNode.tagName === 'DIV' &&
                !currentNode.classList.contains('code-container')
            ) {
                while (currentNode.firstChild) {
                currentNode.parentNode.insertBefore(currentNode.firstChild, currentNode);
                }
                currentNode.parentNode.removeChild(currentNode);
            }

            currentNode = nextNode;
            }
        }

        function extractAnswerHTML(answerEl) {
            const textBase = answerEl.querySelector('div.text-base');
            if (!textBase) return '';

            const clone = textBase.cloneNode(true);

            cleanNode(clone);
            removeDataAttributes(clone);
            transformPreBlocks(clone);
            removeEmptyElements(clone);

            unwrapDivsExceptCodeContainer(clone);

            return clone.innerHTML.trim();
        }

        function highlight(el) {
            const oldBg = el.style.backgroundColor;
            el.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
            setTimeout(() => {
            el.style.backgroundColor = oldBg;
            }, 2000);
        }

        document.addEventListener('click', e => {
            const turnArticle = e.target.closest('article[data-testid^="conversation-turn-"]');
            if (!turnArticle) return;

            const testid = turnArticle.getAttribute('data-testid');
            const match = testid.match(/conversation-turn-(\d+)/);
            if (!match) return;

            const turnNum = parseInt(match[1], 10);

            if (turnNum % 2 === 0) {
            if (e.target.closest('pre.copy-code')) return;
            }

            let questionEl, answerEl;
            if (turnNum % 2 === 1) {
            questionEl = turnArticle;
            answerEl = document.querySelector(`article[data-testid="conversation-turn-${turnNum + 1}"]`);
            } else {
            answerEl = turnArticle;
            questionEl = document.querySelector(`article[data-testid="conversation-turn-${turnNum - 1}"]`);
            }

            if (!questionEl || !answerEl) {
            alert('⚠️ Could not find matching Q/A pair.');
            return;
            }

            highlight(questionEl);
            highlight(answerEl);

            let questionText = extractQuestionText(questionEl);
            questionText = removeYouSaid(questionText);

            let id = questionText
            .toLowerCase()
            .replace(/^you said:\s*/i, '') // extra safety
            .replace(/[^a-z0-9 ]+/g, '')
            .split(' ')
            .filter(Boolean)
            .map((word, i) => i === 0 ? word : word[0].toUpperCase() + word.slice(1))
            .join('');
            if (id.length > 16) id = id.slice(0, 16);

            const answerHTML = extractAnswerHTML(answerEl);

            const finalHTML = `
        <div class="topic">
        <a id="${id}" tabindex="0" href="#" class="drop-topic">${escapeHTML(questionText)}</a>
        <div class="questions-container">
            <div class="question-container">
            <div class="answer question-answer">
                <article class="text-token-text-primary question-txt">
                <h6 class="sr-only">Fix for Enter key with nested elements inside anchor</h6>
                <div class="text-base">
                    <div class="whitespace-pre-wrap">
                    <pre tabindex="0" class="copy-code drop-question">${escapeHTML(questionText)}</pre>
                    </div>
                </div>
                </article>
                <article class="text-token-text-primary answer-txt">
                <h6 class="sr-only">Chat Gpt Said: </h6>
                <div class="text-base">
                    <div class="markdown prose">
                    ${answerHTML}
                    </div>
                </div>
                </article>
            </div>
            </div>
        </div>
        </div>`.trim();

            navigator.clipboard.writeText(finalHTML).then(() => {
            alert('✅ Clean Q&A copied to clipboard!');
            }).catch(err => {
            alert('❌ Clipboard error: ' + err);
            });
        });
        })();