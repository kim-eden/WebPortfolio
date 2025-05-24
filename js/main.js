history.scrollRestoration = "manual";

document.addEventListener('DOMContentLoaded', () => {
    // nav segment move

    const navLists = document.querySelectorAll('.nav_lnb li');
    const navSegment = document.querySelector('.nav_segment');
    const sections = document.querySelectorAll('.sections');
    window.addEventListener('scroll', () => {
        let currentSectionIndex = -1;
        sections.forEach((section, idx) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if(window.scrollY >= sections[1].offsetHeight) {
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSectionIndex = idx;
                }
            } else {
                currentSectionIndex = 0;
            }
        });
        if(currentSectionIndex !== -1 && currentSectionIndex !== 0) {
            const currentNavList = navLists[currentSectionIndex - 1];
            const navOffsetLeft = currentNavList.offsetLeft;
            const navWidth = currentNavList.offsetWidth;

            navSegment.style.left = `${navOffsetLeft + (navWidth / 2) - 39}px`;
            navSegment.style.width = `6px`;
        } else {
            navSegment.style.left = '20px';
            navSegment.style.width = `6px`;
        }
    });
});