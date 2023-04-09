import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service';
import { ShareDataService } from '../share/share-data.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  displayTable: boolean = false;
  isAdmin: boolean = false;
  products : Product[] | undefined;
  
  constructor(private router:Router,private productService: ProductService, private tokenService: TokenService, private shareDataService:ShareDataService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data => {
        this.products = data;
        this.displayTable = true;
      }),
    })
  }

  public setProduct(product:Product):void{
    this.shareDataService.setProduct(product);
  }

  handleDelete(id: number) {
   if( confirm('Voulez vous vraiment supprimer ce produit?')){
    this.productService.deleteProduct(id).subscribe({
      next: (data => {
        console.log(data)
        this.router.navigateByUrl('home');
      }),
      error: (error => {
        console.log(error);
      })
    })
   }
  
  }

  handleUpdate(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: (data => {
        console.log(data);
      }),
      error: (error => {
        console.log(error);
      })
    })

  }

  handleLogout() {
    this.tokenService.clearToken();
    this.router.navigateByUrl("login");
  }
}
