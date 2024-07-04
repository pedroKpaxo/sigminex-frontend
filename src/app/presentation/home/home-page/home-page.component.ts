import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { MapGeneralService } from '@app/shared/helpers/map-general.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  map!: L.Map;

  constructor(
    private mapService: MapGeneralService
  ) { }

  async ngOnInit() {
    this.map = await this.mapService.setupMap('map') as L.Map;
  }

}
