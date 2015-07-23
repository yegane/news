$(document).ready(function($) {

	
	
	var count, buttonFooter = 0, fail = true , scrollOfCount = 0 , num_of_theme = 0 , h_h , h_d , w_d , h , all_news   , content  , s , swap , leng , child = 0 , counter = 0 , first = 0 , sum = 0 , startX = 0 , startY = 0 , margin = 0 , resize = true , id=0 , home_page = true , back_button = null , success = false , scroll = true , keyword = new Array() , notification = null , a=1 , b=1 , c=1 , d=1 , move=0 , cla = null , page = new Array() , down = true , str = null ,z = 0 , up = 1 , u = true, menu = true, l=1, flag = true , news = new Array() , help = 0 , allowScroll = true;


	content = $('.content');

	variable = '<div><figure> <div class=about> <p class=title></p> <div class=s-t> <span class=source>  </span> <span class=slash>*</span> <span class=time></span> </div> </div> </figure><div class="details-new" > <h4 class=title></h4> <p class=text-new></p> <span class=base-source> <span class=source>  </span> <span class=slash>*</span> <span class=time></span> </div> </div> </div>';

	var all_of_new = "<div class=all-of-news> <h4 class=title></h4> <div class=source> <span class=base></span> <span class=star></span> <span class=time></span>  </div>  <div class=other-source>  </div> <img class=img-responsive src='' /> <div class=abstrac></div> <div class=text-new></div> </div>";
	back_button = "<button class=back>بازگشت به صفحه قبل</button>";
	
	notification = "<div class='timestamp clearfix'> <div class=clearfix> <input type=checkbox id=a /><label class=title for=a></label> </div> <div class='notifi-time clearfix'> <input type=radio name=slecet id=now /> <label class=now for=now>همین حالا</label> <input type=radio name=slecet id=day /> <label class=day for=day>روزانه</label><input type=radio name=slecet id=week /> <label class=week for=week>هفتگی</label> <input type=radio name=slecet id=month /> <label class=month for=month>ماهانه</label>  </div> </div>";

	h_h = $('header').outerHeight();
	h_d = $(window).height()-h_h;
	w_d = $(window).width();
	h   = $(window).height();
	buttonFooter =  parseInt($('.setting-page footer ').height())+10;

	$('.content , .wrap-page').height(h_d);

	$('.content').css('transform', 'translate3d(0,'+cal()+'px,0)');

	$('.login-page').css('marginTop', cal()-20);
	$('.setting-page , .notification').css('marginTop', cal());
	

	function cal(){
		return h_h;
	}

	function Initialize(){
		removeElement();
		a=1;b=1;c=1;d=1;
		for(var i=1; i<=all_news.length ; i++){
			$('.content').append(variable);
			$('.content > div:nth-child('+l+') figure').css('backgroundImage' , 'url(./'+all_news[i-1].img+')');
			$('.content > div:nth-child('+l+') .details-new h4').text(all_news[i-1].title);
			$('.content > div:nth-child('+l+') .details-new .text-new').text(all_news[i-1].abstrac);
			$('.content > div:nth-child('+l+') .details-new .source').text(all_news[i-1].base_source);
			$('.content > div:nth-child('+l+') .details-new .time').text(all_news[i-1].time_base);
			$('.content > div:nth-child('+l+') figure .about p').text(all_news[i-1].title);
			$('.content > div:nth-child('+l+') figure .s-t .source').text(all_news[i-1].base_source);
			$('.content > div:nth-child('+l+') figure .s-t .time').text(all_news[i-1].time_base);
			l++;
		}

		leng = $('.content > *').length;
		for(var i=1 ; i<=leng ; i++){
			if($('.content > div:nth-child('+i+')').hasClass('new-first')){
				$('.content > div:nth-child('+i+')').removeClass();
			}
			else if($('.content > div:nth-child('+i+')').hasClass('new-second')){
				$('.content > div:nth-child('+i+')').removeClass();
			}
			else if($('.content > div:nth-child('+i+')').hasClass('new-third')){
				$('.content > div:nth-child('+i+')').removeClass();
			}
			else if($('.content > div:nth-child('+i+')').hasClass('new-forth')){
				$('.content > div:nth-child('+i+')').removeClass();
			}
			$('.content > div:nth-child('+i+') figure').removeClass('fig');
			$('.content > div:nth-child('+i+') figure').addClass('normal');
		}

		size();
		addElement();

		for(var t=up ; t>1 ; t--){
			help = t;
			$('.content > div:nth-child('+(help-1)+')').css('display', 'none');
		}

		child = $('.content > *').length;
		for(var w=up ; w<child ; w++){
			help = w;
			$('.content > div:nth-child('+(help+1)+')').css('display', 'none');
		}

		
		$('.content > *').on('tap' , function(e){
			e.preventDefault();
			if($('.left-menu').hasClass('show-left-menu')){
				$('.left-menu').removeClass('show-left-menu');
				setTimeout(function(){
					home_page = true;
				} , 250);
			}

			if(home_page == true){
				$('.details-news').css('transform', 'translate3d(0,'+(cal()+2)+'px,0)');
				$('.loading').css('display', 'block');
				home_page = false;
				$('html').addClass('scroll');
				var tag = e.target.tagName;
				if(tag == 'FIGURE'){
					id = event.target.parentElement.id;
				}
				else{
					id = event.target.parentElement.parentElement.id;
				}
				$('.content').css('display', 'none');
				$('.details-news').append(all_of_new);
				$('.details-news > div').last().attr('id', 'detail-'+id);
				$('.ion-navicon-round').parent().css('display', 'none');
				$('.ion-ios-arrow-thin-left').parent().css('display', 'block');

				$.ajax({
					url: 'http://sdi.cloudware.ir/json.php',
					dataType: 'json',
					cache : true
				})
					.done(function() {
						$('#detail-'+id+' .title').text(news[id-1].title);
						$('#detail-'+id+' .base').text(news[id-1].base_source);
						$('#detail-'+id+' .star').text('*');
						$('#detail-'+id+' .time').text(news[id-1].time_base);
						$('#detail-'+id+' img').attr('src', news[id-1].img);
						$('#detail-'+id+' .abstrac').text(news[id-1].abstrac);
						// if(news[id-1].other_source.length){
						//     for(var i=0 ; i<news[id-1].other_source.length ; i++){
						//    		$('#detail-'+id+ ' .other-source').append("<span id=source"+i+"></span> <span class=star>*</span> <span                                     id=time"+i+"></span>");
						//    		$('#detail-'+id+ ' .other-source #source'+i).text(news[id-1].other_source[id-1].s);
						//    		$('#detail-'+id+ ' .other-source #time'+i).text(news[id-1].other_source[id-1].t);
						//    		if(news[id-1].other_source.length > 1 && i+1<news[id-1].other_source.length){
						//    			$('<span class=slash>/</span>').insertAfter('#detail-'+id+ ' .other-source #time'+i);
						//    		}
						//    	}
						// }
						$('#detail-'+id+' .text-new').addClass('show-border');
						$('#detail-'+id+' .text-new').append(news[id-1].text_new);
						success = true;
					})
					.fail(function() {
						$('.details-news').css('display', 'none');
						$('.loading').css('display' , 'none');
						$('.content').css('transform', 'translate3d(0,'+cal()+'px,0)');
						$(window).scrollTop(0);
						$('html').removeClass('scroll');
						resize = true;
						home_page = true;
						$('.content').css('display', 'block');
						$('.ion-ios-arrow-thin-left').parent().css('display', 'none');
						$('.ion-navicon-round').parent().css('display', 'block');
						$('.details-news .all-of-news , .back').remove();
						$('.modal').addClass('show-modal');
						var modal = new Modal();
						modal.setTextModal('خطا در اربیاط با سرور')
						$('.text-alert').text(modal.getTextModal());
						modal.setTextButton('بستن');
						$('.ok').text(modal.getTextButton());

					})
					.always(function() {
						console.log("complete");
						if(success == true){
							$('.details-news').append(back_button);
							$('.details-news').css('display' , 'block');
							$('.back').addClass('show-back');
							backHomePage();
							$('.loading').css('display', 'none');
							success = false;
						}
					});


				resize = false;
			}
		});

		$('.content > *').on('drag' , function(e){
			e.preventDefault();
			if(allowScroll == true){
				startX = 0;
				if(e.orientation == "vertical"){
					if(down == true && e.direction == 1 && page.length){
						down = false;
						startX = e.x;
						startY = e.y;
						str = page.pop();
						z++;
						$(str).css('zIndex' , 100*z);
						if(up == child){
							u = true;
						}
						up--;
						$('.content > div:nth-child('+up+')').css('display', 'block');

					}else if(u == true && e.direction == -1){
						u = false;
						startX = e.x;
						startY = e.y;
						help = up+1;
						$('.content > div:nth-child('+help+')').css('display', 'block');
					}
					move = e.y - startY;
					if(e.direction == 1 && str != null){
						$(str).css('transform', 'translate3d(0,'+(move+(-1*h_d))+'px,0)');
					}
					else if(e.direction == -1){
						if(move <= 0){
						}
						else{
							move = 0;
						}
						help = up + 1;
						$('.page'+up).css('transform', 'translate3d(0,'+(move)+'px,0)');
						$('.content > div:nth-child('+help+')').css('display', 'block');
					}

					if(e.end == true){
						setTimeout(function(){
							if(move <= -60 && e.direction == -1 && scrollOfCount < child-1 && resize == true){
								u = true;
								scrollOfCount++;
								page.push('.page'+up);
								var a = $('.page'+up).css('transform');
								margin = a.slice(21,a.length-1);
								margin = parseInt(margin);
								move = -1*(margin + h_d);
								$('.page'+up).css('transform', 'translate3d(0,'+(margin+move)+'px,0)');
								setTimeout(function (){$('.page'+up).css('zIndex', '0');up++}, 250);
								flag = true;
								loadNews(help , flag , child);
							}else{
								$('.page'+up).css('transform', 'translate3d(0,0,0)');
								flag = true;
								u=true;
								loadNews(up , flag , child);
							}

							if(e.direction == 1 && scrollOfCount > 0 && resize == true){
								scrollOfCount--;
								$(str).css('transform', 'translate3d(0,0,0)');
								down = true;
								str = null;
							}
						} , 100);
					}
				}else {
					if(menu == true){
						menu = false;
						startX = e.x - e.adx;
					}
					if(startX <= 15 && home_page == true && e.x - startX >= 50){
						// $('.left-menu').addClass('show-left-menu');
						home_page = false;
					}
				}
			}
			
		});

		all_news = "";

		if(up == child && flag == true){
			flag = false;
			$('.loading-other-news').addClass('show-loading-other-news');
			allowScroll = false;
			connectToServer();
		}
	}

	function loadNews(up , flag , child){
		if(up == child && flag == true){
			flag = false;
			$('.loading-other-news').addClass('show-loading-other-news');
			allowScroll = false;
			connectToServer();
		}
	}

	function size () {
			h_d = $(window).height()-h_h;
			w_d = $(window).width();
			h   = $(window).height();
			leng = $('.content > *').length;
			swap = 1;
			sum = 0;

			// addClass

			if(h_d < 420 && w_d >= 769 && w_d > h){
				while(leng > 0){
					fSmallTheme();
					sSmallTheme();
					tSmallTheme();
					foMediumLandTheme();
				}	
			}
			else if(h_d >= 420 && h_d <450 && w_d >= 769 && w_d > h){
				while(leng > 0){
					fMediumTheme();
					sSmallTheme();
					tSmallTheme();
					foMediumLandTheme();
				}
			}
			else if(h_d >= 450 && w_d >= 769 && w_d > h){
				while(leng > 0){
					fBigTheme();
					sBigTheme();
					tBigLandTheme();
					foBigLandTheme();
				}
			}

			// end big

			else if(h_d < 420 && w_d >= 641 && w_d > h){	
				while(leng > 0){
					fSmallTheme();
					sSmallTheme();
					tSmallTheme();
					foMediumTheme();
				}	
			}
			else if(h_d >= 420 && h_d < 450 && w_d >= 641 && w_d > h){
				while(leng > 0){
					fMediumTheme();
					sSmallTheme();
					tSmallTheme();
					foMediumTheme();
				}
			}
			else if(h_d >= 450 && w_d >= 641 && w_d > h){
				while(leng > 0){
					fBigTheme();
					sBigTheme();
					tBigLandTheme();
					foBigTheme();
				}
			}

			// end medium

			
			else if(h_d < 420 && w_d > 480){
				while(leng > 0){
					fSmallTheme();

					sSmallTheme();

					tSmallTheme();

					foMediumTheme();
				}
			}
			else if(h_d >= 420 && h_d < 450 && w_d > 480){
				while(leng > 0){
					fMediumTheme();
					sSmallTheme();
					tSmallTheme();
					foMediumTheme();
				}	
			}
			else if(h_d >= 450 && w_d > 480){
				while(leng > 0){
					fBigTheme();
					sBigTheme();
					tBigPortratioTheme();
					foBigTheme();
				}	
			}

			// end small

			else if(h_d < 420 && w_d <= 480){
				while(leng > 0){
					
					fSmallTheme();
					sSmallTheme();
				}
			}
			else if(h_d >= 420 && h_d < 450 && w_d <= 480){
				while(leng > 0){
					fMediumTheme();
					sBigTheme();
				}	
			}
			else if(h_d >= 450 && w_d <= 480){
				while(leng > 0){
					fBigTheme();
					sBigTheme();
				}
			}

			// end vrey small


			if(h_d < 420 && w_d >= 769 && w_d > h){
				count = Math.floor(h_d / 3);
				$('.aval').height(count);
				$('.dovom').height(h_d);
				count = Math.floor(h_d / 2);
				$('.sevom').height(count);
				$('.big-forth , .small-forth').height(h_d);
			}
			else if(h_d >= 420 && h_d <450 && w_d >= 769 && w_d > h){
				count = Math.floor(h_d / 4);
				$('.aval').height(count);
				$('.dovom').height(h_d);
				count = Math.floor(h_d / 2);
				$('.sevom').height(count);
				$('.big-forth , .small-forth').height(h_d);
			}
			else if(h_d >= 450 && w_d >= 769 && w_d > h){
				count = Math.floor(h_d / 5);
				$('.aval').height(count);
				count = Math.floor(h_d / 3);
				$('.big-second').height(count*2);
				$('.small-second').height(h_d - (count*2));
				count = Math.floor(h_d / 2);
				$('.sevom').height(count);
				count = Math.floor(h_d / 2);
				$('.big-forth , .small-forth').height(count);
			}

			// end big  

			else if(h_d < 420 && w_d >= 641 && w_d > h){
				count = Math.floor(h_d / 3);
				$('.aval').height(count);
				$('.dovom').height(h_d);
				count = Math.floor(h_d / 2);
				$('.sevom').height(count);
				count = Math.floor(h_d / 2);
				$('.big-forth').height(h_d );
				$('.small-forth').height(count);
			}
			else if(h_d >= 420 && h_d <450 && w_d >= 641 && w_d > h){
				count = Math.floor(h_d / 4);
				$('.aval').height(count);
				$('.dovom').height(h_d);
				count = Math.floor(h_d / 2);
				$('.sevom').height(count);
				count = Math.floor(h_d / 2);
				$('.big-forth').height(h_d);
				$('.small-forth').height(count);
			}
			else if(h_d >= 450 && w_d >= 641 && w_d > h){
				count = Math.floor(h_d / 5);
				$('.aval').height(count);
				count = Math.floor(h_d / 3);
				$('.big-second').height(count*2);
				$('.small-second').height(h_d - (count*2));
				count = Math.floor(h_d / 2);
				$('.sevom').height(count);
				count = Math.floor(h_d / 2);
				$('.big-forth').height(count);
				$('.small-forth').height((count/2));
			}

			//end medium

			else if(h_d < 420 && w_d > 480){
				count = Math.floor(h_d / 3);
				$('.aval').height(count);
				$('.dovom').height(h_d);
				count = Math.floor(h_d / 2);
				$('.sevom').height(count);
				$('.big-forth ').height(h_d);
				$('.small-forth ').height( h_d/2);
			}
			else if(h_d >= 420 && h_d < 450 && w_d > 480){
				count = Math.floor(h_d / 4);
				$('.aval').height(count);
				$('.dovom').height(h_d);
				count = Math.floor(h_d / 2);
				$('.sevom').height(count );
				$('.big-forth ').height(h_d);
				$('.small-forth ').height( (h_d/2));
			}
			else if(h_d >= 450 && w_d > 480){
				count = Math.floor(h_d / 5);
				$('.aval').height(count);
				count = Math.floor(h_d / 3);
				$('.big-second').height(count*2);
				$('.small-second').height(h_d - (count*2));
				count = Math.floor(h_d / 3);
				$('.sevom').height(count);
				count = Math.floor(h_d / 2);
				$('.big-forth').height(count);
				$('.small-forth').height((count/2));
			}
			

			// end small

			else if(h_d < 420 && w_d <= 480){
				count = Math.floor(h_d / 3);
				$('.aval').height(count);
				$('.dovom').height(h_d);
			}
			else if(h_d >= 420 && h_d < 450 && w_d <= 480){
				count = Math.floor(h_d / 4);
				$('.aval').height(count);
				count = Math.floor(h_d / 3);
				$('.big-second').height(count*2);
				$('.small-second').height(h_d - (count*2));
			}
			else if(h_d >= 450 && w_d <= 480){
				count = Math.round(h_d / 5);
				$('.aval').height(count);
				count = Math.round(h_d / 3);
				$('.big-second').height(count*2);
				$('.small-second').height(h_d - (count*2));
			}

			// end very small

			$('figure').each(function(index, el) {
				$(this).height($(this).parent().height() - 10);
			});

			$('.fig').width($('.aval').height() - 8);

			$('.aval .details-new').width(w_d - 10 - ($('.fig').width()+parseInt($('.fig').css('marginLeft')) +parseInt($('.fig').css('marginRight'))));
			$('.aval .details-new').height($('.aval figure').height());
			var lh = Math.floor(parseInt($('.aval .details-new p').css('lineHeight')));
			var a = Math.floor(parseInt($('.aval .details-new h4').css('lineHeight'))) + parseInt($('.aval .details-new h4').css('marginBottom')) ;
			var b = parseInt($('.aval .details-new .base-source').css('lineHeight'));
			var c = $('.aval .details-new').height();
			console.log(a + " -- " + b + " -- " + c);
			if(c-(a+b) < lh*3){
				$('.aval .details-new p').height( lh * 2);
			}else{
				$('.aval .details-new p').height( lh * 3);
			}
	}

	$(window).resize(function(event) {

		 if(resize == true){
		 	changeLayout(up);
		 }
		
	});

	function fSmallTheme(){

		for(var i=swap ; i<=swap+2 && leng > 0 ; i++ , leng-- ){
			if(i==swap){
					$('.content > :nth-child('+i+')').addClass('first-f');
				}
				$('.content > :nth-child('+i+')').addClass('aval new-first a');
				$('.content > div:nth-child('+i+') figure').removeClass('normal');
				$('.content > div:nth-child('+i+')').attr('id', i);
				$('.content > :nth-child('+i+') figure').addClass('fig');
				child = i;
				counter++;

				if(swap == 1){
					$('.content > :nth-child('+i+')').addClass('active');
				}
			}
			for(var i=swap ; i<=swap+2 ; i++){
				console.log(a+"dd");
				$('.content > :nth-child('+i+')').addClass('aval'+a);
			}
			swap = i;
			if(counter == 3){
				$('.content > :nth-child('+child+')').addClass('last-f');
			}
			if(leng > 0){
				num_of_theme++;
			}
			first++;
			counter = 0;
			a++;
	}

	function fMediumTheme() {
		for(var i=swap ; i<=swap+3 && leng > 0 ; i++ , leng-- ){
			if(i==swap){
				$('.content > :nth-child('+i+')').addClass('first-f');
			}
			$('.content > :nth-child('+i+')').addClass('aval new-first b');
			$('.content > div:nth-child('+i+')').attr('id', i);
			$('.content > div:nth-child('+i+') figure').removeClass('normal');
			$('.content > :nth-child('+i+') figure').addClass('fig');
			child = i;	
			counter++;
			if(swap == 1){
					$('.content > :nth-child('+i+')').addClass('active');
				}
			}
			for(var i=swap ; i<=swap+3 ; i++){
				$('.content > :nth-child('+i+')').addClass('aval'+a);
			}
			swap = i;
			if(counter == 4){
				$('.content > :nth-child('+child+')').addClass('last-f');
			}
			if(leng > 0){
				num_of_theme++;
			}
			first++;
			counter = 0;
			a++;
	}

	function fBigTheme(){
		for(var i=swap ; i<=swap+4 && leng > 0 ; i++ , leng-- ){
			if(i==swap){
				$('.content > :nth-child('+i+')').addClass('first-f');
			}
			$('.content > :nth-child('+i+')').addClass('aval new-first');
			$('.content > div:nth-child('+i+')').attr('id', i);	
			$('#'+ $('.content > div:nth-child('+i+')').attr('id') ).wr
			$('.content > div:nth-child('+i+') figure').removeClass('normal');
			$('.content > :nth-child('+i+') figure').addClass('fig');
			child = i;
			counter++;
			if(swap == 1){
					$('.content > :nth-child('+i+')').addClass('active');
				}
		}

		for(var i=swap ; i<=swap+4 ; i++){
			$('.content > :nth-child('+i+')').addClass('aval'+a);
		}

		swap = i;

		if(counter == 5){
			$('.content > :nth-child('+child+')').addClass('last-f');
		}
		if(leng > 0){
				num_of_theme++;
			}
		first++;
		// console.log($('.content').height());
		counter = 0;
		a++;
	}

	function sSmallTheme(){
		for(var j=swap ; j <= swap && leng > 0 ; j++ , leng--){
			$('.content > :nth-child('+j+')').addClass('dovom new-second big-second last-s dovom'+b+'');
			$('.content > div:nth-child('+j+')').attr('id', j);	
			child = j;
			counter++;
			}
			// $('.content > :nth-child('+swap+')').addClass('dovom'+b);
		
			swap = j;
			if(counter == 1){
				$('.content > :nth-child('+child+')').addClass('last-s');		
			}
			if(leng > 0){
				num_of_theme++;
			}
			counter = 0;
			b++;
	}	

	function sBigTheme() {
		for(var j=swap ; j <= swap+2 && leng > 0 ; j++ , leng--){
			$('.content > :nth-child('+j+')').addClass('dovom');
			$('.content > :nth-child('+j+')').removeClass('new-first');
			$('.content > :nth-child('+j+')').addClass('new-second');
			if(j==swap){
				$('.content > :nth-child('+swap+')').addClass('big-second first-s');
			}
			else{
				$('.content > :nth-child('+j+')').addClass('small-second');
			}
			$('.content > div:nth-child('+j+')').attr('id', j);	
			child = j;
			counter++;
		}
		for(var j=swap ; j<=swap+2 ; j++){
			$('.content > :nth-child('+j+')').addClass('dovom'+b);
		}
		swap = j;
		if(counter == 3){
			$('.content > :nth-child('+child+')').addClass('last-s');			
		}
		if(leng > 0){
			num_of_theme++;
		}
		counter = 0;
		b++;
	}

	function tSmallTheme(){
		for(var k=swap ; k <= swap+3 && leng > 0 ; k++ , leng--){
			$('.content > :nth-child('+k+')').addClass('sevom new-third');
			if(k==swap){
				$('.content > :nth-child('+swap+')').addClass('first-t');
			}
			child = k;
			counter++;
			$('.content > div:nth-child('+k+')').attr('id', k);	
		}

		for(var k=swap ; k<=swap+3 ; k++){
			$('.content > :nth-child('+k+')').addClass('sevom'+c);
		}
		
		swap = k;
		if(counter == 4){
			$('.content > :nth-child('+child+')').addClass('last-t');			
		}
		if(leng > 0){
			num_of_theme++;
		}
		counter = 0;
		c++;
	}

	function tBigPortratioTheme(){
		for(var k=swap ; k <= swap+5 && leng > 0 ; k++ , leng--){
			$('.content > :nth-child('+k+')').addClass('sevom new-third');
			if(k==swap){
				$('.content > :nth-child('+swap+')').addClass('first-t');
			}
			child = k;
			counter++;
			$('.content > div:nth-child('+k+')').attr('id', k);	
		}

		for(var k=swap ; k<=swap+5 ; k++){
			$('.content > :nth-child('+k+')').addClass('sevom'+c);
		}

		swap = k;
		if(counter == 6){
			$('.content > :nth-child('+child+')').addClass('last-t');
		}
		if(leng > 0){
			num_of_theme++;
		}
		counter = 0;
		c++;
	}

	function tBigLandTheme(){
		for(var k=swap ; k <= swap+5 && leng > 0 ; k++ , leng--){
			$('.content > :nth-child('+k+')').addClass('sevom new-third land');
			if(k==swap){
				$('.content > :nth-child('+swap+')').addClass('first-t');
			}
			child = k;
			counter++;
			$('.content > div:nth-child('+k+')').attr('id', k);	
		}
		for(var k=swap ; k<=swap+5 ; k++){
			$('.content > :nth-child('+k+')').addClass('sevom'+c);
		}
		swap = k;
		if(counter == 6){
			$('.content > :nth-child('+child+')').addClass('last-t');
		}
		counter = 0;
		c++;
		if(leng > 0){
			num_of_theme++;
		}
	}

	function foSmallTheme(){
		for(var q=swap ; q <= swap && leng > 0 ; q++ , leng--){
			$('.content > :nth-child('+q+')').addClass('charom new-forth first-four big-forth charom'+d+'');
			child = q;
			counter++;
			$('.content > div:nth-child('+q+')').attr('id', q);	
		}
		swap = q;
		if(counter == 3){
			$('.content > :nth-child('+child+')').addClass('last-four');
		}
		counter = 0;
		d++;
		if(leng > 0){
			num_of_theme++;
		}
	}

	function foMediumTheme(){
		for(var q=swap ; q <= swap+2 && leng > 0 ; q++ , leng--){
			$('.content > :nth-child('+q+')').addClass('charom new-forth');
			counter++;
			if(q==swap){
				$('.content > :nth-child('+q+')').addClass('first-four big-forth pull-left');
			}
			else if(counter == 2){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth pull-right');
			}
			else if(counter == 3){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth pull-right right');
				
			}
			child = q;
			$('.content > div:nth-child('+q+')').attr('id', q);	
		}

		for(var q=swap ; q<=swap+2 ; q++){
			$('.content > :nth-child('+q+')').addClass('charom'+d);
		}
		swap = q;
		if(counter == 3){
			$('.content > :nth-child('+child+')').addClass('last-four');
		}
		counter = 0;
		d++;
		if(leng > 0){
			num_of_theme++;
		}
	}

	function foMediumLandTheme(){
		for(var q=swap ; q <= swap+2 && leng > 0 ; q++ , leng--){
			$('.content > :nth-child('+q+')').addClass('charom new-forth');
			counter++;
			if(q==swap){
				$('.content > :nth-child('+q+')').addClass('first-four big-forth pull-left land');
			}
			else if(counter == 2){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth pull-left land margin-small');
			}
			else if(counter == 3){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth pull-left land margin-small');
				
			}
			child = q;
			$('.content > div:nth-child('+q+')').attr('id', q);				
		}
		for(var q=swap ; q<=swap+2 ; q++){
			$('.content > :nth-child('+q+')').addClass('charom'+d);
		}
		swap = q;
		if(counter == 3){
			$('.content > :nth-child('+child+')').addClass('last-four');
		}
		counter = 0;
		d++;
		if(leng > 0){
			num_of_theme++;
		}
	}

	function foBigLandTheme(){
		for(var q=swap ; q <= swap+5 && leng > 0 ; q++ , leng--){
			$('.content > :nth-child('+q+')').addClass('charom new-forth');
				counter++;
			if(q==swap){
				$('.content > :nth-child('+q+')').addClass('first-four big-forth pull-left land');
			}
			else if(counter == 2){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth pull-left land margin-small');
			}
			else if(counter == 3){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth pull-left land margin-small');
			}
			else if(counter == 4){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth pull-left land margin-small ');
			}
			else if(counter == 5){
				$('.content > :nth-child('+q+')').addClass('big-forth small-forth pull-left land margin-small');
			}
			else if(counter == 6){
				$('.content > :nth-child('+q+')').addClass('first-four big-forth pull-left land margin-small');		
			}
			child = q;
			$('.content > div:nth-child('+q+')').attr('id', q);	
		}
		for(var q=swap ; q<=swap+5 ; q++){
			$('.content > :nth-child('+q+')').addClass('charom'+d);
		}
		swap = q;
		if(counter == 6){
			$('.content > :nth-child('+child+')').addClass('last-four');
		}
		counter = 0;
		d++;
		if(leng > 0){
			num_of_theme++;
		}
	}

	function foBigTheme(){
		for(var q=swap ; q <= swap+5 && leng > 0 ; q++ , leng--){
			$('.content > :nth-child('+q+')').addClass('charom new-forth');
				counter++;
			if(q==swap){
				$('.content > :nth-child('+q+')').addClass('first-four big-forth pull-left');
			}
			else if(counter == 2){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth margin-big pull-right');
			}
			else if(counter == 3){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth margin-big pull-right right');
			}
			else if(counter == 4){
				$('.content > :nth-child('+q+')').addClass('first-four small-forth pull-left margin-small left');
			}
			else if(counter == 5){
				$('.content > :nth-child('+q+')').addClass('first-four big-forth pull-right margin-big');
			}
			else if(counter == 6){
				$('.content > :nth-child('+q+')').addClass('big-forth small-forth pull-left left margin-small last-four');
			}	
			child = q;
			$('.content > div:nth-child('+q+')').attr('id', q);	
		}
		for(var q=swap ; q<=swap+5 ; q++){
			$('.content > :nth-child('+q+')').addClass('charom'+d);
		}
		swap = q;
		d++;
		counter = 0;
		if(leng > 0){
			num_of_theme++;
		}
	}

	function addElement(){

		if(a!=1){
			for(var i=1 ; i<=a ; i++){
				$('.aval'+i).wrapAll('<div></div>')
			}
		}
		if(b!=1){
			for(var i=1 ; i<=b ; i++){
				$('.dovom'+i).wrapAll('<div></div>')
			}
		}
		if(c!=1){
			for(var i=1 ; i<=c ; i++){
				$('.sevom'+i).wrapAll('<div></div>')
			}
		}
		if(d!=1){
			for(var i=1 ; i<=d ; i++){
				$('.charom'+i).wrapAll('<div></div>')
			}
		}

		$('.content > *').height(h_d);
		for(var i=1 , z=100 ; i<=$('.content > *').length ; i++ , z--){
			$('.content > :nth-child('+i+')').addClass('page'+i);
			$('.content > :nth-child('+i+')').css('zIndex', z);
		}
	}

	function removeElement(){
		if(a!=1){
			for(var i=1 ; i<=a ; i++){
				$('.aval'+i).unwrap('<div ></div>')
			}
		}
		if(b!=1){
			for(var i=1 ; i<=b ; i++){
				$('.dovom'+i).unwrap('<div></div>')
			}
		}
		if(c!=1){
			for(var i=1 ; i<=c ; i++){
				$('.sevom'+i).unwrap('<div></div>')
			}
		}
		if(d!=1){
			for(var i=1 ; i<=d ; i++){
				$('.charom'+i).unwrap('<div></div>')
			}
		}
	}

	function changeLayout(indexUp){
		h_d = $(window).height()-h_h;
		first = 0;
		scrollOfCount = 0;
		num_of_theme = 0 ;
		indexUp = $('.content > div:nth-child('+indexUp+')').children().first().attr('id');
		removeElement();
		swap = 1;a=1;b=1;c=1;d=1;up=1;down=true;u=true; page= []; flag = true , str = null ;
		w_d = $(window).width();
		var leng = $('.content > *').length;
		$('.content').css('transform', 'translate3d(0,'+cal()+'px,0)');
		for(var i=1 ; i<=leng ; i++){
			if($('.content > div:nth-child('+i+')').hasClass('new-first')){
				$('.content > div:nth-child('+i+')').removeClass();
			}
			else if($('.content > div:nth-child('+i+')').hasClass('new-second')){
				$('.content > div:nth-child('+i+')').removeClass();
			}
			else if($('.content > div:nth-child('+i+')').hasClass('new-third')){
				$('.content > div:nth-child('+i+')').removeClass();
			}
			else if($('.content > div:nth-child('+i+')').hasClass('new-forth')){
				$('.content > div:nth-child('+i+')').removeClass();
			}
			$('.content > div:nth-child('+i+') figure').removeClass('fig');
			$('.content > div:nth-child('+i+') figure').addClass('normal');
			$('.content > div:nth-child('+i+')').css('marginTop', '');
		}
		size();
		addElement();


		up = $('#'+indexUp).parent();
		up = up[0].className.slice(-1);
		up = parseInt(up);

		for(var g=1 ; g<up ; g++){
			page.push('.page'+g);
		}

		scrollOfCount = page.length;
		
		for(var t=up ; t>1 ; t--){
			help = t;
			$('.content > div:nth-child('+(help-1)+')').css({
				'display' : 'none',
				'transform': 'translate3d(0,'+(-h_d)+'px,0)',
				'zIndex': '0'
			});
		}

		child = $('.content > *').length;
		for(var w=up ; w<child ; w++){
			help = w;
			$('.content > div:nth-child('+(help+1)+')').css('display', 'none');
		}

		$('.content > div:nth-child('+up+')').css('display', 'block');


		$('.content , .wrap-page').height(h_d);

		$('.content').css('transform', 'translate3d(0,'+cal()+'px,0)');

		$('.notification , .setting-page').css('height', h_d);

		$('.login-page').css('marginTop', cal()-20);

		$('.setting-page ul').css('height', h_d-buttonFooter);
		$('.notification , .setting-page').css('height', h_d);
		$('.notification ul').css('height' , h_d-110 );

		$('.content > *').on('tap' , function(e){
			e.preventDefault();
			if($('.left-menu').hasClass('show-left-menu')){
				$('.left-menu').removeClass('show-left-menu');
				setTimeout(function(){
					home_page = true;
				} , 250);
			}

			if(home_page == true){
				$('.details-news').css('transform', 'translate3d(0,'+(cal()+2)+'px,0)');
				$('.loading').css('display', 'block');
				home_page = false;
				$('html').addClass('scroll');
				var tag = e.target.tagName;
				if(tag == 'FIGURE'){
					id = event.target.parentElement.id;
				}
				else{
					id = event.target.parentElement.parentElement.id;
				}
				$('.content').css('display', 'none');
				$('.details-news').append(all_of_new);
				$('.details-news > div').last().attr('id', 'detail-'+id);
				$('.ion-navicon-round').parent().css('display', 'none');
				$('.ion-ios-arrow-thin-left').parent().css('display', 'block');

				$.ajax({
					url: 'http://sdi.cloudware.ir/json.php',
					dataType: 'json',
					crossDomain : true,
					cache : true,
				})
					.done(function() {
						$('#detail-'+id+' .title').text(news[id-1].title);
						$('#detail-'+id+' .base').text(news[id-1].base_source);
						$('#detail-'+id+' .star').text('*');
						$('#detail-'+id+' .time').text(news[id-1].time_base);
						$('#detail-'+id+' img').attr('src', news[id-1].img);
						$('#detail-'+id+' .abstrac').text(news[id-1].abstrac);
						// if(news[id-1].other_source.length){
						//     for(var i=0 ; i<news[id-1].other_source.length ; i++){
						//    		$('#detail-'+id+ ' .other-source').append("<span id=source"+i+"></span> <span class=star>*</span> <span                                     id=time"+i+"></span>");
						//    		$('#detail-'+id+ ' .other-source #source'+i).text(news[id-1].other_source[id-1].s);
						//    		$('#detail-'+id+ ' .other-source #time'+i).text(news[id-1].other_source[id-1].t);
						//    		if(news[id-1].other_source.length > 1 && i+1<news[id-1].other_source.length){
						//    			$('<span class=slash>/</span>').insertAfter('#detail-'+id+ ' .other-source #time'+i);
						//    		}
						//    	}
						// }
						$('#detail-'+id+' .text-new').addClass('show-border');
						$('#detail-'+id+' .text-new').append(news[id-1].text_new);
						success = true;
					})
					.fail(function() {
						$('.details-news').css('display', 'none');
						$('.loading').css('display' , 'none');
						$('.content').css('transform', 'translate3d(0,'+cal()+'px,0)');
						$(window).scrollTop(0);
						$('html').removeClass('scroll');
						resize = true;
						home_page = true;
						$('.content').css('display', 'block');
						$('.ion-ios-arrow-thin-left').parent().css('display', 'none');
						$('.ion-navicon-round').parent().css('display', 'block');
						$('.details-news .all-of-news , .back').remove();
						$('.modal').addClass('show-modal');
						var modal = new Modal();
						modal.setTextModal('خطا در اربیاط با سرور')
						$('.text-alert').text(modal.getTextModal());
						modal.setTextButton('بستن');
						$('.ok').text(modal.getTextButton());

					})
					.always(function() {
						console.log("complete");
						if(success == true){
							$('.details-news').append(back_button);
							$('.details-news').css('display' , 'block');
							$('.back').addClass('show-back');
							backHomePage();
							$('.loading').css('display', 'none');
							success = false;
						}
					});


				resize = false;
			}
		});

		$('.content > *').on('drag' , function(e){
			e.preventDefault();
			if(allowScroll == true){
				startX = 0;
				if(e.orientation == "vertical"){
					if(down == true && e.direction == 1 && page.length){
						down = false;
						startX = e.x;
						startY = e.y;
						str = page.pop();
						z++;
						$(str).css('zIndex' , 100*z);
						if(up == child){
							u = true;
						}
						up--;
						$('.content > div:nth-child('+up+')').css('display', 'block');

					}else if(u == true && e.direction == -1){
						u = false;
						startX = e.x;
						startY = e.y;
						help =  up + 1;
						$('.content > div:nth-child('+(up+1)+')').css('display', 'block');
					}
					move = e.y - startY;
					if(e.direction == 1 && str != null){
						$(str).css('transform', 'translate3d(0,'+(move+(-1*h_d))+'px,0)');
					}
					else if(e.direction == -1){
						if(move <= 0){
						}
						else{
							move = 0;
						}
						// help = up + 1;
						$('.page'+up).css('transform', 'translate3d(0,'+(move)+'px,0)');
						$('.content > div:nth-child('+(up+1)+')').css('display', 'block');
					}

					if(e.end == true){
						setTimeout(function(){
							if(move <= -60 && e.direction == -1 && scrollOfCount < child-1 && resize == true){
								u = true;
								scrollOfCount++;
								page.push('.page'+up);
								var a = $('.page'+up).css('transform');
								margin = a.slice(21,a.length-1);
								margin = parseInt(margin);
								move = -1*(margin + h_d);
								$('.page'+up).css('transform', 'translate3d(0,'+(margin+move)+'px,0)');
								
								setTimeout(function(){
									$('.page'+up).css('zIndex', 0);
									up++;
								}, 250);
								flag = true;
								loadNews(help , flag , child);
							}else{
								$('.page'+up).css('transform', 'translate3d(0,0,0)');
							}

							if(e.direction == 1 && scrollOfCount > 0 && resize == true){
								scrollOfCount--;
								$(str).css('transform', 'translate3d(0,0,0)');
								down = true;
								str = null;
								u = true;
							}
						} , 100);

					}
				}else {
					if(menu == true){
						menu = false;
						startX = e.x - e.adx;
					}
					if(startX <= 15 && home_page == true && e.x - startX >= 50){
						home_page = false;
					}
				}
			}
			
		});

		if(up == child && flag == true){
			flag = false;
			$('.loading-other-news').addClass('show-loading-other-news');
			allowScroll = false;
			connectToServer();
		}
		$('.loading').height($('.loading').width());
	}

	// function for click back
	function backHomePage(){
		$('.details-news .show-back').on('click', function(event) {
			event.preventDefault();
			$('.details-news').css('display', 'none');
			$('.content').css('transform', 'translate3d(0,'+cal()+'px,0)');
			$('.content').css('display', 'block');
			$('.ion-ios-arrow-thin-left').parent().css('display', 'none');
			$('.ion-navicon-round').parent().css('display', 'block');
			$(window).scrollTop(0);
			$('html').removeClass('scroll');
			resize = true;
			home_page = true;
			$('.details-news .all-of-news , .back').remove();

		});	
	}
	
	// Loading page
	$('.loading').height($('.loading').width());

	// login-page
	$('input[type=submit]').on('click', function(event) {
		event.preventDefault();
		setTimeout(function(){
			$('.login-page').css('display', 'none');
			$('.content').css('display', 'block');
			$('.click').css('display', 'block');
			connectToServer();
		} , 1000);
	});

	//Left menu
	$(".left-menu .setting").on('click', function(event) {
		event.preventDefault();
		$('.left-menu').removeClass('show-left-menu');
		home_page = true;
		setTimeout(function(){
			$('.content').css('display', 'none');
			$('.setting-page').css('display', 'block');
		    $('.ion-navicon-round').parent().css('display', 'none');
			$('.ion-ios-arrow-thin-left').parent().css('display', 'block');} , 250);
	});

	//Setting page
	$('.setting-page ul').css('height', h_d-buttonFooter);
	$('.setting-page').on('click', 'li' , function(event) {
		event.preventDefault();
		$(this).toggleClass('select-keyword');
		var obj = {id : "" , text : ""};
		if($(this).hasClass('select-keyword')){
			obj.id = $(this).attr('id');
			obj.text = $(this).text();
			keyword.push(obj);
			$(this).addClass('s');
		}
		else{
			for(var i=0 ; i<keyword.length ; i++){
				if(keyword[i].id==$(this).attr('id')){
					keyword[i].id="";
					keyword[i].text="";
					$(this).removeClass('s');
				}
			}
		}
	});

	$('.setting-page > footer').on('click', '.cancle' , function(event) {
		event.preventDefault();
		$('.setting-page').css('display', 'none');
		$('.content').css('display', 'block');
		$('.ion-ios-arrow-thin-left').parent().css('display', 'none');
		$('.ion-navicon-round').parent().css('display', 'block');
		keyword.length = 0;
		$('.setting-page li').each(function(index, el) {
			if($(this).hasClass('select-keyword')){
				$(this).removeClass();
			}
		});
	});

	$('.ion-navicon-round').on('click', function(event) {
		event.preventDefault();
		$('.left-menu').addClass('show-left-menu');
		home_page = false;
		
	});

	$('.ion-ios-arrow-thin-left').on('click' , function(event) {
		event.preventDefault();
		if( $('.setting-page').css('display') == 'none' ){
			$('.details-news').css('display', 'none');
			$('.content').css('transform', 'translate3d(0,'+cal()+'px,0)');
			$(window).scrollTop(0);
			$('html').removeClass('scroll');
			resize = true;
			home_page = true;
			$('.content').css('display', 'block');
			$('.ion-ios-arrow-thin-left').parent().css('display', 'none');
			$('.ion-navicon-round').parent().css('display', 'block');
			$('.details-news .all-of-news , .back').remove();
		}
		else {
			if($('.notification').hasClass('show-notification')){
				$('.notification').removeClass('show-notification');
			}
			else{
				$('.setting-page').css('display', 'none');
				keyword.length = 0;
				$('.setting-page li').each(function(index, el) {
					if($(this).hasClass('select-keyword')){
						$(this).removeClass();
					}
				});
				$('.content').css('display', 'block');
				$('.ion-ios-arrow-thin-left').parent().css('display', 'none');
				$('.ion-navicon-round').parent().css('display', 'block');
			}
		}
	});

	$('.setting-page > footer').on('click', '.next-step', function(event) {
		event.preventDefault();
		var s = 0;
		for(var i=0 ; i<keyword.length ; i++){
			if(keyword[i].id == ""){
				s++;
			}
		}
		if(s != keyword.length){
			$('.notification').addClass('show-notification');
			
			var next = 1;
			for(var i=0 ; i<keyword.length ; i++){
				if(keyword[i].id != ""){
					$('.notification ul').append(notification);
					var c = $('.notification ul .timestamp:nth-child('+(i+1)+') #a').attr('id');
					$('.notification ul .timestamp:nth-child('+(i+1)+') #a').attr('id' , c+""+(i+1));
					$('.notification ul .timestamp:nth-child('+(i+1)+') .title').attr('for' , c+""+(i+1));

					c = $('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time #now').attr('id');
					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time #now').attr('id' , c+""+(i+1));
					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time .now').attr('for' , c+""+(i+1));

					c = $('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time #day').attr('id');
					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time #day').attr('id' , c+""+(i+1));
					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time .day').attr('for' , c+""+(i+1));

					c = $('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time #week').attr('id');
					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time #week').attr('id' , c+""+(i+1));
					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time .week').attr('for' , c+""+(i+1));

					c = $('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time #month').attr('id');
					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time #month').attr('id' , c+""+(i+1));
					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time .month').attr('for' , c+""+(i+1));


					$('.notification ul .timestamp:nth-child('+(i+1)+') .notifi-time > *').attr('name' , "select"+(i+1));
					$('.notification ul .timestamp:nth-child('+next+') .title').text(keyword[i].text);
					next++;
				}
			}

		
		}
		else{
			$('.modal').addClass('show-modal');
			var modal = new Modal();
			modal.setTextModal('برای رفتن به صفحه بعد حداقل یکی از کلمات کلیدی را انتخاب نمایید.')
			$('.text-alert').text(modal.getTextModal());
			modal.setTextButton('قبول');
			$('.ok').text(modal.getTextButton());
		}
		
	});

	//Notification

	$('.notification , .setting-page').css('height', h_d);
	
	$('.notification ul').css('height' , h_d-110 );


	$('.notification').on('click', '.cancle', function(event) {
		event.preventDefault();
		$('.notification').removeClass('show-notification');
		setTimeout(function (){
			$('.notification ul .timestamp').remove();
		} , 250);
	});

	$('.notification').on('change', 'input[type=checkbox]', function(event) {
		event.preventDefault();
		
		if ($(this).is(':checked')) {
			$(this).parent().next('.notifi-time').slideDown(200);
		}else{
			$(this).parent().next('.notifi-time').slideUp(200);
		}
		
	});

	//modal
	//$('.modal').on('click', '.ok', function(event) {
	//	event.preventDefault();
	//	$('.modal').removeClass('show-modal');
	//});

	$('.modal').on('click' , '.again' , function(){
		connectToServer();
		$('.modal').removeClass('show-modal , again');
	});
	//  class modal

	function Modal(){
		this.textModal ="";
		this.textButton ="";
	}

	Modal.prototype.setTextModal = function(str){
		this.textModal = str;
	}

	Modal.prototype.setTextButton = function(str){
		this.textButton = str;
	}

	Modal.prototype.getTextModal = function(){
		return this.textModal;
	}

	Modal.prototype.getTextButton = function(){
		return this.textButton;
	}

	// connect to server for fetch data

	function connectToServer(){
		$.ajax({
			type : 'GET',
			url: 'http://sdi.cloudware.ir/json.php',
			dataType: 'json',
			crossDomain : true,
			cache : true,
		}).done(function() {
			success = true;
		}).fail(function() {

		}).always(function(data) {
			console.log("complete");
			$('.loading-other-news').removeClass('show-loading-other-news');
			if(success == true){
				allowScroll = true;
				all_news = data;
				success = false;
				for(var s=0 ; s<data.length ; s++){
					news.push(data[s]);
				}
				Initialize();
				
			}else{
				$('.modal').addClass("show-modal");
				var modal = new Modal();
				modal.setTextModal('اتصال ایترنت را بررسی نمایید.')
				$('.text-alert').text(modal.getTextModal());
				modal.setTextButton('مجدد تلاش کردن');
				$('.ok').text(modal.getTextButton());
				$('.ok').addClass("again");
			}
		});
	}

});