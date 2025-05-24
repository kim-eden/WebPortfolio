history.scrollRestoration = "manual";

var array_logo = new Array(
    "Ansys","APL","Arcticwolf","Blender","Castore",
    "CDW","Claro","DMG","Hard","Heineken",
    "Hexagon","Honda","HP","Intermx","Mobil",
    "Mobil1oil","Newera","Oracle","Patron","Pirelli",
    "Poly","Rauch","Rokt","Siemens","Suisui",
    "Tagheuer","Telcel","TheGoldStandard","Visa","Ybit",
    "Zoom");
var array_logos = "", array_logo_name;//""를 넣어 문자열을 정해주고 비어있는 부분에 값을 넣어주어야지 undefined가 뜨지 않음, 숫자일시 0으로 정의 하면 안정적이고 확인하기 편함.
for(i=0; i<array_logo.length; i++){
    array_logo_name = array_logo[i],
    array_logos += "<img src='img/bi_"+array_logo_name+".svg'>";
}
$(".v_con.slide_con li").css({width: array_logo.length*2*200});
$(".v_con.slide_con li").eq(0).html(array_logos+array_logos);
$(".v_con.slide_con li").eq(1).html(array_logos+array_logos);
array_logos = "";
for(i=array_logo.length-1; i>=0; i--){
    array_logo_name = array_logo[i],
    array_logos += "<img src='img/bi_"+array_logo_name+".svg'>";
}
$(".v_con.slide_con li").eq(2).html(array_logos+array_logos);




var one_p_six;
function resize(){
    one_p_six = $(".panels li").eq(0).width();
}
window.onresize = resize;
$(window).load(function(){
    resize();
});
$(function(){
    $(".panels li").each(function(){
        var $this = $(this);
        $this.hover(function(){
            $this.addClass("hover");
        },function(){
            setTimeout(function(){
                $this.removeClass("hover");
            }, 250);
        });
        $this.click(function(){
            $(this).addClass("on").find("div.panel").css({width: $(window).width(), marginLeft: $this.index() * one_p_six * -1});
        });
    });
    $(document).on("click",".panels li div.panel .btn_close", function(){
        $(".panels li").removeClass("on").find("div.panel").attr("style","");
    });
});
