import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {compose, head, prop, sortBy, toLower, toPairs} from 'ramda';

@Injectable()
export class AirportService {

  private url = 'https://foo.bar.com/airports';

  constructor(private http: HttpClient) {
  }

  public fetchAll$(): Observable<any> {
    return this.http.get(this.url)
      .map(toPairs)
      .map(sortBy(compose(
        toLower,
        head
      )));
  }

  public fetchByIATA$(iata: string): Observable<any | undefined> {
    return this.http.get(this.url)
      .map(prop(iata));
  }
}
