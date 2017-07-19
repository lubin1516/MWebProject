/**
 * Created by lubin on 2017/5/8.
 */
define(['jquery', 'scrollTo'], function ($, scrollTo) {
    function BackTop(el, opts) {
        this.opts = $.extend({}, BackTop.DEFAULTS, opts);
        this.el = el;
        this.scrollTo = new scrollTo.ScrollTo({
            dest: 0,
            speed: this.opts.speed
        });

        this._checkPosition();

        if (this.opts.mode == 'move') {
            this.el.on('click', $.proxy(this._move, this));
        } else {
            this.el.on('click', $.proxy(this._go, this));
        }
        $(window).on('scroll', $.proxy(this._checkPosition, this));

    }

    BackTop.DEFAULTS = {
        mode: "move",
        pos: $(window).height(),
        speed: 800
    };

    BackTop.prototype._move = function () {
        this.scrollTo.move();
    };

    BackTop.prototype._go = function () {
        this.scrollTo.go();
    };

    BackTop.prototype._checkPosition = function checkPosition() {
        var pos = this.opts.pos,
            el = this.el;

        if ($(window).scrollTop() > pos) {
            el.fadeIn();
        } else {
            el.fadeOut();
        }
    };

    $.fn.extend({
        backtop: function (opts) {
            return this.each(function () {
                new BackTop($(this), opts);
            });
        }
    });

    return {
        BackTop: BackTop
    }
});
