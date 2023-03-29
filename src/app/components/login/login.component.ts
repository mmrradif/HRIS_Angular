import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { FormValidationService } from 'src/app/services/Validation/form-validation.service';

// import the styles from your CSS file
// import '../../CustomCss';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../CustomCss/formStyles.css'] 
})
export class LoginComponent {
  loginForm! : FormGroup;
  
  constructor(
    private fb:FormBuilder, 
    private auth:AuthService, 
    private router:Router,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private formValidationService: FormValidationService,
    private appComponent: AppComponent,
    private cd: ChangeDetectorRef
    ){}

    

  ngOnInit(): void{


    this.appComponent.showNavbar = false;

    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password:['',Validators.required]
    });
  }

  onLogIn(){

    this.cd.detectChanges();

    
    if(this.loginForm.valid){
      console.log(this.loginForm.value);

      // send object to database
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          
          const config = this.snackbarService.getSnackBarConfig();
          const message = `Successfully logged in as ${this.loginForm.value.username}`;
          this.snackBar.open(message, 'Close', config);

          this.auth.storeToken(res.token);
                   
          this.loginForm.reset();

          this.router.navigate(['dashboard']);
        },
        error:(err)=>{
          const config = this.snackbarService.getSnackBarConfig();
          const message = 'Something went wrong';
          this.snackBar.open(message, 'Close', config);
          
        }
      });

    }
    else{
      console.log('Form is not valid');
      this.formValidationService.validateFormFields(this.loginForm);
      const config = this.snackbarService.getSnackBarConfig();
      const message = 'Invalid Form';
      this.snackBar.open(message, 'Close', config);
    }
  }


}










// -----------------------------------




// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private auth: AuthService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) { }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   onLogIn() {
//     if (this.loginForm.valid) {
//       console.log(this.loginForm.value);

//       // send object to database
//       this.auth.login(this.loginForm.value).subscribe({
//         next: (res) => {
//           const username = this.loginForm.value.username;
//           const message = `Successfully logged in as ${username}`;
//           const config = this.getSnackBarConfig();
//           this.snackBar.open(message, 'Close', config);
//           this.loginForm.reset();
//           this.router.navigate(['dashboard']);
//         },
//         error: (err) => {
//           const config = this.getSnackBarConfig();
//           this.snackBar.open("Something went wrong", 'Close', config);
//         }
//       });

//     } else {
//       console.log('Form is not valid');
//       this.validateFormFields(this.loginForm);
//       alert("Form is invalid");
//     }
//   }

//   private getSnackBarConfig() {
//     const config = new MatSnackBarConfig();
//     config.verticalPosition = 'top';
//     config.horizontalPosition = 'center';
//     config.duration = 3000; // set duration to 3 seconds
//     return config;
//   }

//   private validateFormFields(formGroup: FormGroup) {
//     Object.keys(formGroup.controls).forEach(field => {
//       const control = formGroup.get(field);
//       if (control instanceof FormControl) {
//         control.markAsDirty({ onlySelf: true });
//       } else if (control instanceof FormGroup) {
//         this.validateFormFields(control);
//       }
//     })
//   }
// }



// -------------------------






















// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { NgToastService } from 'ng-angular-popup';
// import { AuthService } from 'src/app/services/auth.service';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm! : FormGroup;
//   constructor(
//     private fb:FormBuilder, 
//     private auth:AuthService, 
//     private router:Router,
//     private snackBar: MatSnackBar

//     ){}

//   ngOnInit(): void{
//     this.loginForm = this.fb.group({
//       username: ['',Validators.required],
//       password:['',Validators.required]
//     });
//   }

//   onLogIn(){
//     if(this.loginForm.valid){
//       console.log(this.loginForm.value);

//       // send object to database
//       this.auth.login(this.loginForm.value).subscribe({
//         next: (res) => {
//           const username = this.loginForm.value.username;
//           const message = `Successfully logged in as ${username}`;
//           const config = new MatSnackBarConfig();
//           config.verticalPosition = 'top';
//           config.horizontalPosition = 'center';
//           config.duration = 3000; // set duration to 3 seconds
//           this.snackBar.open(message, 'Close', config);
//           this.loginForm.reset();
//           this.router.navigate(['dashboard']);
//         },      
//         error:(err)=>{
//           // alert(err?.error.message)

          
//         }
//       });

//     }
//     else{
//       console.log('Form is not valid');
//       this.validateFormFields(this.loginForm);
//       alert("Form is invalid");
//     }

//   }

//   private validateFormFields(formGroup:FormGroup) {
//     Object.keys(formGroup.controls).forEach(field =>{
//       const control = formGroup.get(field);
//       if(control instanceof FormControl){
//         control.markAsDirty({onlySelf:true});
//       }
//       else if(control instanceof FormGroup){
//         this.validateFormFields(control);
//       }
//   })
// }
// }




// --------------------- upper solution




// import { Component } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder, 
//     private auth: AuthService, 
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       username: ['',Validators.required],
//       password: ['',Validators.required]
//     });
//   }

//   onLogIn() {
//     if (this.loginForm.valid) {
//       console.log(this.loginForm.value);

//       // send object to database
//       this.auth.login(this.loginForm.value).subscribe({
//         next:(res) => {  
//           this.loginForm.reset();
//           this.router.navigate(['dashboard']);
          
//           // show success snackbar
//           this.snackBar.open('Logged in successfully!', 'Close', { duration: 3000 });
//         },
//         error:(err) => {
//           // show error snackbar
//           this.snackBar.open(err?.error.message, 'Close', { duration: 3000 });
//         }
//       });
//     } else {
//       console.log('Form is not valid');
//       this.validateFormFields(this.loginForm);
//       alert("Form is invalid");
//     }
//   }

//   private validateFormFields(formGroup: FormGroup) {
//     Object.keys(formGroup.controls).forEach(field => {
//       const control = formGroup.get(field);
//       if (control instanceof FormControl) {
//         control.markAsDirty({onlySelf:true});
//       } else if (control instanceof FormGroup) {
//         this.validateFormFields(control);
//       }
//     })
//   }
//}
