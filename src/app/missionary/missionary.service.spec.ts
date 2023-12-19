import { TestBed } from '@angular/core/testing';
import { MissionaryService } from './missionary.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MissionaryService', () => {
  let service: MissionaryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MissionaryService]
    });

    service = TestBed.inject(MissionaryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
