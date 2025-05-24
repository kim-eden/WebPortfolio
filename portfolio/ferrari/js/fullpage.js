history.scrollRestoration = "manual";

//카운터
/*핵심 코드------------------------------*/
(function($) {
	$.fn.Simple_Counter = function( options ) {
	    let settings = $.extend({
	        start:  0,
	        end:    100,
	        easing: 'swing',
	        duration: 400,
	        delay: 0,
	        complete: ''
	    }, options );

	    const thisElement = $(this);

        setTimeout(function(){
            $({count: settings.start}).animate({count: settings.end}, {
                duration: settings.duration,
                easing: settings.easing,
                step: function() {
                    let mathCount = Math.ceil(this.count);
                    thisElement.text(mathCount);
                },
                complete: settings.complete
            });
        }, settings.delay);
	};
}(jQuery));
/*------------------------------핵심 코드*/
function counter_start(c_speed){
    $('.s_counter').each(function(){
        $this = $(this);
        if(!$this.hasClass("done")){
            /*핵심 코드------------------------------*/
            $this.Simple_Counter({
                end: $this.text().replace(/[^0-9]/g, ""),
                duration: 2000,
                easing: "easeOutCubic",
                delay: c_speed//미리 적혀있는 변환 시간 끌어다씀
            });
            /*------------------------------핵심 코드*/
            $this.addClass("done");
        }
    });
}

//화면전환시 애니메이션을 위한 각 섹션별 hide클래스 제거
function remove_hide(i){
    $(".fullsection.full"+i).removeClass("hide");
}

var change_speed = 750;
var release_times, times;

// 사이드 퀵버튼 클릭 이동
function moving_sections(gnbindex, length){ //화면전환 중에 다른 화면 전환 불가
    // 퀵 메뉴의 marginTop을 조정하여 해당 버튼이 보이도록 위치 변경
    $(".quick").animate({marginTop: $(".quick").height()/2 - ($(".quick li").outerHeight(true) * gnbindex)}, change_speed);

    // 퀵버튼의 상태 변경 (현재 클릭된 버튼에 'on' 클래스 추가)
    $(".quick li").removeClass("on").eq(gnbindex).addClass("on");

    // 네비게이션 메뉴에서 해당 페이지에 'on' 클래스 추가
    $("ul.nav li").removeClass("on").eq(gnbindex).addClass("on");

    // fullpage의 top 위치를 애니메이션으로 변경하여 해당 섹션으로 이동
    $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");

    // 페이지 번호 업데이트
    $(".pagination b").text(gnbindex + 1);

    // 해당 섹션의 hide 클래스 제거 (해당 섹션이 보이도록 함)
    remove_hide(gnbindex + 1);
}

function quickClick(){
    // 퀵 메뉴 항목 클릭 시
    $(".quick li, ul.nav li").click(function(){
        var gnbindex = $(this).index(); // 클릭한 항목의 인덱스
        var length = 0;

        // 클릭한 항목까지의 전체 섹션 높이를 합산하여 화면 전환 위치를 계산
        for(var i = 1; i < (gnbindex + 1); i++){
            length += $(".full"+i).height();
        }

        // 화면 전환이 진행 중일 경우 추가 전환 방지
        moving_sections(gnbindex, length);

        // 퀵 버튼이 보이도록 설정 (애니메이션 후)
        $(".quick li").css({"visibility": 'visible'});

        return false;
    }).mousedown(function(){
        // 퀵 버튼 클릭 시 quick_inner를 숨김
        $(".quick_inner").css({ opacity: 0});
    }).mouseup(function(){
        // 클릭 후 일정 시간 뒤 quick_inner를 다시 보이게 함
        setTimeout(function(){
            $(".quick_inner").css({ opacity: 1});
        }, change_speed);
    });
}

function fullset(){
    var pageindex = $("#fullpage > .fullsection").length; //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
    $(".pagination span").text(pageindex);

    // 퀵 메뉴에 각 섹션에 대한 항목을 생성 (섹션 수 만큼)
    for(var i = 1; i <= pageindex; i++){
        $("#fullpage > .quick > ul").append("<li></li>"); //왼쪽 도트 생성
    }

    $(".fullsection").each(function(n){ // 좌우 수평 도트생성
        var subcon_index = $(this).find(".full_sub").length; // 페이지 갯수 찾기
        for(var i = 0; i < subcon_index; i++){
            $(".fullsection").eq(n).find(".quick_inner").find("ul").append("<li></li>"); // 페이지 .full_sub 갯수만큼 .fullsection 안에 .quick_inner에 li추가
        }
    });

    $(".quick").css({marginTop: $(".quick").height()/2}); // 퀵 메뉴 중앙에 배치
    $("#fullpage .quick ul li:first-child, #header ul.nav li:first-child").addClass("on"); // 로드 시 첫 번째 섹션과 퀵버튼, 네비에 'on' 클래스 추가

    function moving_page(){
        clearTimeout(times);
        times = setTimeout(function(){
            $("body").removeClass("locked");
            $(".quick_inner").css({ opacity: 1}); // quick_inner를 보이게 함
        }, change_speed);

        $(".quick li").css({"visibility": 'visible'}); // 퀵 메뉴 항목 보이도록 설정
        $(".quick_inner").css({ opacity: 0}); // quick_inner를 숨김

        if(!$("body").hasClass("locked")){ // locked 클래스가 없는 경우에만 동작
            $("body").addClass("locked");

            var page = $(".quick ul li.on"); // 현재 보이는 페이지 찾기

            // fullpage 애니메이션 중일 때 추가 전환 방지
            if($("body").find("#fullpage:animated").length >= 1){
                return false;
            }

            if (event.wheelDelta > 0 || event.detail < 0) { // 마우스 휠을 위로
                var before = page.index();
                var pagelength = 0;
                for(var i = 1; i < (before); i++){
                    pagelength += $(".full"+i).height();
                }
                if(page.index() > 0){ // 첫번째 페이지가 아닐 때
                    page = page.index() - 1;
                    moving_sections(page, pagelength);
                } else {
                    // alert("첫번째 섹션 입니다.");
                }
            } else { // 마우스 휠을 아래로
                var nextPage = parseInt(page.index() + 1); // 다음 페이지 번호
                var lastPageNum = parseInt($(".quick ul li").length); // 마지막 페이지 번호

                // 마지막 페이지가 아닐 때만 애니메이션 진행
                if(nextPage < lastPageNum){
                    var pagelength = 0;
                    for(var i = 1; i < (nextPage + 1); i++){
                        pagelength += $(".full"+i).height();
                    }
                    moving_sections(nextPage, pagelength);
                } else { // 마지막 페이지일 때
                    // alert("마지막 섹션 입니다!");
                }
            }
        } else {
            return false;
        }

        clearTimeout(release_times);
        release_times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
    }

    // 마우스 휠 이벤트 리스너
    window.addEventListener("mousewheel", moving_page, { passive: false });
    window.addEventListener("DOMMouseScroll", moving_page, { passive: false });

    // 윈도우 크기 조정 시 위치 수정
    $(window).resize(function(){
        var resizeindex = $(".quick ul li.on").index() + 1;
        var pagelength = 0;
        for(var i = 1; i < resizeindex; i++){
            pagelength += $(".full"+i).height();
        }
        $("#fullpage").stop().animate({"top": -pagelength + "px"}, 0);
        full_sub_resize(); // full_sub 크기 조정
    });
}

function full_sub_inner(){
    $(".quick_inner").css({"margin-left": - $(".quick_inner li").outerWidth()}); // .quick_inner ul이 통으로 li의 너비만큼 이동
    $("#fullpage .fullsection .quick_inner li:first-child").addClass("on");

    $(".quick_inner li").click(function(){ // 도트 클릭 시
        var subindex = $(this).index() + 1; // subindex 변수에 현재 인덱스번호 + 1을 넣음
        var length = 0; // 길이 계산

        for(var i = 1; i < subindex; i++){
            length += $(".fullsection").width(); // 전체 섹션의 가로길이
        }

        var quick_w = $(this).outerWidth(); // quick_w에 도트 하나의 너비를 넣음
        for(var i = 2; i < subindex + 1; i++){
            quick_w += $(this).outerWidth(true); // 도트 하나의 너비를 누적
        }

        $(this).parents(".fullsection").find(".full_sub_con").stop().animate({"left": -length + "px"}, change_speed).attr("data-index", subindex); // 해당 섹션 내에서 서브 컨텐츠 이동
        $(this).parents(".quick_inner").stop().animate({"margin-left": -quick_w + "px"}, change_speed); // .quick_inner의 li 이동

        $(this).parents("ul").find("li").removeClass("on").eq(subindex - 1).addClass("on"); // 클릭한 도트에 'on' 클래스 추가
        var quickindex = $(this).parents(".fullsection").index(); // 클릭한 섹션 인덱스

        $(".quick li").css({"visibility": 'visible'}).eq(quickindex).css({"visibility": 'hidden'}); // 섹션에 해당하는 퀵버튼 숨기기
        $(this).parents(".fullsection").find(".full_sub").eq(subindex - 1).removeClass("hide"); // 선택된 서브 페이지에 hide 클래스 제거


        // 왼쪽, 오른쪽 버튼 상태 조정
        var $parents_full = $(this).parents(".fullsection");

        if(subindex == 1){
            $parents_full.find(".btn_left").addClass("disable"); // 첫 페이지일 때 왼쪽 버튼 비활성화
            $parents_full.find(".btn_right").removeClass("disable"); // 오른쪽 버튼 활성화
        } else if(subindex == $(this).parent("ul").find("li").length){
            $parents_full.find(".btn_left").removeClass("disable"); // 마지막 페이지일 때 왼쪽 버튼 활성화
            $parents_full.find(".btn_right").addClass("disable"); // 오른쪽 버튼 비활성화
        } else {
            $parents_full.find(".btn_left").removeClass("disable"); // 중간 페이지일 때 왼쪽, 오른쪽 버튼 모두 활성화
            $parents_full.find(".btn_right").removeClass("disable");
        }
    });
}

var prnts_w, prnts_h;
function full_sub_resize(){
    $(".full_sub").each(function(){
        prnts_w = $(this).parents(".fullsection").width();
        prnts_h = $(this).parents(".fullsection").height();
        $(this).css({width: prnts_w, height: prnts_h});
    });
    $(".full_sub_con").each(function(){
        $(this).width(prnts_w * $(this).find(".full_sub").length);
    });
}

function full_sub_sizing(){
    full_sub_resize();
    full_sub_inner(); // 서브 페이지 기능
    $(".btn_left, .btn_right").each(function(){
        if($(this).hasClass("btn_left")){
            $(this).addClass("disable"); // 왼쪽 버튼 비활성화
        }

        $(this).click(function(){
            var sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
            var move_w = prnts_w;

            if($(this).hasClass("btn_left")){
                if(sub_counter > 1){
                    sub_counter -= 1;
                    if(sub_counter == 1){
                        $(this).addClass("disable"); // 첫 번째 페이지일 때 왼쪽 버튼 비활성화
                    }
                } else {
                    // alert("첫 페이지 입니다");
                }
                $(this).parent().find(".btn_right").removeClass("disable");
            } else {
                $(this).parent().find(".btn_left").removeClass("disable");
                if(sub_counter < $(this).parents(".fullsection").find(".full_sub").length){
                    sub_counter += 1;
                    if(sub_counter == $(this).parents(".fullsection").find(".full_sub").length){
                        $(this).addClass("disable"); // 마지막 페이지일 때 오른쪽 버튼 비활성화
                    }
                } else {
                    // alert("막 페이지 입니다");
                }
            }

            move_w = move_w * (sub_counter - 1) * -1;
            $(this).parent(".fullsection").find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter).find(".full_sub").eq(sub_counter - 1).removeClass("hide");
            counter_start(change_speed);

            // 퀵 메뉴 위치 이동
            var quick_w = $(this).parent(".fullsection").find(".quick_inner li").outerWidth();
            for(var i = 2; i < sub_counter + 1; i++){
                quick_w += $(this).parent(".fullsection").find(".quick_inner li").eq(sub_counter - 1).outerWidth(true);
            }
            $(this).parent(".fullsection").find(".quick_inner").stop().animate({"margin-left": -quick_w + "px"}, change_speed);

            var quickindex = $(this).parents(".fullsection").index();
            $(".quick li").css({"visibility": 'visible'}).eq(quickindex).css({"visibility": 'hidden'});
            $(this).parent(".fullsection").find(".quick_inner ul li").removeClass("on").eq(sub_counter - 1).addClass("on");
        });
    });
}

$(function(){
    fullset();
    quickClick();
    full_sub_sizing();
});

$(window).load(function(){
    $("body").removeClass("locked"); // 페이지 로드 완료 후 locked 클래스 제거
});

$(function(){
    var $panels = $(".panels li");
    var resizeTimer;
    var one_p_six;

    function resize() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            one_p_six = $panels.eq(0).width();
        }, 100);
    }
    
    $(window).on('resize load', resize);  // 'load' 이벤트와 'resize' 이벤트를 한 번에 처리
    
    // 썸네일 hover 효과 처리
    $panels.hover(
        function() {
            // 'on' 상태가 아닌 경우에만 hover 효과를 적용
            if (!$(this).hasClass('on')) {
                $(this).addClass("hover");
            }
        },
        function() {
            // 'on' 상태가 아닌 경우에만 hover 효과를 해제
            if (!$(this).hasClass('on')) {
                $(this).removeClass("hover");
            }
        }
    );

    // 썸네일 클릭 시
    $panels.click(function() {
        var $this = $(this);
        // 클릭한 썸네일에 'on' 클래스를 추가하고 스타일 적용
        $this.addClass("on").find(".panel").css({
            width: $(window).width(),
            marginLeft: $this.index() * one_p_six * -1
        });
    });

    // 닫기 버튼 클릭 시
    $(document).on("click", ".panels li div.panel .btn_close", function() {
        // 'on' 클래스를 제거하고 스타일 초기화
        $panels.removeClass("on").find(".panel").attr("style", "");
    });
});