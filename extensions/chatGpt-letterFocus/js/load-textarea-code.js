export const nxtBtn = document.querySelector('#nxtBtn')
const body = document.querySelector('body')
const mainScript = document.querySelector('#mainScript')
const versionTitle = document.querySelector('#versionTitle')

const practiceDraftScriptJsFile = 'versions/practice-draft-script.js'
const draftScriptJsFile = 'versions/draft-script.js'
const mainScriptJsFile = 'main-script-chat-letterFocus.js'
const workingScript = 'versions/working-script.js'
const filesArr = [practiceDraftScriptJsFile, draftScriptJsFile, workingScript, mainScriptJsFile]
// Change this for default script on home
let iFile = 0
let filePath = filesArr[iFile]
// addEventListener('DOMContentLoaded', () => {
//     scrollTo(0, 0)
// });
nxtBtn.addEventListener('click', e => {
    e.preventDefault()
    changeScript()   
})
nxtBtn.addEventListener('keydown', e => {
    let key = e.keyCode
    if(key === 13){
        scrollTo(0,0)
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
            versionTitle.innerText = 'practice draft script'
            versionTitle.id = 'practiceDraftScriptJsFile'
            break
        case 1 :
            versionTitle.innerHTML = 'draft script'
            versionTitle.id = 'draftScript'
            break
        case 2 :
            versionTitle.innerText = 'main version working script'
            versionTitle.id = 'mainScript'
            break
        case 3 :
            versionTitle.innerText = 'working backup'
            versionTitle.id = 'wokingBackupScript'
            break
    }
}
switchTitleScript()
function loadTextAreaCode(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(jsCode => {
            // Set full JS code in textarea with line breaks preserved
            mainScript.value = jsCode;

            // Get first non-empty line and clean it up
            const firstLine = jsCode.split('\n').find(line => line.trim().length > 0)?.trim();

            // If it's a comment like "// working - script", strip the slashes
            const displayLine = firstLine?.startsWith('//') ? firstLine.replace(/^\/\/\s*/, '') : firstLine;

            // Set that as the title
            if (displayLine) {
                versionTitle.innerText = displayLine;
            }
        })
        .catch(err => {
            console.log('failed to load code', err);
        });
}

loadTextAreaCode(filesArr[iFile])