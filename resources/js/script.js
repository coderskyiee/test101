$(document).ready(function(){
var carousel = $(".carousel").waterwheelCarousel({
flankingItems: 1,
forcedImageWidth:'720px',
forcedImageHeight:'400px',
separation:422
});
$('#prev').bind('click',function(){
carousel.prev();
return false;
});
$('#next').bind('click',function(){
carousel.next();
return false;
});
});