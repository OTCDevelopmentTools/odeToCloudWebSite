jQuery(document).ready(function(jQuery) {            
            var topMenu = jQuery("#jetmenu"),
                offset = 40,
                topMenuHeight = topMenu.outerHeight()+offset,
                // All list items
                menuItems =  topMenu.find('a[href*="#"]'),
                // Anchors corresponding to menu items
                scrollItems = menuItems.map(function(){
                  var href = jQuery(this).attr("href"),
                  id = href.substring(href.indexOf('#')),
                  item = jQuery(id);
                  //console.log(item)
                  if (item.length) { return item; }
                  //$(section).css('padding-top', '189px'); 
                });

            // so we can get a fancy scroll animation
            menuItems.click(function(e){
              var href = jQuery(this).attr("href"),
                id = href.substring(href.indexOf('#'));
                  offsetTop = href === "#" ? 0 : jQuery(id).offset().top-topMenuHeight+1;
              jQuery('html, body').stop().animate({ 
                  scrollTop: offsetTop,
              }, 60);
              e.preventDefault();
            });

            // Bind to scroll
            jQuery(window).scroll(function(){
               // Get container scroll position
               var fromTop = jQuery(this).scrollTop()+topMenuHeight;

               // Get id of current scroll item
               var cur = scrollItems.map(function(){
                 if (jQuery(this).offset().top < fromTop)
                   return this;
               });

               // Get the id of the current element
               cur = cur[cur.length-1];
               var id = cur && cur.length ? cur[0].id : "";               
               
               menuItems.parent().removeClass("active");
               if(id){
                    menuItems.parent().end().filter("[href*='#"+id+"']").parent().addClass("active");
               }
               
            })
})

jQuery(document).ready(function($) {

  // Accordion Toggle
  var iconOpen = 'icon-minus', iconClose = 'icon-plus';

  $(document).on('show.bs.collapse hide.bs.collapse', '.accordion', function(e) {
    var $target = $(e.target)
    $target.siblings('.accordion-heading')
      .find('em').toggleClass(iconOpen + ' ' + iconClose);
    if (e.type == 'show')
      $target.prev('.accordion-heading').find('.accordion-toggle').addClass('active');
    if (e.type == 'hide')
      $(this).find('.accordion-toggle').not($target).removeClass('active');
  });

  // DM Top
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $('.dmtop').css({
        bottom: "25px"
      });
    } else {
      $('.dmtop').css({
        bottom: "-100px"
      });
    }
  });

  $('.dmtop').click(function() {
    $('html, body').animate({
      scrollTop: '0px'
    }, 800);
    return false;
  });

  // DM Menu
  $('#nav').affix({
    offset: {
      top: $('#nav').offset().top
    }
  });


    $('.jetmenu li').click(function() {
        $('.jetmenu li.active').removeClass('active');
        $(this).addClass('active');
    });



  // Menu
  $(".panel a").click(function(e) {
    e.preventDefault();
    var style = $(this).attr("class");
    $(".jetmenu").removeAttr("class").addClass("jetmenu").addClass(style);
  });
  $().jetmenu();



  // Facts
  function count($this) {
    var current = parseInt($this.html(), 10);
    current = current + 1; /* Where 50 is increment */

    $this.html(++current);
    if (current > $this.data('count')) {
      $this.html($this.data('count'));
    } else {
      setTimeout(function() {
        count($this)
      }, 50);
    }
  }

  $(".stat-count").each(function() {
    $(this).data('count', parseInt($(this).html(), 10));
    $(this).html('0');
    count($(this));
  });

  // Tooltip
  $('.social_buttons, .client').tooltip({
    selector: "a[data-toggle=tooltip]"
  })

  $('.social_buttons, .client').tooltip();

  // prettyPhoto
  $(document).ready(function() {
    $('a[data-gal]').each(function() {
      $(this).attr('rel', $(this).data('gal'));
    });
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
      animationSpeed: 'slow',
      theme: 'light_square',
      slideshow: false,
      overlay_gallery: false,
      social_tools: false,
      deeplinking: false
    });
  });

  // Hover and Carousel
  $('.owl-carousel > .item ').each(function() {
    $(this).hoverdir();
  });
  $("#owl-demo").owlCarousel({
    items: 5,
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    stopOnHover: true,
    lazyLoad: true,
    transitionStyle: "fade",
    navigation: true,
    pagination: false,
  });

  // tooltip demo
  $("[data-toggle=tooltip]").tooltip();

  // popover demo
  $("[data-toggle=popover]").popover();

  // Chart Effects;
	$('.chart').easyPieChart({
		easing: 'easeOutBounce',
		size : 180,
		animate : 2000,
		lineWidth : 10,
		lineCap : 'square',
		lineWidth : 18,
		barColor : '#3498db',
		trackColor : '#f9f9f9',
		scaleColor : false,
		onStep: function(from, to, percent) {
		$(this.el).find('.percent').text(Math.round(percent)+'%');
		}
	});

  // Popular Items Carousel
  $(document).ready(function() {
    $("#popularitems").owlCarousel({
      items: 3,
      lazyLoad: true,
      navigation: false
    });
  });

  // Hover and Carousel on Home #1
  $('.owl-carousel > .item ').each(function() {
    $(this).hoverdir();
  });

  $("#owl-related").owlCarousel({
    items: 3,
    autoPlay: 3000, //Set AutoPlay to 3 seconds
    stopOnHover: true,
    lazyLoad: true,
    transitionStyle: "fade",
    navigation: true,
    pagination: false,
  });

  // Portfolio
  var $container = $('.portfolio'),
    $items = $container.find('.market-item'),
    portfolioLayout = 'fitRows';

  if ($container.hasClass('portfolio-centered')) {
    portfolioLayout = 'masonry';
  }

  $container.isotope({
    filter: '*',
    animationEngine: 'best-available',
    layoutMode: portfolioLayout,
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false
    },
    masonry: {}
  }, refreshWaypoints());

  function refreshWaypoints() {
    setTimeout(function() {}, 1000);
  }

  $('nav.portfolio-filter ul a').on('click', function() {
    var selector = $(this).attr('data-filter');
    $container.isotope({
      filter: selector
    }, refreshWaypoints());
    $('nav.portfolio-filter ul a').removeClass('active');
    $(this).addClass('active');
    return false;
  });

  function getColumnNumber() {
    var winWidth = $(window).width(),
      columnNumber = 2;
  }

  function setColumns() {
    var winWidth = $(window).width(),
      columnNumber = getColumnNumber(),
      itemWidth = Math.floor(winWidth / columnNumber);

    $container.find('.market-item').each(function() {
      $(this).css({
        width: itemWidth + 'px'
      });
    });
  }

  function setPortfolio() {
    setColumns();
    $container.isotope('reLayout');
  }

  $container.imagesLoaded(function() {
    setPortfolio();
  });

  $(window).on('resize', function() {
    setPortfolio();
  });


});




















