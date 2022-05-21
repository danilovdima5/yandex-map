import {
  AfterViewInit,
  Directive,
  ElementRef,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Coords } from '../interfaces/user.interfaces';

@Directive()
export abstract class MapComponent implements AfterViewInit {
  constructor() {}

  @ViewChild('map') mapDiv!: ElementRef<HTMLDivElement>;

  map: google.maps.Map | null = null;

  abstract ngOnChanges(changes: SimpleChanges): void;

  abstract ngAfterViewInit(): void;

  protected initMap(initLocation: Coords) {
    this.map = new google.maps.Map(this.mapDiv.nativeElement, {
      zoom: 12,
      center: new google.maps.LatLng(
        initLocation.latitude,
        initLocation.longitude
      ),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });
  }

  protected initMark(coords: Coords, text: string): google.maps.Marker {
    const details = new google.maps.InfoWindow({
      content: `<h6>${text}</h6>`,
    });

    const mark = new google.maps.Marker({
      position: new google.maps.LatLng(coords.latitude, coords.longitude),
      map: this.map as google.maps.Map,
    });

    mark.addListener('click', () => {
      details.open(this.map as google.maps.Map, mark);
    });

    mark.addListener('dblclick', () => {
      details.close();
    });

    return mark;
  }

  protected deleteMarks(marks: Array<google.maps.Marker | undefined>): void {
    marks.forEach((mark) => mark?.setMap(null));
  }
}
