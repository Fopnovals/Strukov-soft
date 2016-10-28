var slider = function (arg) {

	var container = document.getElementById(arg.container.replace(/[^a-z]/,"")),
		sliderUl = container.getElementsByTagName('ul')[0],
		slideImage = sliderUl.getElementsByTagName('img'),
		arrLi = sliderUl.getElementsByTagName('li'),
		prev = document.getElementById('prev'),
		next = document.getElementById('next'),
		marginLeftUl = 0,
		slideWidth = arg.width || window.innerWidth,
		slideHeight = arg.height || null,
		scrollingSlide = arg.scrolling || null,
		effect = arg.effect || 'line',
		speed = arg.speed || 1;


	container.style.width = slideWidth + 'px';
	container.style.overflow = 'hidden';
	container.style.position = 'relative';
	sliderUl.style.transition = speed+'s' + ' linear';
	sliderUl.style.marginLeft = 0;


	for(var i=0; i<arrLi.length; i++) {
		arrLi[i].setAttribute('id', 'li'+i);
		arrLi[i].style.width = slideWidth+'px';
		if(slideHeight == 'auto') {
			slideImage[i].style.width = slideWidth+'px';
		}
		if(effect == 'line') {
			arrLi[i].style.float = 'left';
		}
		if(effect == 'fade') {
			arrLi[i].style.position = 'absolute';
			arrLi[i].style.left = 0;
			arrLi[i].style.top = 0;
			arrLi[i].style.zIndex = -1;
			arrLi[i].style.opacity = 0;
			arrLi[i].style.transition = speed+'s' + ' linear';
		}
	}


	//EFFECT
	if(effect == 'line') {
		sliderUl.style.width = arrLi.length*slideWidth + 'px';
	} else if(effect == 'fade') {
		arrLi[0].style.zIndex = 1;
		arrLi[0].style.position = 'relative';
		arrLi[0].style.opacity = 1;
		arrLi[0].setAttribute('fade','active');
	}


	//ALIGNMENT
	if(slideWidth != window.innerWidth) {
		container.style.margin = 0 + ' auto';
	}


	prev.addEventListener('click', slideList);
	next.addEventListener('click', slideList);


	function slideList (e) {
		e.preventDefault();

		//EFFECT LINE
		if(effect == 'line') {
			if(this.id == 'prev') {
				if(scrollingSlide == 'infinity' && -marginLeftUl == 0) {
					marginLeftUl = -(arrLi.length-1)*slideWidth;
				} else if(-marginLeftUl != 0) {
					marginLeftUl += slideWidth;
				} else if(!scrollingSlide && -marginLeftUl == 0) {
					marginLeftUl = 0;
				}
				sliderUl.style.marginLeft = marginLeftUl + 'px';

			} else if(this.id == 'next') {
				if(scrollingSlide == 'infinity' && -marginLeftUl == (arrLi.length-1)*slideWidth) {
					marginLeftUl = 0;
				} else if(-marginLeftUl != (arrLi.length-1)*slideWidth) {
					marginLeftUl -= slideWidth;
				} else if(!scrollingSlide && -marginLeftUl == (arrLi.length-1)*slideWidth) {
					marginLeftUl = -(arrLi.length-1)*slideWidth;
				}
				sliderUl.style.marginLeft = marginLeftUl + 'px';
			}
		}

		//EFFECT FADE
		if(effect == 'fade') {
			if(this.id == 'prev') {
				for(var j=0; j<arrLi.length; j++) {
					if(arrLi[j].getAttribute('fade') == 'active') {
						if(scrollingSlide == 'infinity' && j > 0 || !scrollingSlide && j > 0) {
							arrLi[j].removeAttribute('fade');
							arrLi[j].style.zIndex = -1;
							arrLi[j].style.opacity = 0;
							arrLi[j-1].setAttribute('fade','active');
							arrLi[j-1].style.zIndex = 1;
							arrLi[j-1].style.opacity = 1;
						} else if(scrollingSlide == 'infinity' && j == 0) {
							arrLi[j].removeAttribute('fade');
							arrLi[j].style.zIndex = -1;
							arrLi[j].style.opacity = 0;
							arrLi[arrLi.length-1].setAttribute('fade','active');
							arrLi[arrLi.length-1].style.zIndex = 1;
							arrLi[arrLi.length-1].style.opacity = 1;
						} if(!scrollingSlide && j == 0) {
							return;
						}
						return;
					}
				}
			}
			if(this.id == 'next') {
				for(var j=0; j<arrLi.length; j++) {
					if(arrLi[j].getAttribute('fade') == 'active') {
						if(scrollingSlide == 'infinity' && j < arrLi.length-1 || !scrollingSlide && j < arrLi.length-1) {
							arrLi[j].removeAttribute('fade');
							arrLi[j].style.zIndex = -1;
							arrLi[j].style.opacity = 0;
							arrLi[j+1].setAttribute('fade','active');
							arrLi[j+1].style.zIndex = 1;
							arrLi[j+1].style.opacity = 1;
						} else if(scrollingSlide == 'infinity' && j == arrLi.length-1) {
							arrLi[j].removeAttribute('fade');
							arrLi[j].style.zIndex = -1;
							arrLi[j].style.opacity = 0;
							arrLi[0].setAttribute('fade','active');
							arrLi[0].style.zIndex = 1;
							arrLi[0].style.opacity = 1;
						} if(!scrollingSlide && j == arrLi.length-1) {
							return;
						}
						return;
					}
				}
			}
		}
	}
};