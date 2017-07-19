import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import "rxjs/add/operator/filter"

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  pageTitle: string = "";
  pageDesc: string = "";

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        console.log(event);
        if (event.url == "/dashboard") {
          this.pageTitle = "首页";
          this.pageDesc = "";
        } else {
          this.pageTitle = "股票管理系统";
          this.pageDesc = "进行股票信息基本增删改查";
        }
      })
  }

}
