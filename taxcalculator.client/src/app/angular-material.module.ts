import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ]
})
export class AngularMaterialModule { }
