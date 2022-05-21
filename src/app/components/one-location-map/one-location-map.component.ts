import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { MapComponent } from '../../core/abstract/map.abstract';
import { Mark } from '../../core/interfaces/locations.interfaces';
import { Coords } from '../../core/interfaces/user.interfaces';
import { UserPositionService } from '../../core/shared/user-position.service';

@Component({
  selector: 'app-one-location-map',
  templateUrl: './one-location-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneLocationMapComponent
  extends MapComponent
  implements OnChanges, AfterViewInit
{
  constructor(private userPositionService: UserPositionService) {
    super();
  }

  @Input() markToShow!: Mark;
  @Input() isNew = false;
  @Output() onMapClick = new EventEmitter<Coords>();

  currentMark!: google.maps.Marker;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markToShow'].currentValue) {
      this.deleteMarks([this.currentMark]);

      const markToShow = changes['markToShow'].currentValue as Mark;
      this.currentMark = this.initMark(
        {
          latitude: markToShow.latitude,
          longitude: markToShow.longitude,
        },
        markToShow.title
      );
    }
  }

  ngAfterViewInit(): void {
    if (this.isNew) {
      this.userPositionService.location$
        .pipe(
          filter((response) => !!response),
          take(1)
        )
        .subscribe((location) => {
          if (location) {
            this.initMap(location);
            this.setClickListener();
            this.currentMark = this.initMark(location, 'You are here');
            this.onMapClick.emit(location);
          }
        });
    } else {
      this.initMap({
        latitude: this.markToShow.latitude,
        longitude: this.markToShow.longitude,
      });

      this.currentMark = this.initMark(
        {
          latitude: this.markToShow.latitude,
          longitude: this.markToShow.longitude,
        },
        this.markToShow.title
      );

      this.setClickListener();
    }
  }

  private setClickListener() {
    if (this.map) {
      google.maps.event.addListener(this.map, 'click', (event) => {
        this.onMapClick.emit({
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng(),
        });
      });
    }
  }
}
