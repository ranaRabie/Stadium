function fixedHeader(){
    try {
        const headerDiv = document.getElementById("header-wrap");
        const navBar = document.getElementById('nav-bar');
        if(window.pageYOffset  >= 35 && window.innerWidth >= 768){
            headerDiv.classList.add('header-fixed');
            navBar.classList.remove('navbar-dark');
            navBar.classList.add('navbar-light');
        }
        else{
            headerDiv.classList.remove('header-fixed');
            navBar.classList.remove('navbar-light');
            navBar.classList.add('navbar-dark');
        }
    }
    catch(err) {
        return false;
    }
}

function initiateAnimation(){
    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 800,
        once: true,
    });
}

function mobCloseMainMenu(){
    $('.navbar-collapse').delay(0).animate({top: '-100%'}, 1000);
}

function mobOpenMainMenu(){
    $('.navbar-collapse').delay(0).animate({top: '0'}, 1000);
}
let carouselAnimationInterval;
function carouselStart(carouselContainerSelector) {
    let carouselAnimationFn;
    let itemsNumberPerSlide, carouselContainerWidth, itemWidth;
    const carouselContainer = $(carouselContainerSelector);
    const windowWidth = window.innerWidth;

    if($('body').hasClass('rtl')){
        carouselContainer.each(function(){
            $(this).delay('0').animate({'right': '0'}, 1000);
        });
    }else{
        carouselContainer.each(function(){
            $(this).delay('0').animate({'left': '0'}, 1000);
        });
    }
    // starting setting items width
    carouselContainer.each(function(){
        let $this = $(this);
        if(windowWidth >= 992){
            itemsNumberPerSlide = $this.attr('itemsNumberPerSlideLg');
        }else if(windowWidth <= 991.98 && windowWidth >= 768){
            itemsNumberPerSlide = $this.attr('itemsNumberPerSlideMd');
        }else if(windowWidth <= 767.98 && windowWidth >= 576){
            itemsNumberPerSlide = $this.attr('itemsNumberPerSlideSm');
        }else if(windowWidth <= 575.98 && windowWidth >= 350){
            itemsNumberPerSlide = $this.attr('itemsNumberPerSlideXs');
        }else if(windowWidth <= 349.98){
            itemsNumberPerSlide = $this.attr('itemsNumberPerSlideXxs');
        }
        carouselContainerWidth = parseInt($this.parent().width());
        itemWidth = carouselContainerWidth / itemsNumberPerSlide;
        $this.attr({'item-width': itemWidth, 'carousel-container-width' : carouselContainerWidth});
        $this.find('li').css('width', itemWidth);
    });
    carouselAnimationFn = function() {
        let $this, left, right;
        let width, itemWidthForScroll, carouselContainerWidthForScroll;

        carouselContainer.each(function(){
            $this = $(this);
            left = parseInt($this.css('left'));
            right = parseInt($this.css('right'));
            width = parseInt($this.css('width'));
            itemWidthForScroll = $this.attr('item-width');
            carouselContainerWidthForScroll = $this.attr('carousel-container-width');
            if($('body').hasClass('rtl')){
                if ( -(right) >= width - carouselContainerWidthForScroll ){
                    $this.delay('0').animate({'right': '0'}, 1000);
                }else{
                    $this.delay('0').animate({'right': right-itemWidthForScroll}, 1000);
                }
            }else{
                if ( -(left) >= width - carouselContainerWidthForScroll ){
                    $this.delay('0').animate({'left': '0'}, 1000);
                }else{
                    $this.delay('0').animate({'left': left-itemWidthForScroll}, 1000);
                }
            }
        });
    };
    /*carouselContainer.each(function(){
        let x = $(this).attr('intervelSpeed');
        console.log(x);
        carouselAnimationInterval = setInterval(carouselAnimationFn, parseInt(x));
    });*/

    carouselAnimationInterval = setInterval(carouselAnimationFn, 3000);

}
function carouselStop() {
    clearInterval(carouselAnimationInterval);
}

function owlStart(){

    let langAR = false;
    if($('body').hasClass('rtl')){
        langAR = true;
    }
    $('#testimonials-blk .owl-carousel').owlCarousel({
        autoplay: true,
        rtl: langAR,
        margin: 10,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,

            },
            1000: {
                items: 3,
            }
        }
    });
    $('.footer-carousel .owl-carousel').owlCarousel({
        autoplay: true,
        rtl: langAR,
        margin: 10,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 3,

            },
            1000: {
                items: 6,
            }
        }
    });
    if(window.innerWidth <= 767.98) {
        $('#badges-blk .owl-carousel').owlCarousel({
            autoplay: true,
            rtl: langAR,
            loop: true,
            margin: 10,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 1,
                    stagePadding: 100,

                }
            }
        });
    }
    $('#event-single-blk .owl-carousel').owlCarousel({
        autoplay: false,
        rtl: langAR,
        items: 1,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
    });
    $('#events-blk .owl-carousel').owlCarousel({
        autoplay: true,
        rtl: langAR,
        items: 4,
        margin: 10,
        nav: false,
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },500: {
                items: 2,
            },
            768: {
                items: 3,

            },
            1200: {
                items: 4,
            }
        }
    });
    $('#golden-plyrs-carousel .owl-carousel').owlCarousel({
        autoplay: true,
        rtl: langAR,
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },500: {
                items: 2,
            },
            768: {
                items: 3,

            },
            1200: {
                items: 4,
            }
        }
    });
    $('.golden-y-gallery .owl-carousel').owlCarousel({
        autoplay: true,
        rtl: langAR,
        loop: true,
        items: 1,
        margin: 10,
        nav: false,
        dots: true,
    });

    $('#news-ticker .owl-carousel').owlCarousel({
        autoplay: true,
        rtl: langAR,
        loop: true,
        items: 1,
        margin: 10,
        nav: false,
        dots: false
    });
}

function checkVisible( elm, eval ) {
    eval = eval || "visible";
    const vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (eval == "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
    if (eval == "above") return ((y < (vpH + st)));
}

function myTabs(){
    $('.tab-lnk').click(function () {
        const targetId= '.'+$(this).attr('target-id');
        $('.tab-container').not(targetId).fadeOut();
        $('.tab-container').not(targetId).removeClass('active');
        $(targetId).fadeIn();
        $(targetId).addClass('active');
        $('.tab-lnk').removeClass('active');
        $(this).addClass('active');
        /*console.log($(targetId).html());*/
        if($(targetId).html() == '' || $(targetId).html() == undefined){
            if(!$('.tabs-blk .row > p').hasClass('tab-alert')){
                if($('body').hasClass('rtl')){
                    $('.tabs-blk .row').append('<p class="tab-alert col-12 text-center">لا يوجد محتوي</p>');
                }else{
                    $('.tabs-blk .row').append('<p class="tab-alert col-12 text-center">No Content</p>');
                }
            }
        }else{
            $('.tab-alert').replaceWith('');
        }
    });
}

function fullPlayerVideo(obj){
    obj.parentElement.querySelector('.full-video-blk').style.display = 'flex';
}
function fullPlayerVideoClose(obj){
    obj.parentElement.querySelector('.full-video-blk').style.display = 'none';
}

function countdown(){
    let interval = setInterval(function() {
        $('.countdownTimer').each(function () {
            //declare start time
            const container = $(this);
            let containerHours = container.find('.t-hours span').text();
            let containerMinutes = container.find('.t-minutes span').text();
            let containerSeconds = container.find('.t-seconds span').text();

            let timer2 = containerHours+':'+containerMinutes+':'+containerSeconds;

            //timer will be [hour, minute, second]
            var timer = timer2.split(':');
            var hours = parseInt(timer[0], 10);
            var minutes = parseInt(timer[1], 10);
            var seconds = parseInt(timer[2], 10);
            //reduce second by one
            --seconds;
            //calculate new minute and hours
            minutes = (seconds < 0) ? --minutes : minutes;
            hours = minutes < 0 ? --hours : hours;

            if (hours < 0) {
                $(container).find('.t-hours span').text('00');
                $(container).find('.t-minutes span').text('00');
                $(container).find('.t-seconds span').text('00');
                return;
            }

            if (minutes == 0 && seconds == 0) {
                if ($('div.goldenGoals').length) {
                    window.location.replace("/goldenGoals");
                } else if ($('div.goldenYouth').length) {
                    window.location.replace("/goldenYouth");
                } else if ($('div.goldenKeeper').length) {
                    window.location.replace("/goldenKeeper");
                }
            }

            seconds = (seconds < 0) ? 59 : seconds;
            seconds = (seconds < 10) ? '0' + seconds : seconds;
            minutes = (minutes < 0) ? 59 : minutes;
            minutes = (minutes < 10) ? '0' + minutes : minutes;

            $(container).find('.t-hours span').text(hours);
            $(container).find('.t-minutes span').text(minutes);
            $(container).find('.t-seconds span').text(seconds);

        });
    }, 1000);
}



$(window).on('resize', function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    carouselStop();
    carouselStart('.my-carousel');
});


let badgedAnim = false;
$(window).on('scroll', function(){
    fixedHeader();

    try{
        if (checkVisible($('#badges-blk'))) {
            if(badgedAnim === false){
                setTimeout(function () {
                    $('#badges-blk .owl-carousel .badge-item:first-child').addClass('badge-anim');
                    $('#badges-blk .owl-carousel .badge-item:nth-child(2)').removeClass('badge-anim');
                    $('#badges-blk .owl-carousel .badge-item:last-child').removeClass('badge-anim');
                }, 1000);
                setTimeout(function () {
                    $('#badges-blk .owl-carousel .badge-item:first-child').removeClass('badge-anim');
                    $('#badges-blk .owl-carousel .badge-item:nth-child(2)').addClass('badge-anim');
                    $('#badges-blk .owl-carousel .badge-item:last-child').removeClass('badge-anim');
                }, 2000);
                setTimeout(function () {
                    $('#badges-blk .owl-carousel .badge-item:first-child').removeClass('badge-anim');
                    $('#badges-blk .owl-carousel .badge-item:nth-child(2)').removeClass('badge-anim');
                    $('#badges-blk .owl-carousel .badge-item:last-child').addClass('badge-anim');
                }, 3000);
                setTimeout(function () {
                    $('#badges-blk .owl-carousel .badge-item:first-child').removeClass('badge-anim');
                    $('#badges-blk .owl-carousel .badge-item:nth-child(2)').removeClass('badge-anim');
                    $('#badges-blk .owl-carousel .badge-item:last-child').removeClass('badge-anim');
                }, 4000);
                badgedAnim = true;
            }else{
                $('#badges-blk .owl-carousel .badge-item').removeClass('badge-anim');
            }

        } else {
            $('#badges-blk .owl-carousel .badge-item').removeClass('badge-anim');
        }
    }catch (e) {

    }

});

$(document).ready(function () {
    initiateAnimation();
    carouselStart('.my-carousel');
    myTabs();
    countdown();


    $('.prof-tabs-blk a:first-child').click();

    $('.ply-blk-container').click(function () {
        const $this = $(this);
        $('.ply-blk-container').not($this).removeClass('active');
        $this.addClass('active');
    });


    $('.header-dropdown  > a').click(function () {
        $(this).closest('.header-dropdown').find('.header-dropdown-lst').slideToggle();
    });

    
    $('.top-actions-toggler').click(function () {
        $('.top-actions').slideToggle();
    });

    $('body').click(function(e) {
        if ($(e.target).closest('.video-container').length === 0 && $(e.target).closest('.ply-video-container').length === 0) {
            $('.full-video-blk').fadeOut();
        }
    });

    try{
        owlStart();
    }catch (e) {
        console.log('No Carousel');
    }

    try {
        $('#datepicker').datepicker();
    }
    catch(err) {
        // NO DATE PICKER IN PAGE
    }
});
