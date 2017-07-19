import {Component, OnInit} from '@angular/core';
import {Stock, StockService} from "../stock.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl, FormArray} from "@angular/forms";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  formModel: FormGroup;

  stock: Stock = new Stock(0, "", 0, 0, "", []);

  categories = ["IT", "互联网", "金融"];

  constructor(public router: Router, private routerInfo: ActivatedRoute, private stockService: StockService) {
  }

  ngOnInit() {

    let fb = new FormBuilder();
    this.formModel = fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', Validators.required],
        desc: [''],
        categories: fb.array([
          new FormControl(false),
          new FormControl(false),
          new FormControl(false)
        ], this.categoriesSelectValidator)
      }
    );

    let stockId = this.routerInfo.snapshot.params['id'];
    this.stockService.getStock(stockId).subscribe(
      data => {
        this.stock = data;
        this.formModel.reset({
          name: data.name,
          price: data.price,
          desc: data.desc,
          categories: [
            data.categories.indexOf(this.categories[0]) != -1,
            data.categories.indexOf(this.categories[1]) != -1,
            data.categories.indexOf(this.categories[2]) != -1
          ]
        });
      }
    );
  }

  cancel() {
    this.router.navigateByUrl("/stock");
  }

  save() {
    var chineseCategories = [];
    var index = 0;
    for (var i = 0; i < 3; i++) {
      if (this.formModel.value.categories[i]) {
        chineseCategories[index++] = this.categories[i];
      }
    }
    this.formModel.value.rating = this.stock.rating;
    this.formModel.value.categories = chineseCategories;

    console.log(this.formModel.value);
    //this.router.navigateByUrl("/stock");
  }

  categoriesSelectValidator(control: FormArray) {
    var valid = false;
    control.controls.forEach(control => {
      if (control.value) {
        valid = true;
      }
    });
    if (valid) {
      return null;
    } else {
      return {categoriesLength: true};
    }
  }
}
