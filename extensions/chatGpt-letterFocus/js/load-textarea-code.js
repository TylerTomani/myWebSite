export const nxtBtn = document.querySelector('#nxtBtn')
const body = document.querySelector('body')
const mainScript = document.querySelector('#mainScript')
const versionTitle = document.querySelector('#versionTitle')

const mainScriptJsFile = 'main-script-chat-letterFocus.js'
const draftScriptJsFile = 'versions/draft-script.js'
const workingScript = 'versions/working-script.js'
const filesArr = [mainScriptJsFile,draftScriptJsFile,workingScript]
// Change this for default script on home
let iFile = 1
let filePath = filesArr[iFile]

nxtBtn.addEventListener('click', e => {
    e.preventDefault()
    changeScript()   
})
nxtBtn.addEventListener('keydown', e => {
    let key = e.keyCode
    if(key === 13){
        changeScript()
    }
})

function changeScript(){
    if(iFile > 0){
        let r = Math.floor(Math.random() * 50)
        let g = Math.floor(Math.random() * 50)
        let b = Math.floor(Math.random() * 50)
        if(body.classList.contains('dark-mode')){
            console.log(body)
            mainScript.style.background = `rgb(${r},${g},${b},.05)`
        }
        mainScript.style.background = `rgb(${r},${g},${b},.5)`
        console.log(`rgb(${r},${g},${b},.05)`)
    }
    iFile = (iFile + 1) % filesArr.length
    loadTextAreaCode(filesArr[iFile])
    switchTitleScript()    
}

function switchTitleScript(){
    switch (iFile){
        case 0 :
            versionTitle.innerText = 'main version working script'
            versionTitle.id = 'mainScript'
            break
        case 1 :
            versionTitle.innerHTML = 'draft script'
            versionTitle.id = 'draftScript'
            break
        case 2 :
            versionTitle.innerText = 'working backup'
            versionTitle.id = 'wokingBackupScript'
            break
    }
}
switchTitleScript()
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
loadTextAreaCode(filesArr[iFile])