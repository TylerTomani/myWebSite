const dropTopics = document.querySelectorAll('.drop-topic')
const dropSubTopics = document.querySelectorAll('.drop-sub-topic')
const topicsContainers = document.querySelectorAll('.topics-container')
const subTopicContainer = document.querySelectorAll('.sub-topic-container')

dropTopics.forEach(el => {
    el.addEventListener('click', e =>{
        e.preventDefault()
        toggleTopic(e)
    })
})
dropSubTopics.forEach(el => {
    el.addEventListener('click', e =>{
        e.preventDefault()
        toggleSubTopic(e)
    })
})
hideAllSUBTopicsContainers()
function toggleTopic(e){
    const topic = getTopic(e.target.parentElement)
    const topicsContainer = topic.querySelector('.topics-container')
    if(topicsContainer){topicsContainer.classList.toggle('hide')}
    const subTopicContainers = topic.querySelector('.sub-topics-container')
    if(subTopicContainers){subTopicContainers.classList.toggle('hide')}
}
function toggleSubTopic(e){
    const subTopic = getSubTopic(e.target.parentElement)
    const subTopicsContainer = subTopic.querySelector('.sub-topic-container')
    console.log(subTopicContainer)
    if(subTopicsContainer){
        subTopicsContainer.classList.toggle('hide')
    }
    
}
function hideAllTopicsContainers(){
    dropTopics.forEach(el => {
        const topic = getTopic(el.parentElement)
        const topicsContainer = topic.querySelector('.topics-container')
        if (topicsContainer) {
            if (!el.classList.contains('show')) {
                topicsContainer.classList.add('hide')
            }
        }
        const subTopicsContainer = topic.querySelector('.sub-topics-container')
        if (subTopicsContainer) {
            // const topicsContainer = subTopics.querySelector('.topics-container') 
            if(!el.classList.contains('show')){
                subTopicsContainer.classList.add('hide')

            }
        }
    
    })
}

function hideAllSUBTopicsContainers() {
    
    subTopicContainer.forEach(el => {
        if (!el.classList.contains('show')) {
            el.classList.add('hide')
        }
    })
}
function getTopic(parent){
    if(parent.classList.contains('topic')){
        return parent
    } else if (parent.parentElement){
        return getTopic(parent.parentElement)
    } else {
        return null
    }
}
function getSubTopic(parent){
    if(parent.classList.contains('sub-topic')){
        return parent
    } else if (parent.parentElement){
        return getSubTopic(parent.parentElement)
    } else {
        return null
    }
}
