history.scrollRestoration = "manual";

 window.addEventListener('resize', function() {
    resize();
 });

const resize = () => {
    w_w = window.innerWidth;
    if(w_w > 1000) {
        document.body.classList.remove('open_nav');
    }
};

