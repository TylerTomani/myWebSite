const mainScript = document.querySelector('#mainScript')
const copyCodes = document.querySelectorAll('.copy-code')
addEventListener('keydown', e => {
    let key = e.key.toLowerCase()
    if(key === 'm'){
        mainScript.focus()
    }
    if(!isNaN(key)){
        let intlet = parseInt(key)
        copyCodes[intlet -1]?.focus()
    }
});