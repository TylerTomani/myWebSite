import { mainTargetDiv } from "./letterfocus-index.js";
import { letterFocusInvoice } from "./letterFocus-invoice.js";
import { addDeleteItem } from "./addDeleteItem.js";
function fetchHtmlData(href) {
    fetch(href)
        .then(response => {
            return response.text()
        })
        .then(html => {
            mainTargetDiv.innerHTML = html;
            letterFocusInvoice();
            addDeleteItem()
            // cycleInvoiceElements();
        })
        .catch(error => console.error("Error fetching HTML:", error));
}

// Find the first element with the 'autofocus' attribute
const autofocusElement = document.querySelector('a[autofocus]');
const defaultHref = 'http://127.0.0.1:5500/projects/other/dadsinvoice/invoice.html';

// Fetch the appropriate HTML file
fetchHtmlData(autofocusElement ? autofocusElement.href : defaultHref);

// Add event listeners to specific links
document.querySelectorAll('a').forEach(el => {
    
    if (el.id === 'invoicePage' || el.id === 'listPage') {
        el.addEventListener('click', e => {
            e.preventDefault();
            fetchHtmlData(el.href);
            // letterFocusInvoice()
        });
    }
});