const allEls = document.querySelectorAll('body *')
const idEls = []
let letterElsArr = []
let currentLetter 
let iLetter = 0
allEls.forEach(el => {
    if(el.hasAttribute('id')){
        idEls.push(el)
    }
})
addEventListener('keydown', e => {
    let letter = e.key.toLowerCase() 
    letterElsArr = []
    
    idEls.forEach(el =>{
        if(letter == el.id[0]){
            letterElsArr.push(el)
        }
        
    })
    if(letterElsArr){
        if(currentLetter != letter && letterElsArr[0]){
            letterElsArr[0].focus()
        } 

        if(currentLetter == letter && letterElsArr.length > 0){
            iLetter++  
            if(iLetter >= letterElsArr.length){
                iLetter = 0
            }
            letterElsArr[iLetter].focus()
        }
    }
    
    currentLetter = letter
});