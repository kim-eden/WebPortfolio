var portfolio_list = [
    ["인덱스(순서번호)","구분","제목","고객","완료시기","도구","범위","링크","이미지 갯수"],
    ["1","Graphic Design","Bebe De Pino","-","2024","Adobe Photoshop","Web Deisgn","","1"],
    ["2","Graphic Design","Casio","-","2024","Adobe Photoshop","Web Deisgn","","1"],
    ["3","Graphic Design","Ping Golf","-","2024","Adobe Photoshop","Web Deisgn","","1"],
    ["4","Graphic Design","Xexymix","-","2024","Adobe Photoshop","Web Deisgn","","2"],
    ["5","Graphic Design","Netflix","-","2024","Adobe Photoshop","Card News","","4"],
    ["6","Graphic Design","Longchamp","-","2024","Adobe Photoshop","Logo Design","","1"],
    ["7","Graphic Design","Tom Ford","-","2024","Adobe Photoshop","Box Design","","1"],
    ["8","Graphic Design","Tim Hortons","-","2024","Adobe Photoshop","Cup Design","","1"],
    ["9","Graphic Design","Top Gun: Maverick","-","2024","Adobe Photoshop","Movie Poster","","2"],
    ["10","Graphic Design","3D Text","-","2024","Adobe Photoshop","Typography","","1"],
    ["11","Graphic Design","Sprite","-","2024","Adobe Photoshop","Banner","","2"],
    ["12","Graphic Design","Mall","-","2024","Adobe Photoshop","Banner","","1"]
];


$(function(){
    $(".open_popup").each(function(){
        $(this).click(function(){
            var p_no = $(this).attr("data-p-no");
            var $p_con = $(".popup_con");
            $p_con.find(".category").html(portfolio_list[p_no][1]);
            $p_con.find(".title").html(portfolio_list[p_no][2]);
            $p_con.find(".client").html(portfolio_list[p_no][3]);
            $p_con.find(".completed").html(portfolio_list[p_no][4]);
            $p_con.find(".tools").html(portfolio_list[p_no][5]);
            $p_con.find(".scope").html(portfolio_list[p_no][6]);

            var p_image_list = "";
            for(i=1; i<=portfolio_list[p_no][8]; i++){
                p_image_list += '<img src="portfolio/gallery/'+p_no+'/'+i+'.jpg">';
            }
            $p_con.find(".image_con").html(p_image_list);

            $("html").addClass("show_popup");
            $(".popup_con").scrollTop(0);
        });
    });
    $(".popup_con, a.btn.btn_popup_close").click(function(e){
        if(!$(e.target).hasClass("cells") && $(e.target).parents(".cells").length < 1){/*
            !$(e.target).hasClass("cells")
            *e.target = 지금 누른 엘리먼트
            *지금 누른 엘리먼트의 클래스가 cells가 !아닐경우
            
            $(e.target).parents(".cells").length < 1
            *e.target = 지금 누른 엘리먼트
            *$(".a").text().length; < 글자 갯수 추출
            *$(".a").length; < 엘리먼트 갯수 추출
            *지금 누른 엘리먼트의 부모들 중 cells가 존재하지 않을 경우
            */
            $("html").removeClass("show_popup");
        }
    });
    $(document).keydown(function(e){
        if(e.keyCode == 27){//27 => ESC 키코드값
            $("html").removeClass("show_popup");
        }
    });
});