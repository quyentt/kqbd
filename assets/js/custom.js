$('#matchslider').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true,
                centerPadding: '20px'
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                centerPadding: '30px'
            }
        },
        // {
        //   breakpoint: 411,
        //   settings: {
        //     slidesToShow: 2,
        //     slidesToScroll: 2,
        //     centerPadding: '20px'
        //   }
        // }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});

$('#icon-menu').click(function() {
    $('#header nav').addClass("open");
    $('#overhidden').addClass("active");
});
$('#icon-close').click(function() {
    $('#header nav').removeClass("open");
    $('#overhidden').removeClass("active");
});

$('#inputdate').fdatepicker({
    closeButton: true
});


$('.bxh-daily ul').each(function() {
    var $ul = $(this),
        $lis = $ul.find('li:gt(10)'),
        isExpanded = $ul.hasClass('expanded');
    $lis[isExpanded ? 'show' : 'hide']();
    if ($lis.length > 0) {
        $ul
            .append($('<span class="showmore"><li class="expand">' + (isExpanded ? 'Show Less' : 'Show More') + '</li></span>')
                .click(function(event) {
                    var isExpanded = $ul.hasClass('expanded');
                    event.preventDefault();
                    $(this).html(isExpanded ? 'Show More' : 'Show Less');
                    $ul.toggleClass('expanded');
                    $lis.toggle();
                })
            );
    }
});
$('.toggle').first().addClass('current');
$('.toggle').first().next().addClass('show');
$('.toggle').first().next().slideDown(350);
$('.toggle').click(function(e) {
    e.preventDefault();
    var $this = $(this);
    if ($this.next().hasClass('show')) {
        $this.removeClass('current');
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $('.toggle').removeClass('current');
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.addClass('current');
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
});
if (screen.width < 576) {
    $('#s_giaidau .block-title span').click(function() {
        $('#s_giaidau .block-content').slideToggle();
        $('#s_giaidau #search').slideToggle();
    });
    $('div.tab-content').not('[data-tab=1]').addClass('hide');
    $('#tabs-his li').first().addClass('active');
    $('#tabs-his li').on('click', function() {
        $('#tabs-his li').not(this).removeClass('active');
        $(this).addClass("active");
        //start sort
        var sortable = $(this).attr('data-tab');
        $('div[data-tab = ' + sortable + ']').removeClass('hide');
        $('div.tab-content').not('[data-tab=' + sortable + ']').addClass('hide');
    });
    //add an all option - to show all tabs when clicked
    $('li[data-tab=all]').on('click', function() {
        $(this).addClass('active');
        $('div.tab-content').removeClass('hide');
    });
}
$('ul#giaikhac-sidebar').on('click', '.fa-caret-right', function() {
    //remove the show class and assign hidden
    $(this).toggleClass('fa-caret-down fa-caret-right');
    //the subfield is a child of the parent not the next sibling
    $(this).siblings('ul#giaikhac-sidebar ul').show('fast');
});
$('ul#giaikhac-sidebar').on('click', '.fa-caret-down', function() {
    $(this).toggleClass('fa-caret-right fa-caret-down');
    $(this).siblings('ul#giaikhac-sidebar ul').hide('fast');
});