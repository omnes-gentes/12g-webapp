import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MissionaryService } from '../missionary.service';
import { Missionary } from '../missionary';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-missionary-edit',
  templateUrl: './missionary-edit.component.html',
  styles: [
    // todo: figure out how to make width dynamic
    'form { display: flex; flex-direction: column; min-width: 500px; }',
    'form > * { width: 100% }'
  ]
})
export class MissionaryEditComponent implements OnInit {
  id!: string;
  missionary!: Missionary;
  feedback: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionaryService: MissionaryService) {
  }

  ngOnInit() {
    this
      .route
      .params
      .pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Missionary()); }
          return this.missionaryService.findById(id);
        })
      )
      .subscribe(missionary => {
          this.missionary = missionary;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );
  }

  save() {
    this.missionaryService.save(this.missionary).subscribe(
      missionary => {
        this.missionary = missionary;
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(() => {
          this.router.navigate(['/missionaries']);
        }, 1000);
      },
      err => {
        this.feedback = {type: 'warning', message: 'Error saving'};
      }
    );
  }

  cancel() {
    this.router.navigate(['/missionaries']);
  }
}
