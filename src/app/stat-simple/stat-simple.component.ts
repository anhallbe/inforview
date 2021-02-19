import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-simple',
  templateUrl: './stat-simple.component.html',
  styleUrls: ['./stat-simple.component.scss']
})
export class StatSimpleComponent {
  @Input() value?: string | null;
  @Input() description?: string;
}
