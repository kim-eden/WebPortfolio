function show_whatever(el, current_scroll, wh){ 
    var el_offset_t = el.offset().top;
    //el의 y축 위치(최상단으로 부터 몇px(y축) 떨어져 있는지)추출
    if(current_scroll > el_offset_t - (wh * .66)){
        //현재 스크롤 위치가 el의 위치보다 크면 하위 실행
        el.parent().removeClass("wait_scroll");
        el.remove();
    }
}
var wh;
function scroll_effect(sc_y){
    if(sc_y > 0){
        $("#header").addClass("scrolled");
    }else{
        $("#header").removeClass("scrolled");
    }
    //scroll_effect라는 함수에 (sc_y=현재 스크롤 값)라는 값을 받아와서 실행
    wh =  $(window).height();
    //wh 변수에 창(브라우저) 높이 넣음
    $(".show_trigger").each(function(){
        //show_trigger클래스를 가진 태그들 각각 제어
        show_whatever($(this), sc_y, wh);
        //show_whatever함수에 (각각요소, 현재 스크롤 값, 창 높이)넣어서 실행
    });
}
let ticking = false;
//let 으로 선언된 변수는 업데이트는 가능, 재선언 불가
document.addEventListener('scroll', function(e) {
    //페이지(문서)내에서 스크롤이되면 이 안쪽 실행
    if (!ticking) {
        window.requestAnimationFrame(function() {
            scroll_effect(window.scrollY);
            //scroll_effect함수에 (현재 스크롤 값)을 넣어서 실행
            ticking = false;
        });
        ticking = true;
    }
});