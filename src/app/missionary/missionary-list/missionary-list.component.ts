import { Component, OnInit } from '@angular/core';
import { MissionaryFilter } from '../missionary-filter';
import { MissionaryService } from '../missionary.service';
import { Missionary } from '../missionary';

@Component({
  selector: 'app-missionary',
  templateUrl: 'missionary-list.component.html',
  styles: [
    'table { min-width: 600px }',
  ]
})
export class MissionaryListComponent implements OnInit {
  displayedColumns = ['id', 'from', 'to', 'date', 'actions'];
  filter = new MissionaryFilter();
  selectedMissionary!: Missionary;
  feedback: any = {};

  get missionaryList(): Missionary[] {
    return this.missionaryService.missionaryList;
  }

  constructor(private missionaryService: MissionaryService) {
  }

  ngOnInit() {
    this.search();
  }

  search(): void {
    this.missionaryService.load(this.filter);
  }

  select(selected: Missionary): void {
    this.selectedMissionary = selected;
  }

  delete(missionary: Missionary): void {
    if (confirm('Are you sure?')) {
      this.missionaryService.delete(missionary).subscribe(() => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.search();
          }, 1000);
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      );
    }
  }
}
