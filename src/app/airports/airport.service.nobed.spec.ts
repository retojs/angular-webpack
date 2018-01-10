import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {AirportService} from './airport.service';

const mockAirports = {
  DUB: {name: 'Dublin'},
  WRO: {name: 'Wroclaw'},
  MAD: {name: 'Madrid'}
};

describe('Service: AirportService no TestBed', () => {
  let service: AirportService;
  const http = {
    get: jest.fn(() =>
      Observable.of(mockAirports)
    )
  };

  beforeEach(() => {
    service = new AirportService(http as any);
  });

  it('fetchAll$: should return a sorted list', () => {
    service.fetchAll$().subscribe((airports) => {
      expect(http.get).toBeCalledWith('https://foo.bar.com/airports');
      expect(airports.length).toBe(3);
      expect(airports[2][0]).toBe('WRO');
    });
  });

  it('fetchByIATA$: should return the selected airport', () => {
    service.fetchByIATA$('MAD').subscribe((airport) => {
      expect(http.get).toBeCalledWith('https://foo.bar.com/airports');
      expect(airport.name).toBe('Madrid');
    });
  });
});
