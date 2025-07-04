const sideBar = document.querySelector('.page-wrapper > aside.side-bar')
const sideBarBtn = document.querySelector('#sideBarBtn')

function toggleSidebar(e) {
    e.preventDefault()
    sideBar.classList.toggle('collapsed')
}


sideBar.addEventListener('click', toggleSidebar)
sideBarBtn.addEventListener('click', toggleSidebar)
sideBarBtn.addEventListener('keydown', e => {
    if (e.key === 'Enter') toggleSidebar(e)
})
sideBar.addEventListener('keydown', e => {
    if (e.key === 'Enter') toggleSidebar(e)
})
