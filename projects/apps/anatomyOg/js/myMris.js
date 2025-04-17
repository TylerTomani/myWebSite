document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('#axialImg');
    const imageCollections = {
        c1: [
            "myMris/cervicalSpine/axial/c1/c1-1.jpeg",
            "myMris/cervicalSpine/axial/c1/c1-2.jpeg",
            "myMris/cervicalSpine/axial/c1/c1-3.jpeg",
            "myMris/cervicalSpine/axial/c1/c1-4.jpeg"
        ],
        c2: [
            "myMris/cervicalSpine/axial/c2/c2-1.jpeg",
            "myMris/cervicalSpine/axial/c2/c2-2.jpeg",
            "myMris/cervicalSpine/axial/c2/c2-3.jpeg",
            "myMris/cervicalSpine/axial/c2/c2-4.jpeg"
        ],
        c3: [
            "myMris/cervicalSpine/axial/c3/c3-1.jpeg",
            "myMris/cervicalSpine/axial/c3/c3-2.jpeg",
            "myMris/cervicalSpine/axial/c3/c3-3.jpeg",
            "myMris/cervicalSpine/axial/c3/c3-4.jpeg"

        ],
        c4: [
            "myMris/cervicalSpine/axial/c4/c4-1.jpeg",
            "myMris/cervicalSpine/axial/c4/c4-2.jpeg",
            "myMris/cervicalSpine/axial/c4/c4-3.jpeg",
            "myMris/cervicalSpine/axial/c4/c4-4.jpeg"
        ],
        c5: [
            "myMris/cervicalSpine/axial/c5/c5-1.jpeg",
            "myMris/cervicalSpine/axial/c5/c5-2.jpeg",
            "myMris/cervicalSpine/axial/c5/c5-3.jpeg",
            "myMris/cervicalSpine/axial/c5/c5-4.jpeg"
        ],
        c5Nerve: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/PLEXUS_BRACHIALIS.jpg/500px-PLEXUS_BRACHIALIS.jpg",
            // "myMris/cervicalSpine/axial/c5/c5-2.jpeg",
            // "myMris/cervicalSpine/axial/c5/c5-3.jpeg",
            // "myMris/cervicalSpine/axial/c5/c5-4.jpeg"
        ],
        c6: [
            "myMris/cervicalSpine/axial/c6/c6-1.jpeg",
            "myMris/cervicalSpine/axial/c6/c6-2.jpeg",
            "myMris/cervicalSpine/axial/c6/c6-3.jpeg",
            "myMris/cervicalSpine/axial/c6/c6-4.jpeg"
        ],
        c7: [
            "myMris/cervicalSpine/axial/c7/c7-1.jpeg",
            "myMris/cervicalSpine/axial/c7/c7-2.jpeg",
            "myMris/cervicalSpine/axial/c7/c7-3.jpeg",
            "myMris/cervicalSpine/axial/c7/c7-4.jpeg"
        ]
    };
    let currentImages = imageCollections['c1'];
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



