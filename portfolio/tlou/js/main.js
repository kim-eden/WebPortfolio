history.scrollRestoration = "manual";
var w, h;
//전역 변수 : 코드내 그 어디서든 사용가능. 중복 선언 불가
function resize(){
    //지역 변수 : 포함되어 있는 대괄호 내에서만 사용가능. 대괄호 밖에서 재선언 가능
    w = $(window).width();
    h = $(window).height();
}
window.onresize = resize;

var position_pllx_bg_top,
    position_pllx_bg_left,
    position_pllx_m_top,
    position_pllx_m_left,
    position_pllx_w_top,
    position_pllx_w_left;
    
$(function(){
    resize();
    $("#visual").mousemove(function(event){
        var x = event.pageX,
            y = event.pageY;
        $(".mouse_x b").text(x);
        $(".mouse_y b").text(y);
        //마우스 좌표 추출

        //마우스 직접 따라다님

        position_pllx_bg_top  = h/2 - $(".pllx_01").height()/2 + (h/2-y) * -0.0025;
        position_pllx_bg_left = w/2 - $(".pllx_01").width()/2 + (w/2-x) * -0.0025;
        
        position_pllx_m_top  = h/2 - $(".pllx_01").height()/2 + (h/2-y) * -0.01 + 200;
        position_pllx_m_left = w/2 - $(".pllx_01").width()/2 + (w/2-x) * -0.01;

        position_pllx_w_top  = h/2 - $(".pllx_02").height()/2 + (h/2-y) * -0.0175 + 200;
        position_pllx_w_left = w/2 - $(".pllx_02").width()/2 + (w/2-x) * -0.0175;

        $(".pllx_00").css({top: position_pllx_bg_top, left: position_pllx_bg_left});
        $(".pllx_01").css({top: position_pllx_m_top, left: position_pllx_m_left});
        $(".pllx_02").css({top: position_pllx_w_top, left: position_pllx_w_left});
    });
});