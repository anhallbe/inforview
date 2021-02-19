import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.scss']
})
export class StatChartComponent {
  @Input() data?: number[];
  @Input() labels?: string[];
  @Input() description?: string;
}
