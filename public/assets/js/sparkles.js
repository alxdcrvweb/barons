//@ts-ignore


$(".header__resource").sparkle({
    "count": 20, 
    "color": ["#ff910f","#ff910f","#ff3c00"], 
    "minSize": 3,
    "maxSize": 5,
    "overlap": 5,
    "direction": "both",
    "speed": 2, 
    "fadeSpeed": 300,
    "event": "hover"
});
$(".header__resource").mouseenter(function(){
    $(this).find('.sparkle-canvas').css('opacity', '1');
    setTimeout(() => { 
        $(this).find('.sparkle-canvas').css('opacity', '0');
    }, 500);
});
//@ts-ignore
$(".header__claim").sparkle({
    "count": 20,
    "color": ["#ff910f","#ff910f","#ff3c00"],
    "minSize": 3, 
    "maxSize": 5, 
    "overlap": 5, 
    "direction": "both", 
    "speed": 1,
    "fadeSpeed": 300,
    "event": "none"
});