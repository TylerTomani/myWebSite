document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('#mainImgContainer > img');
    const imageCollections = {
        vertebralColumn: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Illu_vertebral_column.svg/500px-Illu_vertebral_column.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/718_Vertebra-en.svg/1000px-718_Vertebra-en.svg.png"
        ],
        cervicalSpine: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Cervical_vertebrae_lateral2.png/500px-Cervical_vertebrae_lateral2.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Cervical_vertebrae_animation_small.gif/240px-Cervical_vertebrae_animation_small.gif",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cervical_vertebrae_-_close-up_-_animation2.gif/240px-Cervical_vertebrae_-_close-up_-_animation2.gif"
        ],
        cranialBones: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Human_skull_side_simplified_%28bones%29.svg/700px-Human_skull_side_simplified_%28bones%29.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sobo_1909_38.png/360px-Sobo_1909_38.png"
        ],
        ethmoid: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Rotation_ethmoid.gif/500px-Rotation_ethmoid.gif",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Gray149.png/240px-Gray149.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Gray151.png/240px-Gray151.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Gray152.png/240px-Gray152.png"
        ],
        frontal: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Frontal_bone_lateral3.png/500px-Frontal_bone_lateral3.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Frontal_bone_-_animation_02.gif/500px-Frontal_bone_-_animation_02.gif",
        ],
        occipital:[
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Occipital_bone_lateral2.png/500px-Occipital_bone_lateral2.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Occipital_bone_-_animation_02.gif/500px-Occipital_bone_-_animation_02.gif"
        ],
        parietal:[
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Parietal_bone_posterior2.png/500px-Parietal_bone_posterior2.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Left_parietal_boen_-_animation.gif/360px-Left_parietal_boen_-_animation.gif"
        ],
        sphenoid: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Sphenoid_bone_-_lateral_view.png/600px-Sphenoid_bone_-_lateral_view.png",
            "https://upload.wikimedia.org/wikipedia/commons/9/97/Sphenoid_bone_-_animation_02.gif",
        ],
        temporal: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Temporal_bone_lateral5.png/500px-Temporal_bone_lateral5.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Temporal_bone_-_animation_02.gif/500px-Temporal_bone_-_animation_02.gif"
        ],
        c1: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/C1_lateral.png/500px-C1_lateral.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Atlas_%28C1%29_from_top_animation_small.gif/240px-Atlas_%28C1%29_from_top_animation_small.gif",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Gray86.png/440px-Gray86.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gray308.png/440px-Gray308.png"
        ],
        c2: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/C2_lateral.png/500px-C2_lateral.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/C2_from_top_animation_small.gif/240px-C2_from_top_animation_small.gif",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Axis_vertebrae.jpg/440px-Axis_vertebrae.jpg"
        ],
        c3: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cervical_vertebrae_-_close-up_-_animation2.gif/240px-Cervical_vertebrae_-_close-up_-_animation2.gif",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Cervical_vertebra_english.png/500px-Cervical_vertebra_english.png",
            "https://upload.wikimedia.org/wikipedia/commons/5/52/Gray85.png"

        ],
        c4: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Cervical_vertebra_english.png/500px-Cervical_vertebra_english.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cervical_vertebrae_-_close-up_-_animation2.gif/240px-Cervical_vertebrae_-_close-up_-_animation2.gif",
            "https://upload.wikimedia.org/wikipedia/commons/5/52/Gray85.png"
        ],
        c5: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Cervical_vertebra_english.png/500px-Cervical_vertebra_english.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cervical_vertebrae_-_close-up_-_animation2.gif/240px-Cervical_vertebrae_-_close-up_-_animation2.gif",
            "https://upload.wikimedia.org/wikipedia/commons/5/52/Gray85.png"
        ],
        c5Nerve: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/PLEXUS_BRACHIALIS.jpg/500px-PLEXUS_BRACHIALIS.jpg"
        ],
        c6: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Cervical_vertebra_english.png/500px-Cervical_vertebra_english.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cervical_vertebrae_-_close-up_-_animation2.gif/240px-Cervical_vertebrae_-_close-up_-_animation2.gif",
            "https://upload.wikimedia.org/wikipedia/commons/5/52/Gray85.png"
        ],
        c7: [
            "https://upload.wikimedia.org/wikipedia/commons/c/c2/C7_animation_small.gif",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Cervical_Spine_Anterior_View.png/240px-Cervical_Spine_Anterior_View.png"
        ],
        nervousSystem: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/TE-Nervous_system_diagram.svg/500px-TE-Nervous_system_diagram.svg.png"
        ]
    };
    let currentImages = imageCollections['cranialBones'];
    let currentIndex = 0;

    let startX;

    // Function to update image
    const updateImage = () => {
        img.src = currentImages[currentIndex];
    };

    // Touch events for swipe functionality
    img.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    img.addEventListener('touchend', (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            // Swiped left, go to next image
            currentIndex = (currentIndex + 1) % currentImages.length;
        } else if (startX < endX - 50) {
            // Swiped right, go to previous image
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        }
        updateImage();
    });

    // Click events for desktop functionality
    img.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click event from bubbling up
        e.preventDefault(); // Prevent any default action
        
        const imageWidth = img.clientWidth;
        const clickX = e.clientX - img.getBoundingClientRect().left;

        if (clickX > imageWidth / 2) {
            // Clicked right side, go to next image
            currentIndex = (currentIndex + 1) % currentImages.length;
        } else {
            // Clicked left side, go to previous image
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        }
        updateImage();
    });
    img.addEventListener('keydown', e => {
        let key = e.keyCode
        console.log(key)
        if(key == 39){
            currentIndex = (currentIndex + 1) % currentImages.length;
        }
        if(key == 37){
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        }
        if(key == 13){
            currentIndex = (currentIndex + 1) % currentImages.length;
        }
        updateImage()
    })
    // Event listeners for elements to switch image collections
    const elements = document.querySelectorAll('a.drop, .group-items a, .sub-group-items a');
    elements.forEach(element => {
        element.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default navigation action
            
            const id = element.id;
            if (imageCollections[id]) {
                currentImages = imageCollections[id];
                currentIndex = 0;
                updateImage();
            }
        });
    });
});
