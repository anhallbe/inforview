import { Component } from '@angular/core';
import { CountyPopulationData, SCBService } from './scb.service';

const YEARS = [2019, 2015, 2010, 2005, 2000, 1995, 1990, 1985, 1980, 1975, 1970];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedYear: number = YEARS[0];
  availableYears: number[] = YEARS;

  peopleTotal = 0;
  peopleBorn = 0;
  peopleDead = 0;

  genderData: number[] = [];
  genderLabels: string[] = ['men', 'women'];

  ageData: number[] = [];
  ageLabels: string[] = [];

  countyPeople: number[] = [];
  countyLabels: string[] = [];

  constructor(private scbService: SCBService) {
    this.fetchData(this.selectedYear);
  }

  private fetchData(year: number): void {
    this.scbService.fetchDeaths(year).then(deaths => {
      this.peopleDead = deaths;
    });

    this.scbService.fetchBirths(year).then(births => {
      this.peopleBorn = births;
    });

    this.scbService.fetchTotalPopulation(year).then(population => {
      this.genderData = [population.men, population.women];
      this.peopleTotal = population.men + population.women;
    });

    this.scbService.fetchAges(year).then(ageData => {
      this.ageLabels = ageData.map(age => age.interval);
      this.ageData = ageData.map(age => age.people);
    });

    this.scbService.fetchCounties(year).then(countyData => {
      const byPopulationDesc: SortFn<CountyPopulationData> = (countyA, countyB) => countyB.people - countyA.people;
      const top5 = countyData.sort(byPopulationDesc).slice(0, 5);
      this.countyPeople = top5.map(data => data.people);
      this.countyLabels = top5.map(data => data.county);
    });
  }

  onYearChanged(year: number): void {
    this.selectedYear = year;
    console.log('Selected year:', this.selectedYear);
    this.fetchData(this.selectedYear);
  }
}

type SortFn<T> = (a: T, b: T) => number;
