import { Routes } from '@angular/router';
import { MissionaryListComponent } from './missionary-list/missionary-list.component';
import { MissionaryEditComponent } from './missionary-edit/missionary-edit.component';

export const FLIGHT_ROUTES: Routes = [
  {
    path: 'missionaries',
    component: MissionaryListComponent
  },
  {
    path: 'missionaries/:id',
    component: MissionaryEditComponent
  }
];
