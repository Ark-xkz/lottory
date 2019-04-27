var square = $('.square');

$(document).on('mousemove',function(e) {
	square.each(function(i, obj){
  var vx = (e.pageX - obj.offsetLeft - 90)/10;
  var vy = -(e.pageY - obj.offsetTop -90)/20; 
  $(obj).attr('style', 'transform: rotateY(' + vx + 'deg) rotateX(' + vy + 'deg);-webkit-transform: rotateY(' + vx + 'deg) rotateX(' + vy + 'deg);-moz-transform: rotateY(' + vx + 'deg) rotateX(' + vy + 'deg)');  
  });
});