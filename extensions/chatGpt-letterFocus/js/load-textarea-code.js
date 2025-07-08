const mainScript = document.querySelector('#mainScript')
let code = 'versions/main-script.js'
function loadTextAreaCode(code){
    fetch(code)
    .then(response => response.text())
    .then(jsCode => {
        mainScript.innerHTML = jsCode
    })
    .catch(err =>{
        console.log('failed ot load code', err)
    })
}
loadTextAreaCode(code)