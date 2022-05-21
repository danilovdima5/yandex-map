import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MarkWithID } from '../../core/interfaces/locations.interfaces';

@Component({
  selector: 'app-list-of-locations',
  templateUrl: './list-of-locations.component.html',
  styleUrls: ['./list-of-locations.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOfLocationsComponent {
  @Input() marks: MarkWithID[] | null = null;
  @Input() screenSize: number = 1000;

  @Output() onRemoveLocation = new EventEmitter<string>();
}
