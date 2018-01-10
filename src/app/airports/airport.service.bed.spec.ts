import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {AirportService} from './airport.service';

const mockAirports = {
  DUB: {name: 'Dublin'},
  WRO: {name: 'Wroclaw'},
  MAD: {name: 'Madrid'}
};

describe('Service: AirportService', () => {
  let httpMock: HttpTestingController;
  let service: AirportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AirportService
      ]
    });
  });

  beforeEach(
    inject([AirportService, HttpTestingController], (_service: any, _httpMock: any) => {
      service = _service;
      httpMock = _httpMock;
    }));

  it('fetchAll$: should return a sorted list', () => {
    service.fetchAll$().subscribe(airports => {
      expect(airports.length).toBe(3);
      expect(airports[2][0]).toBe('WRO');
    });

    const req = httpMock.expectOne('https://foo.bar.com/airports');

    req.flush(mockAirports);
    httpMock.verify();
  });

  it('fetchByIATA$: should return the selected airport', () => {
    service.fetchByIATA$('MAD').subscribe(airport => {
      expect(airport.name).toBe('Madrid');
    });

    const req = httpMock.expectOne('https://foo.bar.com/airports');

    req.flush(mockAirports);
    httpMock.verify();
  });

  // it('should fail', () => {
  //   expect('true').toBe('false');
  // });

});
