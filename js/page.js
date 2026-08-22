$(function(){
    subjectTab();
    subjectSwipe();
    subjArrow();
    randomTab();
    autoTab();
});
var autoSwipe;
function randomTab(){
    var total = $(".subj [data-tab]").length;
    if(total > 0){
        var randomNum = Math.floor(Math.random() * total);
        changeTab(randomNum);
    }
}
function autoTab(){
    clearInterval(autoSwipe);
    autoSwipe = setInterval(function(){
        nextTab();
    }, 3000);
}
function stopTab(){
    clearInterval(autoSwipe);
}
function subjectTab(){
    $(".subj li").on("click", "[data-tab]", function(){
        var tabId=$(this).data("tab");
        var tabGroup=$(".tabs");
        var current=tabGroup.find(".active");
        var next=tabGroup.find("#"+tabId);
        if (next[0] === current [0]) return;
        $(".subj [data-tab]").removeClass("active");
        $(this).addClass("active");
        current.removeClass("active");
        next.addClass("active");
        autoTab();
    });
}
function subjectSwipe(){
    var start = 0;
    var end = 0;
    $(".tabs").on("touchstart", function(e){
        start = e.originalEvent.touches[0].clientX;
        stopTab();
    });
    $(".tabs").on("touchend", function(e){
        end = e.originalEvent.changedTouches[0].clientX;
        var distance = end - start;
        if(Math.abs(distance) < 50){
            autoTab();
            return;
        }if(distance < 0){
            nextTab();
        }else{
            prevTab();
        }
    });
}
function nextTab(){
    var current = $(".subj [data-tab].active").parent().index();
    var total = $(".subj [data-tab]").length;
    if(current >= total - 1){
        changeTab(0);
        return;
    }
    changeTab(current + 1);
}
function prevTab(){
    var current = $(".subj [data-tab].active").parent().index();
    var total = $(".subj [data-tab]").length;
    if(current <= 0){
        changeTab(total - 1);
        return;
    }
    changeTab(current - 1);
}
function changeTab(index){
    var buttons = $(".subj [data-tab]");
    var contents = $(".tabs .tabcontent > li");
    buttons.removeClass("active");
    contents.removeClass("active");
    buttons.eq(index).addClass("active");
    contents.eq(index).addClass("active");
    autoTab();
}
function subjArrow(){
    $(".next").on("click", function(){
        nextTab();
    });
    $(".prev").on("click", function(){
        prevTab();
    });
}