import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private apiKey = 'be74b7642c6f4b4fbfa120211232608';
  private apiUrl = 'http://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get<any>('assets/data/countries.json')
      .toPromise()
      .then((res) => res.data as any[])
      .then((data) => data);
  }

  getCurrentWeather(country: any): Observable<any> {
    const params = {
      key: this.apiKey,
      q: country,
      aqi: 'yes'
    };
    return this.http.get(this.apiUrl, { params });
  }
  getWeatherForcast(country: any): Observable<any> {
    const params = {
      days: 1,
      key: this.apiKey,
      q: country,
      aqi: 'yes',
      alerts: 'yes'
    };
    return this.http.get('http://api.weatherapi.com/v1/forecast.json', { params });
  }
}
