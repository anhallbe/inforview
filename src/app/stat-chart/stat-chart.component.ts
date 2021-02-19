import { Component, Input } from '@angular/core';

@Component({
  selector: 'stat-chart',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.scss']
})
export class StatChartComponent {
  @Input() data?: number[];
  @Input() labels?: string[];
  @Input() description?: string;

  static $inject = ["$scope"];
  constructor() {
    console.log("<stat-chart> Component controller works");
  }
}

// static injectInto(m: ng.IModule) {
//   m.component("statChart", {
//     templateUrl,
//     // controller: StatChart,
//     bindings: {
//       data: "<",
//       labels: "<",
//       type: "@",
//       description: "@",
//     }
//   });
// }
