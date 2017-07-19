/**
 * Created by lubin on 2017/5/17.
 */
;(function ($) {
    var lightBox = function () {
        var self = this;
        //创建遮罩和弹出框
        this.popupMask = $('<div id="G-lightBox-mask">');
        this.popupWin = $('<div id="G-lightBox-popup">');
        //保持BODY
        this.bodyNode = $(document.body);

        //渲染剩余的DOM，并且插入到BODY中
        this.renderDOM();

        this.picViewArea = this.popupWin.find("div.lightBox-pic-view");//图片预览区
        this.popupPic = this.popupWin.find("img.lightBox-img");//图片
        this.nextBtn = this.popupWin.find("span.lightBox-next-btn");
        this.prevBtn = this.popupWin.find("span.lightBox-prev-btn");

        this.picCaptionArea = this.popupWin.find("div.lightBox-pic-cation");//图片描述区域
        this.captionText = this.popupWin.find("p.lightBox-pic-desc");//描述
        this.currentIndex = this.popupWin.find("span.lightBox-of-index");//索引
        this.closeBtn = this.popupWin.find("div.lightBox-close-btn");//关闭按钮

        //准备开发事件委托，获取组数据
        this.groupName = null;
        this.groupData = [];
        this.bodyNode.delegate(".js-lightBox,*[data-role=lightBox]", "click", function (e) {
            e.stopPropagation();
            var currentGroupName = $(this).attr("data-group");
            if (currentGroupName != self.groupName) {
                self.groupName = currentGroupName;
                self.getGroup();
            }
            self.initPopup($(this));
        });
        //关闭弹出
        this.popupMask.click(function () {
            $(this).fadeOut();
            self.popupWin.fadeOut();
        });
        this.closeBtn.click(function () {
            self.popupMask.fadeOut();
            self.popupWin.fadeOut();
        });
        //绑定上下切换按钮事件
        this.flag = true;
        this.nextBtn.hover(function () {
            if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                $(this).addClass("lightBox-next-btn-show")
            }
        }, function () {
            if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                $(this).removeClass("lightBox-next-btn-show")
            }
        }).click(function (e) {
            if (!$(this).hasClass("disabled") && self.flag) {
                self.flag = false;
                self.goto("next");
                e.stopPropagation();
            }
        });
        this.prevBtn.hover(function () {
            if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                $(this).addClass("lightBox-prev-btn-show")
            }
        }, function () {
            if (!$(this).hasClass("disabled") && self.groupData.length > 1) {
                $(this).removeClass("lightBox-prev-btn-show")
            }
        }).click(function () {
            if (!$(this).hasClass("disabled")) {
                self.flag = false;
                self.goto("prev");
                e.stopPropagation();
            }
        });
    };
    lightBox.prototype = {
        goto: function (dir) {
            if (dir === "next") {
                this.index++;
                if (this.index >= this.groupData.length - 1) {
                    this.nextBtn.addClass("disabled").removeClass("lightBox-next-btn-show");
                }
                if (this.index != 0) {
                    this.prevBtn.removeClass("disabled");
                }

                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            } else {
                this.index--;
                if (this.index <= 0) {
                    this.prevBtn.addClass("disabled").removeClass("lightBox-prev-btn-show");
                }

                if (this.index != this.groupData.length - 1) {
                    this.nextBtn.removeClass("disabled");
                }

                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            }
        },
        initPopup: function (currentObject) {
            var self = this,
                sourceSrc = currentObject.attr("data-source"),
                currentId = currentObject.attr("data-id");
            this.showMaskAndPopup(sourceSrc, currentId);
        },
        showMaskAndPopup: function (sourceSrc, currentId) {
            var self = this;
            this.popupPic.hide();
            this.picCaptionArea.hide();

            var winWidth = $(window).width(),
                winHeight = $(window).height();

            this.picViewArea.css({
                width: winWidth / 2,
                height: winHeight / 2
            });

            this.popupMask.fadeIn();
            this.popupWin.fadeIn();

            var viewHeight = winHeight / 2 + 10;

            this.popupWin.css({
                width: winWidth / 2 + 10,
                height: viewHeight,
                marginLeft: -(winWidth / 2 + 10) / 2,
                top: -viewHeight
            }).animate({
                top: (winHeight - viewHeight) / 2
            }, function () {
                self.loadPicSize(sourceSrc);
            });
            //获取当前索引
            this.index = this.getIndexOf(currentId);
            var groupDataLength = this.groupData.length;
            //控制上下张按钮显示
            if (groupDataLength > 1) {
                if (this.index === 0) {
                    this.prevBtn.addClass("disabled");
                    this.nextBtn.removeClass("disabled");
                } else if (this.index === groupDataLength - 1) {
                    this.nextBtn.addClass("disabled");
                    this.prevBtn.removeClass("disabled");
                } else {
                    this.prevBtn.removeClass("disabled");
                    this.nextBtn.removeClass("disabled");
                }
            }

        },
        loadPicSize: function (sourceSrc) {
            var self = this;
            self.popupPic.css({
                width: "auto",
                height: "auto"
            });
            this.preLoadImg(sourceSrc, function () {
                self.popupPic.attr("src", sourceSrc);
                var picWidth = self.popupPic.width(),
                    picHeight = self.popupPic.height();

                self.changePic(picWidth, picHeight);
            })
        },
        preLoadImg: function (src, callBack) {
            var img = new Image();
            if (!!window.ActiveXObject) {
                img.onreadystatechange = function () {
                    if (this.readyState == 'complete') {
                        callBack();
                    }
                };
            } else {
                img.onload = function () {
                    callBack();
                }
            }
            img.src = src;
        },
        changePic: function (width, height) {
            var self = this;
            var winHeight = $(window).height();
            var winWidth = $(window).width();

            var scale = Math.min(winHeight / (height + 10), winWidth / (width + 10), 1);

            width *= scale;
            height *= scale;

            this.picViewArea.animate({
                width: width - 10,
                height: height - 10
            });

            this.popupWin.animate({
                width: width,
                height: height,
                marginLeft: -(width / 2),
                top: (winHeight - height) / 2
            }, function () {
                self.popupPic.css({
                    width: width - 10,
                    height: height - 10
                }).fadeIn();
                self.picCaptionArea.fadeIn();
                self.flag = true;
            });
            //设置描述文字和当前索引
            this.captionText.text(this.groupData[this.index].caption);
            this.currentIndex.text("当前索引：" + (this.index + 1) + " of " + this.groupData.length);
        },
        getIndexOf: function (currentId) {
            var index = 0;
            $(this.groupData).each(function (i) {
                index = i;
                if (this.id === currentId) {
                    return false;
                }
            });
            return index;
        },
        getGroup: function () {
            var self = this;
            var groupList = this.bodyNode.find("*[data-group=" + this.groupName + "]");
            //清空数组
            self.groupData.length = 0;
            //遍历
            groupList.each(function () {
                self.groupData.push({
                    src: $(this).attr("data-source"),
                    id: $(this).attr("data-id"),
                    caption: $(this).attr("data-caption")
                });
            });
        },
        renderDOM: function () {
            var strDom = '<div class="lightBox-pic-view">' +
                '<span class="lightBox-btn lightBox-prev-btn"></span>' +
                '<img class="lightBox-img" src="img/2-2.jpg" alt="" >' +
                '<span class="lightBox-btn lightBox-next-btn"></span>' +
                '</div>' +
                '<div class="lightBox-pic-cation">' +
                '<div class="lightBox-cation-area">' +
                '<p class="lightBox-pic-desc"></p>' +
                '<span class="lightBox-of-index"></span>' +
                '</div>' +
                '<div class="lightBox-close-btn"></div>' +
                '</div>';
            //插入到this.popupWin
            this.popupWin.html(strDom);
            //将遮罩和弹出框插入到body中
            this.bodyNode.append(this.popupMask, this.popupWin);
        }
    };

    window["lightBox"] = lightBox;
})(jQuery);
