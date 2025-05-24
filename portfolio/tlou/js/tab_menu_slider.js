
function move_slider(a){
    var $this_w = a.width(),
        $this_h = a.height(),
        $this_l = a.position().left;
    a.parents(".tab_menu").find(".slider").width($this_w).height($this_h).css({left: $this_l});
}     
$(window).load(function(){
    $(".tab_menu").each(function(){
        move_slider($(this).children("ul.tab_btn").children("li").eq(0));
    });
});
$(function(){
    $(".tab_menu > ul.tab_btn > li").each(function(){
        $(this).click(function(){
            if(!$(this).hasClass("selected")){ 
                var $this = $(this),
                    $this_index = $this.index();
                $this.parents(".tab_menu").children("ul.tab_btn").children("li").removeClass("selected").eq($this_index).addClass("selected");
                $this.parents(".tab_menu").children("ul.tab_content").children("li").removeClass("selected").eq($this_index).addClass("selected");
                var total_length = $this.parents(".tab_menu").children("ul.tab_btn").children("li").length-1;
                for(i=1; i<=total_length; i++){
                    $this.parents(".tab_menu").removeClass("cate_"+i);
                }
                $this.parents(".tab_menu").addClass("cate_"+($this_index+1));
                move_slider($this);
            }
        });
    });
});