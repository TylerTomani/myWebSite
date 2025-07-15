const tagInput = document.getElementById('tagInput');
const removeBtn = document.getElementById('removeBtn');
const tagHistory = document.getElementById('tagHistory');
const resultHtml = document.querySelector('#resultHtml');
const mainScript = document.getElementById('mainScript');

let previousTags = new Set(JSON.parse(localStorage.getItem('previousTags') || '["svg", "span"]'));

function updateTagHistoryUI() {
    tagHistory.innerHTML = '';
    previousTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.textContent = `Remove <${tag}>`;
        btn.style.margin = '4px';
        btn.onclick = () => {
            removeTagFromHTML(tag);
        };
        tagHistory.appendChild(btn);
    });
}

function saveTags() {
    localStorage.setItem('previousTags', JSON.stringify([...previousTags]));
}

function removeTagFromHTML(tag) {
    const htmlString = mainScript.value;
    if (!htmlString.trim()) {
        showMessage('Please paste some HTML first.', true);
        return;
    }

    const container = document.createElement('div');
    container.innerHTML = htmlString;

    // Highlight in #mainScript view
    container.querySelectorAll(tag).forEach(el => {
        el.style.outline = '2px solid red';
        el.style.backgroundColor = '#ffe6e6';
        el.setAttribute('data-to-remove', tag); // for optional identification
    });

    // Show highlighted HTML in textarea
    mainScript.value = container.innerHTML;

    // Remove those same tags for final copy
    const stripped = container.cloneNode(true);
    stripped.querySelectorAll(tag).forEach(el => el.remove());

    const cleanedHTML = stripped.innerHTML;
    resultHtml.value = cleanedHTML;

    navigator.clipboard.writeText(cleanedHTML)
        .then(() => showMessage(`Marked and removed <${tag}>. Copied clean HTML.`))
        .catch(err => {
            console.error('Copy failed:', err);
            showMessage('Failed to copy to clipboard.', true);
        });
}


removeBtn.addEventListener('click', () => {
    const tag = tagInput.value.trim();
    if (!tag) {
        showMessage('Enter a valid element tag.', true);
        return;
    }
    previousTags.add(tag);
    saveTags();
    updateTagHistoryUI();
    removeTagFromHTML(tag);
    tagInput.value = '';
});

// Still keep your old "strip all" behavior if desired
document.getElementById('stripCopyBtn').addEventListener('click', () => {
    const htmlString = mainScript.value;
    if (!htmlString.trim()) {
        showMessage('Please paste some HTML first.', true);
        return;
    }

    const container = document.createElement('div');
    container.innerHTML = htmlString;

    // Default batch removal: svg + span
    ['svg', 'span'].forEach(tag => {
        container.querySelectorAll(tag).forEach(el => el.remove());
    });

    const cleanedHTML = container.innerHTML;
    resultHtml.value = cleanedHTML;

    navigator.clipboard.writeText(cleanedHTML)
        .then(() => showMessage('Removed <svg> and <span>, copied to clipboard.'))
        .catch(err => {
            console.error('Failed to copy:', err);
            showMessage('Failed to copy to clipboard.', true);
        });
});

function showMessage(msg, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
    messageDiv.style.color = isError ? 'red' : 'green';
}

updateTagHistoryUI();
