const mainScript = document.querySelector('#mainScript')
// let elementImg = document.querySelector('#elementImg')
const homelink = document.querySelector('#homelink')
const backToTopBtn = document.querySelector('#backToTopBtn')
const textarea = document.querySelector('textarea')
const btmPageCopyCodes = document.querySelectorAll('.code-elements-container .copy-code')
let iCopyCodes = 0
let elsArr = [nxtBtn,backBtn, backToTopBtn]
let iEl = 0
import { nxtBtn } from "./load-textarea-code.js"
import { backBtn } from "./load-textarea-code.js"
let focusedMainScript = false
textarea.addEventListener('focus', e => {
    e.target.scrollTop = 0;
});
textarea.addEventListener('keydown', e => {
    let key = e.key.toLowerCase()
    if(key === 'm'){
        scrollTo(0,0)
    }
})
mainScript.addEventListener('focus', (e) =>{
    focusedMainScript = true
    // console.log(e.target,iCopyCodes)
    // iCopyCodes = 0
})
mainScript.addEventListener('focusout', () =>{focusedMainScript = false})
addEventListener('keydown', e => {
    let key = e.key.toLowerCase()
    if((e.metaKey || e.ctrlKey) && e.shiftKey && e.key == 'x'){
        focusedMainScript = false
        elsArr[iEl].focus()
        iEl = (iEl + 1) % elsArr.length
    }
    if (focusedMainScript && !e.shiftKey) {
        return
    }
    if (key === 'm') {
        // e.preventDefault()
        mainScript.focus()
        scrollTo(0,0)
    }
    if (key === 'b') {
        e.preventDefault()
        backBtn.focus()
    }
    if (key === 'n') {
        e.preventDefault()
        nxtBtn.focus()
    }
    if (key === 'h') {
        if (!homelink.hasAttribute('tabindex')) {
            homelink.setAttribute('tabindex', '0')
        }
        console.log(homelink)
        homelink.focus()
    }
    if (key === 'e') {
        if (!backToTopBtn.hasAttribute('tabindex')) {
            backToTopBtn.setAttribute('tabindex', '0')
        }
        backToTopBtn.focus()
    }
    if (key === 't') {
        nxtBtn.focus()
        
    }
    
    if(!isNaN(key)){
        let intlet = parseInt(key)
        btmPageCopyCodes[intlet - 1]?.focus()
        let iCopyCodes = intlet - 1
    }
    if (key === 'c') {
        if (e.metaKey) return;
    
        // Always sync index manually based on focused element
        const active = document.activeElement;
        btmPageCopyCodes.forEach((el, idx) => {
            if (el === active) {
                iCopyCodes = idx;
            }
        });
        if (e.shiftKey) {
            iCopyCodes = (iCopyCodes - 1 + btmPageCopyCodes.length) % btmPageCopyCodes.length;
        } else {
            iCopyCodes = (iCopyCodes + 1) % btmPageCopyCodes.length;
        }
        btmPageCopyCodes[iCopyCodes].focus();
    
    
    }
    
});

backToTopBtn.addEventListener('keydown', e => {
    let key = e.keyCode
    if(key === 13){
        console.log(backToTopBtn)
        backToTopBtn.click()
    }
})
let elementImg; // define globally
btmPageCopyCodes.forEach((el, index) => {
    el.addEventListener('focus', e => {
        iCopyCodes = index; // ✅ Sync the index
        e.target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    elementImg = document.getElementById("elementImg"); // assign global

    let isImgVisible = false;

    elementImg.addEventListener('click', e => {
        e.preventDefault()
        elementImg.classList.toggle('enlarge')
        console.log('click') // ✅ should work now
    });

    document.querySelectorAll(".code-elements-container .copy-code").forEach((el) => {
        el.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const newSrc = el.dataset.img;
                if (newSrc) {
                    elementImg.src = newSrc;
                }
                toggleImg(elementImg)
            }
        });

        el.addEventListener("focus", (e) => {
            e.preventDefault();
            const newSrc = el.dataset.img;
            if (newSrc) {
                elementImg.src = newSrc;
            }

            if (isImgVisible) {
                denlargeAllImgs();
                elementImg.classList.add('enlarge');
            }
        });
    });
});


function toggleImg(img){
    // isImgVisible = !isImgVisible;
    img.classList.toggle('enlarge')
    
}
// Add click-to-toggle once, not inside toggleImg()
if(elementImg){

    elementImg.addEventListener('click', e => {
        e.preventDefault()
        elementImg.classList.toggle('enlarge')
        console.log('click')
    })
}

function denlargeAllImgs(){
    btmPageCopyCodes.forEach(el => {
        if (el.classList.contains('enlarge')) {
            el.classList.remove('enlarge')
        }
    })
}