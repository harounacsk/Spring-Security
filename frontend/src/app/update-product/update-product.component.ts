import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ShareDataService } from '../share/share-data.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: Product | undefined;
  updateProductFormGroup!: FormGroup;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private shareDataService: ShareDataService) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getProduct();
  }
  public getProduct(): void {
    this.shareDataService.getProduct().subscribe({
      next: (data => {
        if(data.name!=''){
          this.product = data;
        }
        this.product = data;

        if (this.product != undefined) {
          if(this.product != undefined){
            this.updateProductFormGroup = this.fb.group({
              id: new FormControl(this.product.id, [Validators.required]),
              name: new FormControl(this.product.name, [Validators.required, Validators.minLength(3)]),
              price: new FormControl(this.product.price, [Validators.required, Validators.min(0.1)]),
              notice: new FormControl(this.product.notice, [Validators.required, Validators.minLength(3)]),
            })
          }
          
        }
      })
    });
  }

  public updateProduct() {
    let product: Product = {
      id: this.updateProductFormGroup.value.id,
      name: this.updateProductFormGroup.value.name,
      price: this.updateProductFormGroup.value.price,
      notice: this.updateProductFormGroup.value.notice
    };
    this.productService.updateProduct(product).subscribe({
      next: (data) => {
        console.log(data);
        alert(data);
      }
    });
    
  }
}
