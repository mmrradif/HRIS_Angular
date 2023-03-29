import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService
    ){}

  canActivate():boolean{
    if(this.auth.isLogedIn()){
      return true;
    }
    else{
      const config = this.snackbarService.
      getSnackBarConfig();
        const message = 'Please Login First';
        this.snackBar.open(message, 'Close', config);
      this.router.navigate(['login'])
      return false;
    }
   
  }    
}



// import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { CanActivate, Router} from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { SnackbarService } from '../services/snackbar/snackbar.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(
//     private auth: AuthService,
//     private router: Router,
//     private snackBar: MatSnackBar,
//     private snackbarService: SnackbarService
//     ){}

//   canActivate():boolean{
//     if(this.auth.isLogedIn()){
//       return true;
//     }
//     else{
//       const config = this.snackbarService.
//       getSnackBarConfig();
//         const message = 'Please Login First';
//         this.snackBar.open(message, 'Close', config);
//       this.router.navigate(['login'])
//       return false;
//     }
   
//   }    
// }