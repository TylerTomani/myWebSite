const links = document.querySelectorAll('a')
const notes = document.querySelector('.notes')
const notesP = document.querySelector('.notes > p')

links.forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        const id = e.target.id
        notes.innerHTML = ``
        switch(id){
            case 'c1':
                notes.innerHTML = "<p>C1-C2: The atlantoaxial articulation demonstrates mild degenerative changes.  No cord impingement. The spinal canal is normal in caliber.</p>"
                break;
            case 'c2':
                notes.innerHTML= "<p>C2-C3: No significant disc bulging or focal soft disc protrusion/herniation. No central or lateral recess stenosis. No foraminal narrowing.</p>"
                break;
            case 'c3':
                notes.innerHTML = "<p>C3-C4: Large disc osteophyte complex eccentric to the left causes mild ventral cord impingement, cord flattening, and clockwise rotation in the axial plane. No focal soft disc protrusion/herniation. No central canal stenosis. Mild to moderate left lateral recess stenosis. Mild left foraminal narrowing.</p>"
                break;
            case 'c4':
                notes.innerHTML = "<p>C4-C5: Minor disc osteophyte complex and small central annular tear without focal soft disc protrusion/herniation or cord impingement. No spinal stenosis or foraminal narrowing.</p>"
                break;
            case 'c5':
                notes.innerHTML= "<p>C5-C6: Moderate disc osteophyte complex mildly eccentric to the left causes minimal ventral cord impingement on the left. No focal soft disc protrusion/herniation. Moderate central and left lateral recess stenosis. Severe left foraminal narrowing.</p>"
                break;
            case 'c5Nerve':
                notes.innerHTML = `
                <p>The C5 and C6 nerve roots also form the upper trunk of the brachial plexus, a network of nerves that provides movement and feeling to the shoulder, arm, and hand. The brachial plexus branches from the neck and travels under the clavicle, where the axillary nerve travels behind the humerus bone to supply muscles around the shoulde</p>
                <p><strong>C5</strong> C5 helps control the deltoids (which form the rounded contours of the shoulders) and the biceps (which allow bending of the elbow and rotation of the forearm).1 The C5 dermatome covers the outer part of the upper arm down to about the elbow.</p>
                <p><strong>C6</strong> C6 helps control the wrist extensors (muscles that control wrist extension) and also provides some innervation to the biceps.1,3 The C6 dermatome covers the thumb side of the hand and forearm.</p>

                `
                break;
            case 'c6':
                notes.innerHTML = "<p>C6-C7: Mild disc osteophyte complex mildly eccentric to the right without cord impingement or focal soft disc protrusion/herniation. Mild central and right lateral recess stenosis. Mild foraminal narrowing.</p>"
                break;
            case 'c7':
                notes.innerHTML = "<p>C7-T1: No significant disc bulging or focal soft disc protrusion/herniation. No central or lateral recess stenosis. No foraminal narrowing.</p>"
                break;
        }


    })

})