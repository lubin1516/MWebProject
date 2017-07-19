/**
 * Created by lubin on 2017/5/7.
 */
define(['jquery'], function ($) {
    function ScrollTo(opts) {
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
        this.$e1 = $('html,body');
    }

    ScrollTo.prototype.move = function () {
        var opts = this.opts,
            dest = this.opts.dest;

        if ($(window).scrollTop() != dest) {
            if (!this.$e1.is(':animated')) {
                this.$e1.animate({
                    scrollTop: dest
                }, opts.speed);
            }
        }
    };

    ScrollTo.prototype.go = function () {
        var dest = this.opts.dest;
        this.$e1.scrollTop(dest);
    };

    ScrollTo.DEFAULTS = {
        dest: 0,
        speed: 800
    };

    return {
        ScrollTo: ScrollTo
    }
});
