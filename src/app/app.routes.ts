import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { NotFound } from './pages/not-found/not-found';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Cart } from './pages/cart/cart';
import { Menu } from './pages/menu/menu';
import { Profile } from './pages/profile/profile';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Subscribe } from './pages/subscribe/subscribe';
import { Checkout } from './pages/checkout/checkout';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'menu', component: Menu },
  { path: 'sign-in', component: SignIn, canActivate: [guestGuard] },
  { path: 'sign-up', component: SignUp, canActivate: [guestGuard] },
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'subscribe', component: Subscribe },
  { path: 'menu/:id', component: ProductDetail },
  { path: 'checkout', component: Checkout, canActivate: [authGuard] },
  { path: '**', component: NotFound },
];
