const mainScript = document.querySelector('#mainScript')
const homelink = document.querySelector('#homelink')
addEventListener('keydown', e => {
    let key = e.key.toLowerCase()
    if(key === 'm'){
        console.log(mainScript)
        e.preventDefault()
        
        mainScript.focus()
    }
    if(key === 'h'){
        if (!homelink.hasAttribute('tabindex')) {
            homelink.setAttribute('tabindex', '0')
        }
        homelink.focus()
    }
    // if(!isNaN(key)){
    //     let intlet = parseInt(key)
    //     copyCodes[intlet -1]?.focus()
    // }
});