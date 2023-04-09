import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"", component: LoginComponent},
  {path:"update/product", component:UpdateProductComponent, canActivate:[AuthGuard]},
  {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
