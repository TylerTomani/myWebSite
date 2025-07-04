const sidebar = document.querySelector('.side-bar');

let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  const swipeDistance = endX - startX;

   if (swipeDistance < -50 && !sidebar.classList.contains('hidden')) {
    //  if(sideBar.classList.contains('active')){
    //    sidebar.classList.toggle('active')
    //   }
      sidebar.classList.toggle('hidden');
  }

  // Swipe right from left edge: show sidebar if hidden
  // if (swipeDistance > 150 && startX < 50 && sidebar.classList.contains('hidden')) {
  //   if(sideBar.classList.contains('active')){
  //     sidebar.classList.remove('active')
  //   }
  //   sidebar.classList.remove('hidden');
  // }
});

// sidebar.addEventListener('click', e => {
//   const sidebar = getSideBar(e.target)
//   console.log(sidebar)
//   if(sidebar.classList.contains('active')){
//     sidebar.classList.remove('active')
//   }
//   sidebar.classList.add('hidden')
// })
function getSideBar(parent){
  if(parent.classList.contains('side-bar')){
    return parent
  } else if (parent.parentElement){
    return getSideBar(parent.parentElement)
  } else {
    return null
  }
}