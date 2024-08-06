document.addEventListener('DOMContentLoaded', () => {
    const elementsToSlideRight = document.querySelectorAll('.slide-right');
    const elementsToSlideLeft = document.querySelectorAll('.slide-left');
    const bannerImage = document.querySelector('.banner-image img');

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        elementsToSlideRight.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            if (scrollTop + windowHeight > elementTop) {
                element.classList.add('visible');
            }
        });

        elementsToSlideLeft.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollTop;
            if (scrollTop + windowHeight > elementTop) {
                element.classList.add('visible');
            }
        });

        if (bannerImage) {
            const bannerTop = bannerImage.getBoundingClientRect().top + scrollTop;
            if (scrollTop + windowHeight > bannerTop) {
                bannerImage.classList.add('visible');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top + scrollTop;
            const itemHeight = item.offsetHeight;
            
            // Check if the item is in the viewport
            if (scrollTop + windowHeight > itemTop + (itemHeight / 4)) {
                item.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
});

