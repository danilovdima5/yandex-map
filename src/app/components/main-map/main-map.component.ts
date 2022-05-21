import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { MapComponent } from '../../core/abstract/map.abstract';
import { MarkWithID } from '../../core/interfaces/locations.interfaces';
import { UserPositionService } from '../../core/shared/user-position.service';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMapComponent
  extends MapComponent
  implements OnChanges, AfterViewInit
{
  constructor(private userPositionService: UserPositionService) {
    super();
  }

  @Input() marksToShow: MarkWithID[] = [];
  // @ViewChild('map') mapDiv!: ElementRef<HTMLDivElement>;

  currentMarkers: google.maps.Marker[] = [];
  currentUserPosition: google.maps.Marker | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['marksToShow'].currentValue) {
      this.deleteMarks(this.currentMarkers);

      changes['marksToShow'].currentValue.forEach((mark: MarkWithID) =>
        this.initMark(
          {
            latitude: mark.latitude,
            longitude: mark.longitude,
          },
          mark.title
        )
      );
    }
  }

  ngAfterViewInit(): void {
    this.userPositionService.location$
      .pipe(filter((response) => !!response))
      .subscribe((location) => {
        if (location) {
          if (!this.map) {
            this.initMap(location);
          }

          if (this.currentUserPosition)
            this.deleteMarks([this.currentUserPosition]);

          this.currentUserPosition = this.initMark(location, 'You are here');
        }
      });
  }
}
