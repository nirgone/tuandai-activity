(function() {
	FastClick.attach(document.body);
	var mySwiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
	});
	//视频播放	
	$(function() {
		$('#img_a').live('click', function() {
			showVideo('video_a', 'XMTg2MjIxNzUwOA==');
			$('#video_b').html('<img id="img_b" src="../images/index_video1.png" />');
			console.log('video_a');
		});


		$('#img_b').live('click', function() {
			showVideo('video_b', 'XMTc3MDY0NDkxMg==');
			console.log('video_b');
			$('#video_a').html('<img id="img_a" src="../images/index_video1.png" />');
		});

	});

	function showVideo(domid, vid) {
		player = new YKU.Player(domid, {
			client_id: '52b3fa57e9fe17cf',
			vid: vid,
			show_related: false,
			autoplay: true
		});
	}
})();
