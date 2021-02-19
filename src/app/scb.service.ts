import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// const API_BASE = 'https://api.scb.se/OV0104/v1/doris/en/ssd/START'
const API_BASE = '/scb';

const Q_REGION_ALL: scb.IQuery = {
  code: 'Region',
  selection: {
    filter: 'vs:RegionRiket99',
    values: [],
  },
};

const Q_TIME = (year: number = 2015) => ({
  code: 'Tid',
  selection: {
    filter: 'item',
    values: [`${year}`],
  }
});

const Q_GENDER_BOTH: scb.IQuery = {
  code: 'Kon',
  selection: {
    filter: 'item',
    values: ['1', '2'],
  }
};

const Q_AGE_EVERY_10: scb.IQuery = {
  code: 'Alder',
  selection: {
    filter: 'agg:Ålder10år',
    values: [
      '-4',
      '5-14',
      '15-24',
      '25-34',
      '35-44',
      '45-54',
      '55-64',
      '65-74',
      '75-84',
      '85-94',
      '95+',
    ],
  }
};

const COUNTYS: { [code: string]: string } = {
  '01': 'Stockholm',
  '03': 'Uppsala',
  '04': 'Södermanland',
  '05': 'Östergötland',
  '06': 'Jönköping',
  '07': 'Kronoberg',
  '08': 'Kalmar',
  '09': 'Gotland',
  10: 'Blekinge',
  12: 'Skåne',
  13: 'Halland',
  14: 'Västra Götaland',
  17: 'Värmland',
  18: 'Örebro',
  19: 'Västmanland',
  20: 'Dalarna',
  21: 'Gävleborg',
  22: 'Västernorrland',
  23: 'Jämtland',
  24: 'Västerbotten',
  25: 'Norrbotten',
};

const R_JSON: scb.IResponse = {
  format: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class SCBService {
  private cache: { [id: string]: scb.ResponseObject } = {};

  constructor(private http: HttpClient) { }

  fetchTotalPopulation(year: number): Promise<{ men: number, women: number }> {
    const requestData: scb.RequestObject = {
      query: [
        Q_REGION_ALL,
        Q_GENDER_BOTH,
        Q_TIME(year),
        {
          code: 'ContentsCode',
          selection: {
            filter: 'item',
            values: ['BE0101N1'],
          },
        }
      ],
      response: R_JSON,
    };

    return this.post('/BE/BE0101/BE0101A/BefolkningNy', requestData).then(response => {
      const men = parseInt(response.data[0].values[0], 10);
      const women = parseInt(response.data[1].values[0], 10);
      return { men, women };
    });
  }

  fetchDeaths(year: number): Promise<number> {
    const requestData: scb.RequestObject = {
      query: [Q_REGION_ALL, Q_TIME(year)],
      response: R_JSON,
    };

    return this.post('/BE/BE0101/BE0101I/DodaFodelsearK', requestData)
      .then(response => parseInt(response.data[0].values[0], 10));
  }

  fetchBirths(year: number): Promise<number> {
    const requestData: scb.RequestObject = {
      query: [Q_REGION_ALL, Q_TIME(year)],
      response: R_JSON,
    };

    return this.post('/BE/BE0101/BE0101H/FoddaK', requestData)
      .then(response => parseInt(response.data[0].values[0], 10));
  }

  fetchAges(year: number): Promise<{ interval: string, people: number }[]> {
    const requestData: scb.RequestObject = {
      query: [Q_TIME(year), Q_AGE_EVERY_10],
      response: R_JSON
    };

    return this.post('/BE/BE0101/BE0101A/BefolkningR1860', requestData)
      .then(response => response.data.map(data => ({
        interval: data.key[0],
        people: parseInt(data.values[0], 10)
      })
      ));
  }

  fetchCounties(year: number): Promise<CountyPopulationData[]> {
    const requestData: scb.RequestObject = {
      query: [
        {
          code: 'Region',
          selection: {
            filter: 'vs:RegionLän99EjAggr',
            values: Object.keys(COUNTYS),
          },
        },
        {
          code: 'ContentsCode',
          selection: {
            filter: 'item',
            values: ['BE0101U2'],
          },
        },
        Q_TIME(year)
      ],
      response: R_JSON,
    };

    return this.post('/BE/BE0101/BE0101C/BefArealTathetKon', requestData)
      .then(response => {
        return response.data.map(data => {
          const county = COUNTYS[data.key[0]];
          const people = parseInt(data.values[0], 10);
          return { county, people };
        });
      });

  }

  /**
   * apiPath: /BE/BE0101/BE0101I/DodaFodelsearK
   */
  private post(apiPath: string, request: scb.RequestObject): Promise<scb.ResponseObject> {
    return new Promise(resolve => {
      const cacheId = apiPath + JSON.stringify(request); // TODO: Hash or Map or HashMap
      const cachedResponse = this.cache[cacheId];
      if (cachedResponse) {
        console.log('Using cached copy of', apiPath);
        resolve(cachedResponse);
      } else {
        this.http.post<scb.ResponseObject>(API_BASE + apiPath, request).toPromise().then(data => {
          this.cache[cacheId] = data;
          resolve(data);
        });
      }
    });
    // return this.http.post(API_BASE + apiPath, request).then(({data}) => data as scb.ResponseObject)
  }
}

export interface CountyPopulationData { county: string; people: number; }
