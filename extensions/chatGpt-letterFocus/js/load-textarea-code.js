export const nxtBtn = document.querySelector('#nxtBtn')
export const backBtn = document.querySelector('#backBtn')
const body = document.querySelector('body')
const mainScript = document.querySelector('#mainScript')
const versionTitle = document.querySelector('#versionTitle')

const newVersion = 'versions/new.js'
const workingVersion = 'versions/working-version.js'
const draft = 'versions/draft.js'
const nonWorkingVersion = 'versions/nonworking-version.js'
const filesArr = [workingVersion, draft, newVersion, nonWorkingVersion]
// Change this for default script on home
let iFile = 0
let filePath = filesArr[iFile]
addEventListener('DOMContentLoaded', () => {
    changeBackground()
});
nxtBtn.addEventListener('click', e => {
    e.preventDefault()
    changeScript(0)   
})
nxtBtn.addEventListener('keydown', e => {
    let key = e.keyCode
    if(key === 13){
        
        scrollTo(0,0)
        changeScript(0)
    }
})
backBtn.addEventListener('click', e => {
    e.preventDefault()
    changeScript(1)   
})
backBtn.addEventListener('keydown', e => {
    let key = e.keyCode
    if(key === 13){
        
        scrollTo(0,0)
        changeScript(1)
    }
})

function changeScript(reverse){
    if(iFile > 0){
    }
    if(!reverse){
        iFile = (iFile + 1) % filesArr.length
    } else {
        iFile = (iFile - 1 + filesArr.length) % filesArr.length

    }
    console.log(iFile)
    loadTextAreaCode(filesArr[iFile])
    console.log(filesArr[iFile],iFile)
    let r = Math.floor(Math.random() * 50)
    let g = Math.floor(Math.random() * 50)
    let b = Math.floor(Math.random() * 50)
    if(body.classList.contains('dark-mode')){
        console.log(body)
    }
    // mainScript.style.background = `rgb(${r},${g},${b},.5)`
    // mainScript.style.background = `rgb(${r},${g},${b},.05)`
    // console.log(`rgb(${r},${g},${b},.05)`)
    // switchTitleScript()    
    console.log(iFile)
    changeBackground()
}
function changeBackground() {
    if (iFile == 0) {
        mainScript.style.background = 'rgb(3,38,22,.5)'
    }
    if (iFile == 1) {
        mainScript.style.background = 'rgb(14,42,47,.5)'
    }
    if (iFile == 2) {
        mainScript.style.background = 'rgb(48,17,17,.5)'
    }

}
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