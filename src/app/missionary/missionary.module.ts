import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MissionaryListComponent } from './missionary-list/missionary-list.component';
import { MissionaryEditComponent } from './missionary-edit/missionary-edit.component';
import { MissionaryService } from './missionary.service';
import { MISSIONARY_ROUTES } from './missionary.routes';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CountryService} from "../services/country/country.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(MISSIONARY_ROUTES),
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  declarations: [
    MissionaryListComponent,
    MissionaryEditComponent,
  ],
  providers: [
    MissionaryService,
    CountryService,
  ],
  exports: []
})
export class MissionaryModule { }
