export const nxtBtn = document.querySelector('#nxtBtn')
const mainScript = document.querySelector('#mainScript')
const versionTitle = document.querySelector('#versionTitle')

const mainScriptJsFile = 'main-script.js'
const draftScriptJsFile = 'versions/draft-script.js'
const filesArr = [mainScriptJsFile,draftScriptJsFile]
let iFile = 0
nxtBtn.addEventListener('click', e => {
    changeScript()   
})
nxtBtn.addEventListener('keydown', e => {
    let key = e.keyCode
    if(key === 13){
        changeScript()
    }
})
function changeScript(){
    iFile = (iFile + 1) % filesArr.length
    loadTextAreaCode(filesArr[iFile])
    let r = Math.floor(Math.random() * 50)
    let g = Math.floor(Math.random() * 50)
    let b = Math.floor(Math.random() * 50)
    mainScript.style.background = `rgb(${r},${g},${b},.5)`
}
function loadTextAreaCode(filePath){
    fetch(filePath)
    .then(response => response.text())
    .then(jsCode => {
        mainScript.innerHTML = jsCode
    })
    .catch(err =>{
        console.log('failed ot load code', err)
    })
}
loadTextAreaCode(draftScriptJsFile)