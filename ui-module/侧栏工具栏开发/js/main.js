/**
 * Created by lubin on 2017/5/3.
 */
requirejs.config({
    paths: {
        jquery: "jquery-1.8.3.min"
    }
});

requirejs(['jquery', 'backTop'], function ($, backTop) {
    /*var scroll = new scrollTo.ScrollTo({

     });

     $('#backTop').on('click', $.proxy(scroll.move, scroll));
     $(window).on('scroll', function () {
     checkPosition($(window).height())
     });

     function checkPosition($pos) {
     if ($(window).scrollTop() > $pos) {
     $('#backTop').fadeIn();
     } else {
     $('#backTop').fadeOut();
     }
     }

     checkPosition($(window).height());*/

    // var backTop = new backTop.BackTop($('#backTop'), {
    //     mode: 'move',
    //     speed: 2000
    // });

    $('#backTop').backtop({mode: 'move'});
});