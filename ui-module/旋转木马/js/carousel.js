/**
 * Created by lubin on 2017/5/8.
 */
;(function ($) {
    var Carousel = function (poster) {
        //保持第一个旋转木马对象
        var self = this;
        this.poster = poster;
        this.posterItemMain = poster.find("ul.poster-list");
        this.nextBtn = poster.find("div.poster-next-btn");
        this.prevBtn = poster.find("div.poster-prev-btn");
        this.posterItems = poster.find("li.poster-item");
        this.posterFirstItem = this.posterItems.eq(0);
        this.posterLastItem = this.posterItems.last();
        this.rotateFlag = true;
        //默认配置参数
        this.setting = {
            "width": 1000,     //幻灯片的宽度
            "height": 270,      //幻灯片的高度
            "posterWidth": 640, //幻灯片第一帧的宽度
            "posterWidth": 640, //幻灯片第一帧的宽度
            "posterHeight": 270,//幻灯片第一帧的高度
            "scale": 0.9,
            "speed": 500,
            "delay": 1000,
            "autoPlay": false,
            "verticalAlign": "middle"
        };
        $.extend(this.setting, this.getSetting());

        //使用配置参数数值设置组件
        this.setSettingValue();
        //设置剩余的帧的位置关系
        this.setPosterPos();

        this.prevBtn.click(function () {
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.carouseRotate("left");
            }
        });

        this.nextBtn.click(function () {
            if (self.rotateFlag) {
                self.rotateFlag = false;
                self.carouseRotate("next");
            }
        });

        if (this.setting.autoPlay) {
            this.autoPlay();
            this.poster.hover(function () {
                window.clearInterval(self.timer);
            }, function () {
                self.autoPlay();
            });
        }
    };
    Carousel.prototype = {
        //自动切换
        autoPlay: function () {
            var self = this;
            this.timer = window.setInterval(function () {
                self.nextBtn.click();
            }, this.setting.delay);

        },
        //旋转
        carouseRotate: function (dir) {
            var _this_ = this;
            var zIndexArr = [];
            if (dir === "left") {
                this.posterItems.each(function () {
                    var self = $(this),
                        prev = self.prev().get(0) ? self.prev() : _this_.posterLastItem,
                        width = prev.css("width"),
                        height = prev.css("height"),
                        zIndex = prev.css("zIndex"),
                        opacity = prev.css("opacity"),
                        left = prev.css("left"),
                        top = prev.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        width: width,
                        height: height,
                        opacity: opacity,
                        left: left,
                        top: top
                    }, _this_.setting.speed, function () {
                        _this_.rotateFlag = true;
                    });
                });
                //zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
                this.posterItems.each(function (i) {
                    $(this).css("zIndex", zIndexArr[i]);
                });
            } else {
                this.posterItems.each(function () {
                    var self = $(this),
                        next = self.next().get(0) ? self.next() : _this_.posterFirstItem,
                        width = next.css("width"),
                        height = next.css("height"),
                        zIndex = next.css("zIndex"),
                        opacity = next.css("opacity"),
                        left = next.css("left"),
                        top = next.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        width: width,
                        height: height,
                        opacity: opacity,
                        left: left,
                        top: top
                    }, _this_.setting.speed, function () {
                        _this_.rotateFlag = true;
                    });
                });
                this.posterItems.each(function (i) {
                    $(this).css("zIndex", zIndexArr[i]);
                });
            }
        },
        //设置剩余的帧的位置关系
        setPosterPos: function () {
            var self = this;

            var sliceItems = this.posterItems.slice(1),
                sliceSize = sliceItems.size() / 2,
                rightSlice = sliceItems.slice(0, sliceSize),
                level = Math.floor(this.posterItems.size() / 2),
                leftSlice = sliceItems.slice(sliceSize);

            //设置右边帧的位置关系和宽度高度top
            var rw = this.setting.posterWidth,
                rh = this.setting.posterHeight,
                gap = ((this.setting.width - this.setting.posterWidth) / 2) / level;

            var firstLeft = (this.setting.width - this.setting.posterWidth) / 2;
            var fixOffsetLeft = firstLeft + rw;

            rightSlice.each(function (i) {
                level--;
                rw = rw * self.setting.scale;
                rh = rh * self.setting.scale;
                var j = i;

                $(this).css({
                    zIndex: level,
                    width: rw,
                    height: rh,
                    opacity: 1 / (++j),
                    left: fixOffsetLeft + (++i) * gap - rw,
                    top: self.setVerticalAlign(rh)
                });
            });

            //设置左边帧的位置关系和宽度高度top
            var lw = rightSlice.last().width(),
                lh = rightSlice.last().height(),
                oloop = Math.floor(this.posterItems.size() / 2);

            leftSlice.each(function (i) {
                $(this).css({
                    zIndex: level,
                    width: lw,
                    height: lh,
                    opacity: 1 / oloop,
                    left: i * gap,
                    top: self.setVerticalAlign(lh)
                });
                lw = lw / self.setting.scale;
                lh = lh / self.setting.scale;
                oloop--;
                level++;
            });

        },
        //设置垂直排列对齐
        setVerticalAlign: function (height) {
            var verticalType = this.setting.verticalAlign;
            var top = 0;

            if (verticalType === "middle") {
                top = (this.setting.height - height) / 2
            } else if (verticalType === "top") {
                top = 0
            } else if (verticalType === "bottom") {
                top = this.setting.height - height
            } else {
                top = (this.setting.height - height) / 2
            }

            return top;
        },
        //设置配置参数数值去控制基本的宽度和高度
        setSettingValue: function () {
            var poster = this.poster,
                setting = this.setting,
                posterItemMain = this.posterItemMain,
                nextBtn = this.nextBtn,
                prevBtn = this.prevBtn,
                posterItems = this.posterItems,
                posterFirstItem = this.posterFirstItem;

            poster.css({
                width: setting.width,
                height: setting.height
            });
            posterItemMain.css({
                width: setting.width,
                height: setting.height
            });
            //技术切换按钮的宽度
            var btn_w = (setting.width - setting.posterWidth) / 2;
            nextBtn.css({
                width: btn_w,
                height: setting.height,
                zIndex: Math.ceil(posterItems.size() / 2)
            });
            prevBtn.css({
                width: btn_w,
                height: setting.height,
                zIndex: Math.ceil(posterItems.size() / 2)
            });
            //设置第一个幻灯片的位置
            posterFirstItem.css({
                width: setting.posterWidth,
                height: setting.posterHeight,
                left: btn_w,
                zIndex: Math.floor(posterItems.size() / 2)
            })
        },
        //获取配置参数
        getSetting: function () {
            var setting = this.poster.attr("data-setting");
            if (setting && setting != "") {
                return $.parseJSON(setting);
            } else {
                return {};
            }
        }
    };
    Carousel.init = function (posters) {
        var _this_ = this;

        posters.each(function () {
            new _this_($(this))
        })
    };

    window["Carousel"] = Carousel;
})(jQuery);