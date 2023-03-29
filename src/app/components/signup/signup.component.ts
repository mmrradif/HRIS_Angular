
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormValidationService } from 'src/app/services/Validation/form-validation.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../../CustomCss/formStyles.css']
})
export class SignupComponent {

  signupForm!:FormGroup
  constructor(
    private formbuilder:FormBuilder, 
    private auth:AuthService, 
    private router:Router,
    private snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    private formValidationService: FormValidationService,
    private  appComponent:AppComponent,
    private cd: ChangeDetectorRef
    ){}

  ngOnInit():void{

    this.cd.detectChanges();

    this.appComponent.showNavbar = false;

    this.signupForm = this.formbuilder.group({
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value);

      // signup logic here

      this.auth.signup(this.signupForm.value).subscribe({
        next:(response=>{

          const config = this.snackbarService.getSnackBarConfig();
          const message = `Successfully registered as ${this.signupForm.value.userName}`;
          this.snackBar.open(message, 'Close', config);

          this.signupForm.reset();
          this.router.navigate(['dashboard']);
        }),
        error:(err=>{
          const config = this.snackbarService.getSnackBarConfig();
          const message = 'Something went wrong';
          this.snackBar.open(message, 'Close', config);
        })
      });
    }
    else{
      console.log('Form is not valid');
      this.formValidationService.validateFormFields(this.signupForm); // call the method from the service
      alert("Form is invalid");
    }
 
  }
}
