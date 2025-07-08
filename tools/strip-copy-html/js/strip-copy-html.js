document.getElementById('stripCopyBtn').addEventListener('click', () => {
    const htmlString = document.getElementById('mainScript').value;
    const resultHtml = document.querySelector('#resultHtml')
    if (!htmlString.trim()) {
        showMessage('Please paste some HTML first.', true);
        return;
    }

    // Parse HTML string into container element
    const container = document.createElement('div');
    container.innerHTML = htmlString;

    // Remove all <svg> elements
    container.querySelectorAll('svg').forEach(svg => svg.remove());

    const cleanedHTML = container.innerHTML;
    resultHtml.innerHTML = cleanedHTML
    // Copy cleaned HTML to clipboard
    navigator.clipboard.writeText(cleanedHTML)
        .then(() => {
            showMessage('Cleaned HTML copied to clipboard!');
        })
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
  