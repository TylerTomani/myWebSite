import { letterFocus } from "./letter-focus-codeCmdShorts.js";
export const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
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
        const link = e.currentTarget // Always the <a>, even on mobile
        injectPage(link.href)

        const innerPageTitle = document.querySelector('.main-content-title')
        innerPageTitle.innerHTML = link.innerHTML
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