import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {
    // this.notifier = toastr
  }
  private notifier: ToastrService

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (localStorage.getItem('token') !=null)
    return true;
    else
    {
      this.router.navigate(['/signin']);
      this.toastr.error('Please sign in with your credentials or sign up', 'Authentication Failed')
      return false;
    }
  }
}
