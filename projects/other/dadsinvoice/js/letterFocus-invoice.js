    // import { invoicePage } from "./letterfocus-index.js"
    export let textInputFocused = false

    import { updateItemTables } from "./addDeleteItem.js"
    let itemTables


    export function letterFocusInvoice(){
        const toName = document.querySelector('#to_name')
        const toNewCustomer = document.querySelector('#to_new_customer')
        const toAddress = document.querySelector(('#to_address'))
        const fromName = document.querySelector(('#from_name'))
        const fromAddress = document.querySelector(('#from_address'))
        const invoiceNum = document.querySelector('#invoice_num > #number_label')
        const itemsContainer = document.querySelector('#items-container')
        const invoiceNotes = document.querySelector('#invoice_notes')
        const textAreaInputs = document.querySelectorAll('textarea')
        const newItemBtn = document.querySelector('#newItemBtn')    

        
        
        addEventListener('keydown', e => {
            let isShift = e.shiftKey
            let letter = e.key.toLowerCase()
            if (!textInputFocused) {
                tempLetterFocus(e, letter)
            }
            if (isShift) {
            }
            // itemTables =  updateItemTables()
            // Just for now
        });
        newItemBtn.addEventListener('keydown', e => {
            setTimeout(() => {
                itemTables = updateItemTables()
                console.log(itemTables)
                handleItemTables(itemTables)
            },59)
        })
        function handleItemTables(itemTables){
            itemTables.forEach(el => {
                el.addEventListener('focusin', e => {
                    const deleteItemBtn = e.target.querySelector('.delete-item-btn')
                    el.style.border = '2px solid orange'
                    if (deleteItemBtn && !deleteItemBtn.classList.contains('active') ){
                        deleteItemBtn.classList.add('active')
                    }
                })
                el.addEventListener('focusout', e => {
                    const deleteItemBtn = e.target.querySelector('.delete-item-btn')
                    if (deleteItemBtn && deleteItemBtn.classList.contains('active')){
                        deleteItemBtn.classList.remove('active')
                    }
                })
                
            })
        }
        itemTables = updateItemTables()
        handleItemTables(itemTables)
        
        
            // This is the original code
        function field_onfocus(element, placeholderText) {
            if (element.value.trim() === '') {
                element.value = placeholderText;
                element.classList.add('placeholder-text'); // Optional: Add styling
            }

            element.addEventListener('blur', () => {
                if (element.value.trim() === placeholderText) {
                    element.value = ''; // Clear placeholder on blur if unchanged
                    element.classList.remove('placeholder-text');
                }
            });
        }
        // Auto-attach to all inputs and textareas with the onfocus attribute in HTML
        document.querySelectorAll('textarea, input').forEach(el => {
            // if (el.hasAttribute('onfocus')) {
            //     const match = el.getAttribute('onfocus').match(/field_onfocus\(this,\s*['"](.+?)['"]\)/);
            //     if (match) {
            //         el.addEventListener('focus', () => field_onfocus(el, match[1]));
            //     }
            // }
            el.addEventListener('focusin', e => {
                textInputFocused = true
                console.log('textarea input: focus')
            })
            el.addEventListener('focusout', e => {
                textInputFocused = false
            })
            
        });
        
        function tempLetterFocus(e,letter){
            if (letter == 'i') {
                // const dataTableItem = document.querySelector('#itemSelect0')
                const itemTables = document.querySelector('.item-table')
                itemTables.focus()
            }
            if (letter == 't') {
                const itemTotal = document.querySelector('.item-total input')
                itemTotal.focus()
            }
            if (letter == 'u') {
                const unitPrice = document.querySelector('.unit-price input')
                e.preventDefault()
                unitPrice.focus()
            }
            
            if (letter == 'n') {
                newItemBtn.focus()
            }
        }    
    }
    

