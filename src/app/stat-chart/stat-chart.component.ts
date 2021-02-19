import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Color, Label, SingleOrMultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-stat-chart',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.scss']
})
export class StatChartComponent {
  @Input() data: SingleOrMultiDataSet = [];
  @Input() labels: Label[] = [];
  @Input() description?: string;
  @Input() type: ChartType = 'pie';
  colors: Color[] = [{ backgroundColor: 'cornflowerblue' }];
}
