import { Component } from '@angular/core';
import { CountryService } from './service/country.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

interface Country {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weather forecast';

  countries: Country[] = [];
  formGroup!: FormGroup;

  selectedCountry!: Country;
  selectedCountryCode!: Country;

  filteredCountries: any[] = [];

  weatherData: any;
  forcastData: any;

  constructor(
    private countryService: CountryService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getCountry();

    this.formGroup = this.fb.group({
      selectedCountry: [null], // Initialize the form control
    });

    this.formGroup.controls['selectedCountry'].valueChanges.subscribe(
      (value: any) => {
        this.selectedCountry = value?.name || '';
        this.getWeatherForCountry(this.selectedCountry);
        this.getWeatherForcastCountry(this.selectedCountry);
      }
    );

    this.formGroup.controls['selectedCountry'].valueChanges.subscribe(
      (code: any) => {
        this.selectedCountryCode = code?.code || '';
        console.log(  this.selectedCountryCode)
      }
    );
  }

  getCountry() {
    this.countryService.getCountries().then((countries) => {
      this.countries = countries;
    });
  }

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
      let country = (this.countries as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }


    this.filteredCountries = filtered;
  }
  getWeatherForCountry(country: any) {
    this.countryService.getCurrentWeather(country).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  getWeatherForcastCountry(country: any) {
    this.countryService.getWeatherForcast(country).subscribe(
      (data) => {
        this.forcastData = data;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}
