import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SigmineRecordModel, getRecordStyle } from '@app/domain/models/simine-record.model';
import { SigmineRecordsUseCase } from '@app/domain/usecases/sigmine-records.usecase';
import { RecordModalComponent } from '@app/shared/components/record-modal/record-modal.component';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [
    SigmineRecordsUseCase
  ]
})
export class HomePage implements OnInit, AfterViewInit {

  map!: L.Map;
  phaseOptions = ['TODOS'];
  useOptions = ['TODOS'];
  models!: SigmineRecordModel[];
  presentationLayer = new L.LayerGroup();

  constructor(
    private readonly sigmineRecordsUseCase: SigmineRecordsUseCase,
    private readonly modalController: ModalController
  ) { }

  async ngAfterViewInit() {
    this.map = L.map('map').setView([-8.047562, -34.877003], 13);
    const tile = L.tileLayer('https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}&s=Ga',
      {
        attribution: 'monumentosoftware.com',
      },)
    tile.addTo(this.map);

  }

  async ngOnInit() {
    const res = await this.sigmineRecordsUseCase.updateQuery({ uf: 'PE' });
    this.phaseOptions.push(...this.getAttributesSet(res.data!, 'fase'));
    this.useOptions.push(...this.getAttributesSet(res.data!, 'uso'));
    this.models = res.data!;
    res.data?.map((record) => {
      const geoFeature = record.asFeature();
      geoFeature.properties = { fase: record.fase };
      const geo = L.geoJSON(geoFeature, { style: getRecordStyle(geoFeature) });
      geo.on('click', () => { this.createModal(record); });
      geo.addTo(this.presentationLayer);
      this.map.addLayer(this.presentationLayer);
    });
  }


  async createModal(record: SigmineRecordModel) {
    const modal = await this.modalController.create(
      {
        component: RecordModalComponent,
        componentProps: {
          record
        }
      }
    );
    await modal.present();
  }


  getAttributesSet(models: SigmineRecordModel[], attribute: string): Array<string> {
    return Array.from(new Set(models.map((model) => Object.getOwnPropertyDescriptor(model, attribute)?.value as string)));
  }

  handlePhase(event: CustomEvent) {
    if (event.detail.value === 'TODOS') {
      this.presentationLayer.clearLayers();
      this.models.map((record) => {
        const geoFeature = record.asFeature();
        geoFeature.properties = { fase: record.fase };
        const geo = L.geoJSON(geoFeature, { style: getRecordStyle(geoFeature) });
        geo.on('click', () => { this.createModal(record); });
        geo.addTo(this.presentationLayer);
        this.map.addLayer(this.presentationLayer);
      });
      return;
    }
    const filtered = this.models.filter((model) => model.fase === event.detail.value);
    this.presentationLayer.clearLayers();
    filtered.map((record) => {
      const geoFeature = record.asFeature();
      geoFeature.properties = { fase: record.fase };
      const geo = L.geoJSON(geoFeature, { style: getRecordStyle(geoFeature) });
      geo.on('click', () => { this.createModal(record); });
      geo.addTo(this.presentationLayer);
      this.map.addLayer(this.presentationLayer);
    });

  }

}
