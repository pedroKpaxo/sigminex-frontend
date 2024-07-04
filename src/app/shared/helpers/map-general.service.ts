import { Map, tileLayer, icon, MapOptions } from 'leaflet';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Coordinates } from '../types/coordinates';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class MapGeneralService {
  defaultIconUrl =
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
  defaultShadownIconUrl =
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
  icon = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 0],
      iconUrl: this.defaultIconUrl,
      shadowUrl: this.defaultShadownIconUrl,
    }),
  };

  public readonly initialCoords: Coordinates = [-8.6448, -32.216721];
  public map!: Map;
  constructor(
    private spinnerService: SpinnerService,
    private toastService: ToastService,
  ) { }

  /**
   * This function sets the map up.
   * Can be used in the normal cycle or Ionic cycles
   * @param divId A id representing the div elent
   * @param initialCords Initial cordinates to the map
   * @param mapOptions A leaflet MapOptions object
   * @returns A Map instance
   */
  async setupMap(
    divId: string,
    initialCords: Coordinates = this.initialCoords,
    initialZoom: number = 5,
    mapOptions: MapOptions = { zoomControl: false },
  ) {
    const spinner = await this.spinnerService.showSpinner('Preparando o mapa');
    try {
      const map = new Map(divId, { ...mapOptions }).setView(
        initialCords,
        initialZoom,
      );
      const tile = await this.getDefaultSateliteLayer();
      if (tile) tile.addTo(map);
      return map;
    } catch (error) {
      console.error(error);
      this.toastService.error('Erro ao carregar o mapa.');
      return;
    } finally {
      await spinner.dismiss();
    }
  }

  /**
   * Default satelite getter
   * @returns a default satelite TileLayer object
   */
  async getDefaultSateliteLayer() {
    try {
      return tileLayer(
        'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga',
        {
          attribution: 'monumentosoftware.com',
        },
      );
    } catch (error) {
      console.warn(error);
      return;
    }
  }
  /**
   * Default satelite getter
   * @returns a default satelite TileLayer object
   */
  async getOpenStreetMaps() {
    try {
      return tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
    } catch (error) {
      console.warn(error);
      return;
    }
  }
}
