// ANIMATIONS
// -----------------------------------------------
new WOW().init();

var wowSVG = new WOW(
  {
    boxClass:     'wowSVG',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {
        $('#idcard g path').animate({ svgFill: '#3D4944' }, 1500);
        $('#globe g path').delay(500).animate({ svgFill: '#3D4944' }, 3500);
        $('#compass g path').delay(1000).animate({ svgFill: '#3D4944' }, 1500);
    }
  }
);
wowSVG.init();


$(window).on('beforeunload', function() {
    $(window).scrollTop(0,0);
});

$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

$(document).ready(function() {
                  
    $('.intro input[name="email"]').focus();
    
    $( '#intro-background' ).vimeofy({

        'url': 'https://vimeo.com/132244795',
        'color': '#00D8D8',
        'autoplay': true,
        'loop': true,
        'delay':3000,
    });
    
    
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-toggle').click(function(){
      if( $(this).hasClass('collapsed') ){
          $(this).removeClass('collapsed');
      }else{
          $(this).addClass('collapsed');
      }
    });

    $(function(){ 
        var navMain = $(".navbar-main-collapse");

        navMain.on("click", "a", null, function () {
            navMain.collapse('hide');
            $('.navbar-toggle').addClass('collapsed');
        });
     });
    
    $('#registerBtn').on('click', function() {
        $('#register-now input').focus();
    });
    
    $('a.external').on('click', function(event) {
        event.preventDefault();
        newLocation = this.href;
        $('body').fadeOut(1000, newpage);
    });

    function newpage() {
        window.location = newLocation;
    }
    
    
    // MODAL CENTERING
    // -----------------------------------------------
    
    
    function centerModals(){
      $('.modal').each(function(i){
        var $clone = $(this).clone().css('display', 'block').appendTo('body');
        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
        top = top > 0 ? top : 0;
        $clone.remove();
        $(this).find('.modal-content').css("margin-top", top);
      });
    }
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);


    // DIV RESIZING
    // -----------------------------------------------
    function updateContainer() {
        var textDivHeight = $( '.moreinfos-text' ).outerHeight(); 
        var containerWidth = $( '.container').outerWidth();
        if( containerWidth > 500 ) {
            $( '.moreinfos-image' ).css( 'height', textDivHeight );
            } else {
            $( '.moreinfos-image' ).css( 'height', containerWidth/1);
            $( '.intro-heading' ).find('br').remove();
          }
        
        
    };

    updateContainer();
    $(window).resize(function() {
        updateContainer();
    });
    
    
    //TRACKING
    // -----------------------------------------------
    $(document).on('click','.facebook a', function(){ 
        ga('send', 'event', 'SocialShare', 'Facebook');   
    });
                   
    $(document).on('click','.twitter a', function(){ 
        ga('send', 'event', 'SocialShare', 'Twitter');   
    });
        
    $(document).on('click','.social.fb', function(){ 
        ga('send', 'event', 'SocialLink', 'Facebook');   
    });
                   
    $(document).on('click','.social.tw', function(){ 
        ga('send', 'event', 'SocialLink', 'Twitter');   
    });
    
    //video
    //var videocarousel = document.getElementsByTagNamement("video"){
        ///
   // }
});

//Gallery
(function($) {

    /* Masonry Grid */
    $(document).on('add.cards change.cards', function(event) {
        if(typeof $.fn.masonry !== 'undefined') {
            $(event.target).outerFind('.mbr-gallery').each(function() {
                var $msnr = $(this).find('.mbr-gallery-row').masonry({
                    itemSelector: '.mbr-gallery-item',
                    percentPosition: true
                });

                // reload masonry (need for adding new or resort items)
                $msnr.masonry('reloadItems');

                // layout Masonry after each image loads
                $msnr.imagesLoaded().progress(function() {
                    $msnr.masonry('layout');
                });
            });
        }
    });

    var timeout;
    function fitLBtimeout() {
        clearTimeout(timeout);
        timeout = setTimeout(fitLightbox, 50);
    }

    /* Lightbox Fit */
    function fitLightbox() {
        var $lightbox = $('.mbr-gallery .modal');
        if(!$lightbox.length) {
            return;
        }

        var bottomPadding = 30;
        var wndW = $(window).width();
        var wndH = $(window).height();
        $lightbox.each(function() {
            var setWidth, setTop;
            var isShown = $(this).hasClass('in');
            var $modalDialog = $(this).find('.modal-dialog');
            var $currentImg = $modalDialog.find('.item.active > img');

            if($modalDialog.find('.item.prev > img, .item.next > img').length) {
                $currentImg = $modalDialog.find('.item.prev > img, .item.next > img').eq(0);
            }

            var lbW = $currentImg[0].naturalWidth;
            var lbH = $currentImg[0].naturalHeight;

            // height change
            if( wndW / wndH > lbW / lbH) {
                var needH = wndH - bottomPadding * 2;
                setWidth = needH * lbW / lbH;
            }

            // width change
            else {
                setWidth = wndW - bottomPadding * 2;
            }

            // check for maw width
            setWidth = setWidth >= lbW ? lbW : setWidth;

            // set top to vertical center
            setTop = (wndH - bottomPadding * 2 - setWidth * lbH / lbW) / 2;

            $modalDialog.css({
                width: parseInt(setWidth),
                top: setTop
            });
        });
    }
    // $(document).on('add.cards change.cards', fitLightbox);
    $(window).on('resize load', fitLBtimeout);
    $(window).on('show.bs.modal', fitLBtimeout);
    $(window).on('slid.bs.carousel', fitLBtimeout);

}(jQuery));