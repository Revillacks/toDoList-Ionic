import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonMenu, IonMenuButton, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonButton, IonIcon, IonLabel, IonInput, IonButtons, IonText, IonCheckbox, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonCardContent } from '@ionic/angular/standalone';
import {add, trashOutline, eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, logoApple} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonCardContent, IonCol, IonRow, IonGrid, IonCardTitle, IonCardHeader, IonCard, IonCheckbox, IonText, IonButtons, FormsModule, IonInput, IonLabel, IonIcon, IonButton, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonMenuButton],
})
export class HomePage {
  tareas: { text: string; completed: boolean}[] = [];
  newTask: string = '';

  @ViewChild(IonContent, {static: false}) content!: IonContent;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({
      mailOutline,
      lockClosedOutline,
      eyeOutline,
      eyeOffOutline,
      logoApple,
      trashOutline
    });
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: color
    });
    await toast.present();
  }

  addTask() {
    if (this.newTask.trim().length > 0) {
      this.tareas.push({text: this.newTask, completed: false});
      this.presentToast('Tarea agregada correctamente', 'success');
      this.newTask = '';
      this.scrollToBottom();
    }
    console.log(this.tareas);
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom(300);
    }, 200);
  }

  deleteTask(index: number) {
    this.tareas.splice(index, 1);
    this.presentToast('Tarea eliminada correctamente', 'danger');
  }

  markCompleted(index : number) {
    if (this.tareas[index].completed){
      this.presentAlert(index, 'Marcar como finalizada', '¿Desea marcar la tarea como completada?', false);
    }
  }

  async presentAlert(index: number, header: string, message: string, completed: boolean) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.tareas[index].completed = completed;
          }
        },
        {
          text: 'Aceptar',
          role: 'accept',
        }
      ]
    })
    await alert.present();
  }

}
