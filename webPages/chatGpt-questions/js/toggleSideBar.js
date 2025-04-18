const toggleDraggable = document.querySelector('#toggleSideBtn')
const draggable = document.querySelector('.draggable')
const sideToggleBtn = document.querySelector('#sideToggleBtn')
sideToggleBtn.onclick = toggleSideBar

function toggleSideBar(){
    draggable.classList.toggle('active')
    sideToggleBtn.classList.toggle(('active'))
}

draggable.addEventListener('click', e => {
    e.preventDefault()

    if(e.target == draggable){
        toggleSideBar()
    }
});