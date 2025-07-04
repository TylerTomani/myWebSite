const sideBar = document.querySelector('.page-wrapper > aside.side-bar')
const sideBarBtn = document.querySelector('#sideBarBtn')

function toggleSidebar(e) {
    e.preventDefault()
    sideBar.classList.toggle('collapsed')
}



sideBarBtn.addEventListener('click', e => {
    if(!e.target.tagName != 'ASIDE') return
    hideSideBar()
})
sideBarBtn.addEventListener('keydown', e => {
    console.log(e.target)
    if (e.key === 'Enter') toggleSidebar(e)
})

function hideSideBar(){
    sideBar.classList.toggle('hidden')
}