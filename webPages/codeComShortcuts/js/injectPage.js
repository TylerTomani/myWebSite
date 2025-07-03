import { letterFocus } from "../../../js/letter-focus-perfect.js"
const sideBarTopicsAs = document.querySelectorAll('.side-bar-topics a')
const mainLandingPage = document.querySelector('#mainLandingPage')
const homeHref = './home-codeCmdShrt.html'
sideBarTopicsAs.forEach(el => {
    if(el.hasAttribute('autofocus')){
        injectPage(el.href)
        console.log(el.href)
    } else {
        injectPage(homeHref)

    }
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.target)
        injectPage(e.target.href)
    });
})

function injectPage(href){
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