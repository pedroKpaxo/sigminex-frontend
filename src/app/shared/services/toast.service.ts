import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

/**
 * Options for configuring toast messages.
 */
interface ToastServiceOptions {
  /** The duration of the toast message in milliseconds. */
  duration: number;
  /** The position of the toast message on the screen. */
  position: 'top' | 'bottom' | 'middle' | undefined;
  /** The color scheme for the toast message. */
  color: string;
}

/** Default options for toast messages. */
const defaultToastOptions: ToastServiceOptions = {
  color: 'success',
  duration: 3000,
  position: 'top',
} as const;

/**
 * A service for displaying toast messages in an Ionic application.
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * Constructs a new ToastService instance.
   *
   * @param toastController - The ToastController from Ionic for creating toast messages.
   */
  constructor(private toastController: ToastController) {}

  /**
   * Displays a success toast message with the specified message.
   *
   * @param message - The message to display in the toast.
   */
  async success(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  /**
   * Displays an error toast message with the specified message.
   *
   * @param message - The message to display in the toast.
   */
  async error(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }

  /**
   * Displays a custom toast message with the specified message and options.
   *
   * @param message - The message to display in the toast.
   * @param options - Custom options for configuring the toast message (optional).
   */
  async custom(
    message: string,
    options: ToastServiceOptions = defaultToastOptions,
  ) {
    const toast = await this.toastController.create({
      message,
      ...options,
    });
    await toast.present();
  }
}
