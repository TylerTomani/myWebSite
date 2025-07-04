import { sideBarTopicsAs } from "./injectPage.js";

sideBarTopicsAs.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        console.log(e.target)
        const liSideBarTopic = e.target.closest('li')
        console.log(liSideBarTopic)
        const childUl = liSideBarTopic.querySelector('ul')
        console.log(childUl)
        childUl.classList.toggle('hide')
    })
})

function getSideBarTopics(parent){
    if(parent.classList.contains('side-bar-topics')){
        return parent
    } else if (parent.parentElement){
        return getSideBarTopics(parent.parentElement)
    } else {
        return null
    }
}

