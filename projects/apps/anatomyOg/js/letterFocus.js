const homelink = document.getElementById('homeLink');
homelink.addEventListener('click', e => {
    open(e.target.href);
});
let letteredArr = [];
let iLetter = 0;
let currentLetter;
let currentIndex = 0
let clicked = false
let lastElement
const mainImg = document.querySelector('#mainImgContainer > img')
const allElements = document.querySelectorAll('[id]');
let clickCount = 0
mainImg.addEventListener('focusout', e => {
    lastElement.focus()
})
allElements.forEach(el => {
    el.addEventListener('focus', e =>{
        clickCount = 0
        clicked = false
        currentIndex = [...allElements].indexOf(e.target)
    })
    el.addEventListener('focusout', e =>{
        clickCount = 0
        clicked = false
    })
    el.addEventListener('focusin', e =>{
        clickCount = 0
        clicked = false
    })
    el.addEventListener('click', e => {
        clickCount++
        if(e.target.tagName != 'IMG'){
            
            lastElement = e.target
            if(clickCount == 2){
                mainImg.focus()
            }
                    
        }
    })
})
document.addEventListener('keydown', e => {
    const letter = e.key.toLowerCase();
    if (letter == 'h') {
        homelink.focus();
    }
    // Select all elements with an id attribute
    // Filter elements where id starts with the pressed key
    letteredArr = [];
    allElements.forEach(el => {
        const parent = getParent(el);
        if (parent) {
            if (letter == el.id[0] && !el.classList.contains('hide')) {
                letteredArr.push(el);
            }
        }
    });
    /** The last step will be going to the next element of a different letter 
     * so if on Vertebral Column, and 'C' is pressed, focus goes to 
     * Cervial Spine, NOT Cranial Bones
     *  AND, 
     * add num selection for c1-c7,t1-12,rib1-rib12, ....
     */ 
    
    if (letter == currentLetter && letteredArr.length > 0) {
        iLetter = (iLetter + 1) % letteredArr.length;
        letteredArr[iLetter].focus();
    } else {

        let allIndex = [...allElements].indexOf(letteredArr[iLetter]);
        if(allIndex > currentIndex){
            if (letteredArr.length > 0) {
                letteredArr[0].focus();
            }
        } else {
            if (letteredArr.length > 0 && letteredArr[1]) {
                letteredArr[1].focus();
            } else {
                if(letteredArr[0]){

                    letteredArr[0].focus()
                }
            }
        }
    }
    
    // if(clicked && !e.target.classList.contains('drop')){
    //     
    //     lastElement = e.target
    //     
    //     // imgContainer.focus()
    // } 
    
    // clicked = true
    
    currentLetter = letter;
});

function getParent(parent) {
    if (parent.classList.contains('group') || parent.classList.contains('sub-group') || parent.classList.contains('systems-btns')) {
        return parent;
    } else if (parent.parentElement) {
        return getParent(parent.parentElement);
    } else {
        return null;
    }
}
