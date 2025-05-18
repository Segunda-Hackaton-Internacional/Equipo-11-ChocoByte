import { Routes } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { BlockchainPageComponent } from './blockchain-page/blockchain-page.component';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { Block } from '@angular/compiler';


export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  { 
    path: 'products/:id', component: BlockchainPageComponent, 
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
