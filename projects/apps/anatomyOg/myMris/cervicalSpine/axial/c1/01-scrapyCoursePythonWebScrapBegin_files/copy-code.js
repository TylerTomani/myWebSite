(function(){

    const codeCopy = document.querySelectorAll('.copy-code')
const codeContainers = document.querySelectorAll('.code-containers')
const stepTxtPAsCopy = document.querySelectorAll('.step-txt > p > a')
let cmdCarray = []
codeCopy.forEach(copycode => {
    copycode.addEventListener('keydown' , e => {        
        cmdCarray.unshift(e.keyCode)
        if(cmdCarray.length > 3){
            cmdCarray.pop()
        }
        if(cmdCarray[0] === 67 && cmdCarray[1] === 91){
            console.log("cmd + c")
            animate(e)

        }
    })
    copycode.addEventListener('click', e => {
        e.preventDefault()
        animate(e)
    })
    copycode.addEventListener('focusin', e  => {
        console.log(e.target)
        if(e.target.classList.contains('long-code')){
            console.log('focusin')
            e.target.scrollIntoView({ block: "end", inline: "nearest" });
            if(e.target.classList.contains('long-code')){
                e.target.scrollIntoView({ block: "start", inline: "nearest" });
            }
        }
        
    });

})
stepTxtPAsCopy.forEach(copycode => {
    copycode.addEventListener('keydown' , e => {        
        cmdCarray.unshift(e.keyCode)
        if(cmdCarray.length > 3){
            cmdCarray.pop()
        }
        if(cmdCarray[0] === 67 && cmdCarray[1] === 91){
            animate(e)
            console.log("cntrl + c")
        }
    })
    copycode.addEventListener('click', e => {
        e.preventDefault()
        animate(e)
    })

})

function animate(e){
    let el = e.target
    if(el.classList.contains('decopied')){
        el.classList.remove('decopied')
    }
    el.classList.add('copied')
    setTimeout(() =>{
        el.classList.remove('copied')
        el.classList.add('decopied')

    },250)
    let txt = e.target.innerText
    copyToClip(txt)
}

function copyToClip(txt){

    async function copyTextToClipboard(text) {
        try {
          await navigator.clipboard.writeText(text);
        //   console.log("Text copied to clipboard:", text);
        } catch (err) {
          console.error("Unable to copy text to clipboard:", err);
        }
      }
      const textToCopy = txt;
      copyTextToClipboard(textToCopy);
}


}())