import { invoicePage } from "./letterfocus-index.js"
export function letterFocusInvoice(){
    const homelink = document.querySelector('#homelink')
    const listPage = document.querySelector('#listPage')
    const from = document.getElementById('from')
    const to = document.getElementById('to')
    const toName = document.querySelector('#to_name')
    const invoiceNum = document.querySelector('#invoice_num > #number_label')
    const itemsContainer = document.querySelector('#items-container')
    const invoiceNotes = document.querySelector('#invoice_notes')
    const iItems = [invoiceNum, itemsContainer, invoiceNotes]
    const allEls = document.querySelectorAll('body *')
    const toNewCustomer = document.querySelector('#to_new_customer')
    const toAddress = document.querySelector(('#to_address'))
    let textInputFocused = false
    allEls.forEach(el => {
        el.addEventListener('focus', e => {
            // console.log(e.target)
        })
    })

    // document.querySelectorAll('body *').addEventListener('click', e => {
    //     console.log(e.target)
    // })
    // document.querySelectorAll('body *').addEventListener('mouseover', e => {
    //     console.log(e.target)
    // })
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        let isShift = e.shiftKey
        if (!textInputFocused) {
            if (letter == 'f') {
                scrollTo(0, 0)
                from.focus()
            }
            if (letter == 'h') {
                scrollTo(0, 0)
                homelink.focus()
            }
            
            if (letter == 'l') {
                listPage.focus()
            }
            if (letter == 't') {
                scrollTo(0, 0)
                to.focus()
            }
            if (letter == 'n') {
                scrollTo(0, 0)
                toName.focus()
            }
            if (letter == 'i') {
                cycleIitems(isShift)
            }
        }
    });
    [toName, toNewCustomer, toAddress].forEach(el => {
        el.addEventListener('focusin', e => {
            textInputFocused = true
        })
        el.addEventListener('focusout', e => {
            textInputFocused = false

        })
    })
    let iItem = 0
    function cycleIitems(isShift){
         if(!isShift){
             console.log(iItem)
             if (iItem <=  iItems.length ){
                 iItem++
                } else {
                    iItem = 1
                    iItems[iItem].setAttribute('tabindex', 0)
                    iItems[iItem].focus()
                }
                
            }
        
    }
}
