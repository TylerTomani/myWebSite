(() => {
  'use strict';

  // Escape HTML special chars
  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, function (m) {
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

  // Remove unwanted tags and attributes recursively
  function cleanNode(node) {
    // Remove certain tags completely
    node.querySelectorAll('svg, path, button, style, script, img, video, audio').forEach(el => el.remove());
    // Remove all attributes except tabindex
    node.querySelectorAll('*').forEach(el => {
      [...el.attributes].forEach(attr => {
        if (attr.name !== 'tabindex') {
          el.removeAttribute(attr.name);
        }
      });
    });
  }

  // Remove all data-* attributes recursively
  function removeDataAttributes(node) {
    node.querySelectorAll('*').forEach(el => {
      [...el.attributes].forEach(attr => {
        if (attr.name.startsWith('data-')) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }

  // Transform <pre> blocks in answers with class overflow-visible or whitespace-pre-wrap into
  // <div class="code-container"><pre class="copy-code" tabindex="0">text content</pre></div>
  function transformPreBlocks(container) {
    // Select all <pre> elements that have class overflow-visible or whitespace-pre-wrap
    const preBlocks = Array.from(container.querySelectorAll('pre')).filter(pre =>
      pre.classList.contains('overflow-visible') || pre.classList.contains('whitespace-pre-wrap')
    );

    preBlocks.forEach(pre => {
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

  // Extract question text, preferring the <pre> inside question article
  function extractQuestionText(questionEl) {
    const pre = questionEl.querySelector('pre');
    if (pre) return pre.innerText.trim();
    return questionEl.innerText.trim();
  }

  // Extract clean answer HTML
  function extractAnswerHTML(answerEl) {
    const textBase = answerEl.querySelector('div.text-base');
    if (!textBase) return '';

    const clone = textBase.cloneNode(true);

    cleanNode(clone);
    removeDataAttributes(clone);
    transformPreBlocks(clone);

    return clone.innerHTML.trim();
  }

  // Highlight an element briefly
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

    // Ignore clicks inside code blocks in even-numbered articles (answers)
    if (turnNum % 2 === 0) {
      if (e.target.closest('pre.copy-code')) {
        return; // Ignore clicks inside code block on answer side
      }
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

    const questionText = extractQuestionText(questionEl);
    const answerHTML = extractAnswerHTML(answerEl);

    // Create a safe ID by camel casing question text (simple)
    const id = questionText
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, '')
      .split(' ')
      .filter(Boolean)
      .map((word, i) => i === 0 ? word : word[0].toUpperCase() + word.slice(1))
      .join('');

    const finalHTML = `
<div class="topic">
  <a id="${id}" tabindex="0" href="#" class="drop-topic">${escapeHTML(questionText)}</a>
  <div class="questions-container">
    <div class="question-container">
      <div class="answer question-answer">
        <article class="text-token-text-primary question-txt">
          <h6 class="sr-only">${escapeHTML(questionText)}</h6>
          <div class="text-base">
            <div class="whitespace-pre-wrap">
              <pre tabindex="0" class="copy-code drop-question">${escapeHTML(questionText)}</pre>
            </div>
          </div>
        </article>
        <article class="text-token-text-primary answer-txt">
          <h6 class="sr-only">Chat Gpt Said: </h6>
          <div class="text-base">
            ${answerHTML}
          </div>
        </article>
      </div>
    </div>
  </div>
</div>`.trim();

    navigator.clipboard.writeText(finalHTML).then(() => {
      alert('✅ Clean Q&A copied!');
    }).catch(err => {
      alert('❌ Clipboard error: ' + err);
    });
  });
})();
