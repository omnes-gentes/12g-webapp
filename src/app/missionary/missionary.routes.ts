import { Routes } from '@angular/router';
import { MissionaryListComponent } from './missionary-list/missionary-list.component';
import { MissionaryEditComponent } from './missionary-edit/missionary-edit.component';

export const MISSIONARY_ROUTES: Routes = [
  {
    path: 'missionaries',
    component: MissionaryListComponent
  },
  {
    path: 'missionaries/:id',
    component: MissionaryEditComponent
  }
];
