const sideBar = document.querySelector('.page-wrapper > aside.side-bar')
const sideBarBtn = document.querySelector('#sideBarBtn')

function toggleSidebar(e) {
    e.preventDefault()
    sideBar.classList.toggle('collapsed')
}
sideBar.addEventListener('click', e => {
    if(!e.target.tagName != 'ASIDE') return
    toggleSidebar(e)
})


sideBarBtn.addEventListener('click', e => {
    
    hideSideBar()
})

sideBarBtn.addEventListener('keydown', e => {
    console.log(e.target)
    if (e.key === 'Enter') hideSideBar(e)
})

function hideSideBar(e){
    sideBar.classList.toggle('hidden')
}