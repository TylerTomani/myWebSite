// import { newItemBtn } from "./letterFocus-invoice.js";

export function updateItemTables() {
    const itemTables = document.querySelectorAll('.item-table')
    return itemTables
}
export function addDeleteItem(){
    let itemTables 
    const itemsContainer = document.querySelector('.items-container')
    const newItemBtn = document.querySelector('#newItemBtn')    
    
    newItemBtn.addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        if(letter == 'enter'){
            itemTables = updateItemTables()
            e.preventDefault()
            // updateItemTables()
            createItem(itemTables)        
        }
    })
    
    newItemBtn.addEventListener('mousedown', e => {
        e.preventDefault()
        updateItemTables()
        createItem(itemTables)        
    })
    // newItemBtn.addEventListener('click', e => {
    //     e.preventDefault()
    //     createItem(itemTables)        
    //     updateItemTables()
    // })
    addEventListener('keydown', e => {
        let letter = e.key.toLowerCase()
        itemTables = updateItemTables()
        if (!isNaN(letter)) {
            const intLet = parseInt(letter)
            if(intLet <= itemTables.length){
                const itemTable = itemTables[intLet - 1]
                // const itemSelectBox = itemTable.querySelector('.item select')
                itemTable.focus()
            }
        }
    })
    function createItem(itemTables){
        const itemTable = document.createElement('div')
        itemTable.classList.add('item-table')
        itemTable.setAttribute('tabindex','0')
        itemTable.id = `itemTable${itemTables.length - 1}`
        const item = document.createElement('div')
        item.classList.add('item')
        itemTable.appendChild(item)
        item.innerHTML = `
                    <h4>Item</h4>
                    <select name="item[]" id="itemSelect${itemTables.length}" class="inputInvoiceDataItem ">
                        <option value="" selected="selected"></option>
                        <option value="Days">Days</option>
                        <option value="Hours">Hours</option>
                        <option value="Product">Product</option>
                        <option value="Service">Service</option>
                        <option value="Expense">Expense</option>
                        <option value="Discount_aynax">Discount</option>
                    </select>
                `
        const description = document.createElement('div')
        description.classList.add('description')
        description.innerHTML = `
                    <h4>Description</h4>
                    <textarea name="description[]" id="description${itemTables.length}"
                    class="inputInvoiceDataDescription"></textarea>
                `
        itemTable.appendChild(description)
        const unitPrice = document.createElement('div')
        unitPrice.classList.add('unit-price')
        unitPrice.innerHTML = `
                <h4>Unit Price</h4>
                        <input name="unit_price[]" id="unit_price${itemTable.length}" type="text" autocomplete="nope"
                        class="inputInvoiceDataPriceOrQty"
                            value="0.00">
                `
        itemTable.appendChild(unitPrice)
        const quanity = document.createElement('div')
        quanity.classList.add('quanity')
        quanity.innerHTML = `
                <h4>quanity</h4>
                        <input name="qty[]" id="qty${itemTable.length}" type="text" autocomplete="nope"
                        class="inputInvoiceDataPriceOrQty" value="0.">
                `
        itemTable.appendChild(quanity)
        const itemTotal = document.createElement('div')
        itemTotal.classList.add('item-total')
        itemTotal.innerHTML = `
                    <h4>total</h4>
                    <input name="total[]" id="total${itemTable.length}" type="text" autocomplete="nope" readonly="" class="inputInvoiceDataAmount"
                        value="0.00">
                `
        const deleteItemBtn = document.createElement('div')
        deleteItemBtn.classList.add('delete-item-btn')
        // deleteItemBtn.classList.add('active')
        deleteItemBtn.setAttribute('tabindex', `0`)
        deleteItemBtn.setAttribute('anchor', `itemTable${itemTables.length}`)
        deleteItemBtn.innerHTML = `
                <span>x</span>
        `
        itemTable.appendChild(deleteItemBtn)
        itemTable.appendChild(itemTotal)
        itemsContainer.appendChild(itemTable)
    }
    /* 
    This is preventing zoom from occuring on mobile when selecting textareas or inputs in 
        the item Table. I don't understand why, got it from gpt
    */
    const viewport = document.querySelector("meta[name=viewport]");
    document.addEventListener("focusin", () => { viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1");});
    document.addEventListener("focusout", () => {viewport.setAttribute("content", "width=device-width, initial-scale=1");});
}
function getItemsContainer(parent){
    if(parent.classList.contains('items-container')){
        return parent
    } else if (parent.parentElement){
        return getItemsContainer(parent.parentElement)
    } else {
        return null
    }
}

function getItemTable(parent){
    if(parent.classList.contains('item-table')){
        return parent
    } else if (parent.parentElement){
        return getItemTable(parent.parentElement)
    } else {
        return null
    }
}
