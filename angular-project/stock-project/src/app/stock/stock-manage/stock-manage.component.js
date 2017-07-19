"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var StockManageComponent = (function () {
    function StockManageComponent() {
    }
    StockManageComponent.prototype.ngOnInit = function () {
        this.stocks = [
            new Stock(1, "第一只股票", 1.99, 3.5, "这是第一只股票，是我学习Angular时创建的", ["IT", "互联网"]),
            new Stock(2, "第二只股票", 2.99, 2.5, "这是第二只股票，是我学习Angular时创建的", ["IT", "金融"]),
            new Stock(3, "第三只股票", 3.99, 1.5, "这是第三只股票，是我学习Angular时创建的", ["互联网"]),
            new Stock(4, "第四只股票", 4.99, 4.5, "这是第四只股票，是我学习Angular时创建的", ["金融"]),
            new Stock(5, "第五只股票", 5.99, 5.0, "这是第五只股票，是我学习Angular时创建的", ["房地产"]),
            new Stock(6, "第六只股票", 6.99, 2.0, "这是第六只股票，是我学习Angular时创建的", ["军工"]),
            new Stock(7, "第七只股票", 7.99, 3.0, "这是第七只股票，是我学习Angular时创建的", ["饮食"]),
            new Stock(8, "第八只股票", 8.99, 4.0, "这是第八只股票，是我学习Angular时创建的", ["IT", "互联网"])
        ];
    };
    StockManageComponent = __decorate([
        core_1.Component({
            selector: 'app-stock-manage',
            templateUrl: './stock-manage.component.html',
            styleUrls: ['./stock-manage.component.css']
        })
    ], StockManageComponent);
    return StockManageComponent;
}());
exports.StockManageComponent = StockManageComponent;
var Stock = (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
//# sourceMappingURL=stock-manage.component.js.map