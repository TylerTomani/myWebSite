const skeletalSystemBtn = document.getElementById('skeletalSystemBtn')
const nervousSystemBtn = document.getElementById('nervousSystemBtn')
const muscularSystemBtn = document.getElementById('muscularSystemBtn')
const systems = document.querySelectorAll('.system')
const dropGroups = document.querySelectorAll('.group > .drop')
const dropSubGroups = document.querySelectorAll('.sub-group > .drop')
const groupItems = document.querySelectorAll('.group-items')
const groupItemsAs = document.querySelectorAll('.group-items > li > a')
const subGroups = document.querySelectorAll('.sub-group')
const subGroupsItems = document.querySelectorAll('.sub-group-items')
const subGroupsItemsAs = document.querySelectorAll('.sub-group-items > li > a')
systems.forEach(el => {
    if(!el.classList.contains('show')){
        el.classList.add('hide')
    }
})
function hideSystems(){
    systems.forEach(el => {
        if(el.classList.contains('show')){
            el.classList.remove('show')
            el.classList.add('hide')
        }
        el.classList.add('hide')
    })
}
function hideGroups(){
    // dropGroups.forEach(el => {
    //     if(!el.classList.contains('hide')){
    //         el.classList.add('hide')
    //     }
    // })
    groupItems.forEach(el => {
        if(!el.classList.contains('hide')){
            el.classList.add('hide')
        }
    })
    groupItemsAs.forEach(el => {
        if(!el.classList.contains('hide')){
            el.classList.add('hide')
        }
    })

}
function hideSubGroups() {
    dropSubGroups.forEach(el => {
        if(!el.classList.contains('hide')){
            el.classList.add('hide')
        }
    })
    subGroupsItems.forEach(el => {
        if(!el.classList.contains('hide')){
            el.classList.add('hide')
        }
    })
    subGroupsItemsAs.forEach(el => {
        if(!el.classList.contains('hide')){
            el.classList.add('hide')
        }
    })
}
hideSubGroups()
hideGroups()
dropGroups.forEach(el => {
    el.addEventListener('click', e => {
        handleGroupShow(e)
    })
})
dropSubGroups.forEach(el => {
    el.addEventListener('click', e =>{

        const subGroup = getSubGroup(el.parentElement)
        const subGroupItems = subGroup.querySelector('.sub-group-items')
        const subGroupItemsAs = subGroup.querySelectorAll('.sub-group-items > li > a')
        handleSubGroupsShow(subGroupItems,subGroupItemsAs)

    })

})
function handleGroupShow(e){
    const group = getGroup(e.target.parentElement)
    const groupItems = group.querySelector('.group-items')
    const subGroups = group.querySelectorAll('.sub-group')
    if(groupItems){
        const groupItemsAs = group.querySelectorAll('.group-items > li > a')
        if(groupItems.classList.contains('hide')){
            groupItems.classList.remove('hide')
        } else {
            groupItems.classList.add('hide')
        }
        groupItemsAs.forEach(el => {
            if(el.classList.contains('hide')){
                el.classList.remove('hide')
            } else {
                el.classList.add('hide')           
            }
        })
    }
        if(subGroups){
            subGroups.forEach(el => {
                
                handleDropSub(el)
            })
        }
}
function handleSubGroupsShow(subGroupItems,subGroupItemsAs){   
    if(subGroupItems.classList.contains('hide')){
        subGroupItems.classList.remove('hide')
    } else {
        subGroupItems.classList.add('hide')
    }
    subGroupItemsAs.forEach(el => {
        if(el.classList.contains('hide')){
            el.classList.remove('hide')
        } else {
            el.classList.add('hide')

        }
    })
}
function handleDropSub(el){
    const dropSubGroup = el.querySelector('a.drop')
    const subGroupItems = el.querySelectorAll('.sub-group-items')
    const subGroupItemsAs = el.querySelectorAll('.sub-group-items > li > a')
    if(dropSubGroup.classList.contains('hide')){
        dropSubGroup.classList.remove('hide')
    } else {
        dropSubGroup.classList.add('hide')
    }
    subGroupItems.forEach(el =>{
        if(!el.classList.contains('hide')){
            el.classList.add('hide')
        } else {
        }
    })
    subGroupItemsAs.forEach(el =>{
        if(!el.classList.contains('hide')){
            el.classList.add('hide')
        } else {
        }
    })
}
function getGroup(parent){
    if(parent.classList.contains('group')){
        return parent
    } else if (parent.parentElement){
        return getGroup(parent.parentElement)
    } else {
        return null
    }
}
 function getSubGroup(parent){
    if(parent.classList.contains('sub-group')){
        return parent
    } else if (parent.parentElement){
        return getSubGroup(parent.parentElement)
    } else {
        return null
    }
}


skeletalSystemBtn.addEventListener('click',e => {
    const skeletalSystem = document.querySelector('#skeletalSystem')
    console.log(skeletalSystem)
    hideSystems()
    if(skeletalSystem.classList.contains('hide')){
        skeletalSystem.classList.remove('hide')
    }
})
nervousSystemBtn.addEventListener('click',e => {
    const nervousSystem = document.querySelector('#nervousSystem')
    hideSystems()
    console.log(nervousSystem)
    if(nervousSystem.classList.contains('hide')){
        nervousSystem.classList.remove('hide')
    }
})
muscularSystemBtn.addEventListener('click',e => {
    const muscularSystem = document.querySelector('#muscularSystem')
    console.log(muscularSystem)
    hideSystems()
    if(muscularSystem.classList.contains('hide')){
        muscularSystem.classList.remove('hide')
    }
})