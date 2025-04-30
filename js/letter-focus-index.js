const allAs = Array.from(document.querySelectorAll('a'))
let lastLetterPressed
let iLetter

addEventListener('keydown', e => {
    let letter = e.key.toLowerCase()
    let letteredAs = allAs.filter(el => el.innerText.toLowerCase().startsWith(letter))
    letteredAs.forEach(el => console.log(el.innerText))

    lastLetterPressed = letter
});