const templateUrl: string = require<string>("file-loader!./app.component.html");
import { SCBService } from "../../services/scb.service";

const YEARS = [2015, 2010, 2005, 2000, 1995, 1990, 1985, 1980, 1975, 1970];

export class StatApp {
	private selectedYear: number = YEARS[0];
	private availableYears: number[] = YEARS;

	private peopleTotal: number = 0;
	private peopleBorn: number = 0;
	private peopleDead: number = 0;

	private genderData: number[];
	private genderLabels: string[] = ["men", "women"];

	private ageData: number[];
	private ageLabels: string[];

	private countyPeople: number[];
	private countyLabels: string[];

	static $inject = ["scb"];
	constructor(private scbService: SCBService) {
		this.fetchData(this.selectedYear);
	}

	private fetchData(year: number) {
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
			const byPopulationDesc = (countyA, countyB) => countyB.people - countyA.people;
			const top5 = countyData.sort(byPopulationDesc).slice(0, 5);
			this.countyPeople = top5.map(data => data.people);
			this.countyLabels = top5.map(data => data.county);
		});
	}

	private onYearChanged() {
		console.log("Selected year:", this.selectedYear);
		this.fetchData(this.selectedYear);
	}

	static injectInto(m: ng.IModule) {
		m.component("statApp", {
			templateUrl,
			controller: StatApp,
		});
	}
}
