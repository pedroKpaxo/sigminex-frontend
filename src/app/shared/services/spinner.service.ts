import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  constructor(private loadingController: LoadingController) {}

  async showSpinner(message: string = 'Aguarde...') {
    const spinner = await this.loadingController.create({
      message,
      translucent: true,
    });
    await spinner.present();
    return spinner;
  }
}
