import { letterFocus } from "../../../js/letter-focus-perfect.JS"
const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
const mainLandingPage = document.querySelector('#mainLandingPage')
const homeHref = './home-codeCmdShrt.html'
let loaded = false;

sideBarTopicsAs.forEach(a => {
    if (!loaded && a.hasAttribute('autofocus')) {
        injectPage(a.href)
    loaded = true
    }
    a.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        injectPage(e.target.href)
    })
})
if (!loaded) injectPage(homeHref)

function injectPage(href){
    console.log(href)
    fetch(href)
    .then(response => {
        return response.text()
    })
    .then(html => {
        mainLandingPage.innerHTML = ``
        mainLandingPage.innerHTML = html
        letterFocus()
    })
}