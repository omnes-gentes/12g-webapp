import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MissionaryService } from '../missionary.service';
import { Missionary } from '../missionary';
import { map, switchMap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CountryService} from "../../services/country/country.service";
import {FormControl} from "@angular/forms";

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
  countryControl = new FormControl('');
  id!: string;
  missionary!: Missionary;
  feedback: any = {};
  countriesList!: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private missionaryService: MissionaryService,
    private countryService: CountryService) {
  }

  ngOnInit() {
    this.route.params.pipe(
        map(p => p.id),
        switchMap(id => {
          if (id === 'new') { return of(new Missionary()); }
          return this.missionaryService.findById(id);
        })
      ).subscribe(missionary => {
          this.missionary = missionary;
          this.feedback = {};
        },
        err => {
          this.feedback = {type: 'warning', message: 'Error loading'};
        }
      );

    this.countryControl.valueChanges.pipe(map(async (value) => {
      console.log(value)
      this.countriesList = await this.countryService.load({name: value || ''})
      if (this.countriesList?.length === 1) {
        this.missionary.country = this.countriesList[0];
      }
    }));
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
