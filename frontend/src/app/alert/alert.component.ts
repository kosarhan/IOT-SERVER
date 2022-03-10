import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';

import { HumidityAlert } from '../models/humidity-alert';
import { TemperatureAlert } from '../models/temperature-alert';
import { HumidityAlertService } from '../services/humidity-alert.service';
import { TemperatureAlertService } from '../services/temperature-alert.service';

export interface FormData {
  id: number;
  name: string;
  minValue: number;
  maxValue: number;
  isTemperatureAlert: boolean;
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  temperatureAlerts: TemperatureAlert[] = [];
  humidityAlerts: HumidityAlert[] = [];

  data: FormData = {
    id: 1,
    name: '',
    minValue: 0,
    maxValue: 0,
    isTemperatureAlert: true,
  };

  constructor(
    private temperatureAlertService: TemperatureAlertService,
    private humidityAlertService: HumidityAlertService
  ) { }

  ngOnInit(): void {
    this.temperatureAlertService.getTemperatureAlerts().subscribe((alerts) => {
      this.temperatureAlerts = alerts;
    });
    this.humidityAlertService.getHumidityAlerts().subscribe((alerts) => {
      this.humidityAlerts = alerts
    });
  }

  updateAlert(): void {
    console.log(this.data);
    if(this.data.id != 1) {
      if(this.data.isTemperatureAlert) {
        let temperatureAlert:TemperatureAlert = this.temperatureAlerts[0];
        this.temperatureAlerts.forEach((alert) => {
          if(alert.id == this.data.id){
            temperatureAlert = alert;
          }
        });
 
        temperatureAlert.name = this.data.name;
        temperatureAlert.minValue = this.data.minValue;
        temperatureAlert.maxValue = this.data.maxValue;
        this.temperatureAlertService.updateTemperatureAlert(temperatureAlert).subscribe((alert) =>{
          console.log(alert);
          window.location.reload();
        });
      } else {
        let humidityAlert:HumidityAlert = this.humidityAlerts[0];
        this.humidityAlerts.forEach((alert) => {
          if(alert.id == this.data.id){
            humidityAlert = alert;
          }
        });
 
        humidityAlert.name = this.data.name;
        humidityAlert.minValue = this.data.minValue;
        humidityAlert.maxValue = this.data.maxValue;
        this.humidityAlertService.updateHumidityAlert(humidityAlert).subscribe((alert) =>{
          console.log(alert);
          window.location.reload();
        });
      }
    }
  }

  addTemperatureAlert(data: object): void {
    this.temperatureAlertService.createTemperatureAlert(data).subscribe((alert) => {
      console.log(alert);
      window.location.reload();
    });
  }

  addHumidityAlert(data: object): void {
    this.humidityAlertService.createHumidityAlert(data).subscribe((alert) => {
      console.log(alert);
      window.location.reload();
    });
  }

  deleteTemperatureAlert(id: number): void {
    if(id !== 1) {
      this.temperatureAlertService.deleteTemperatureAlert(id).subscribe((result) => {
        console.log(result);
        window.location.reload();
      });
      // window.location.reload();
    }
  }

  deleteHumidityAlert(id:number): void {
    if(id !== 1) {
      this.humidityAlertService.deleteHumidityAlert(id).subscribe((result) => {
        console.log(result);
        window.location.reload();
      });
      // window.location.reload();
    }
  }

  editAlert(isTemperatureAlert: boolean, id: number): void {
    if (isTemperatureAlert) {
      this.temperatureAlerts.forEach((element) => {
        if (id != 1 && id == element.id) {
          this.data = {
            id: element.id,
            name: element.name,
            minValue: element.minValue,
            maxValue: element.maxValue,
            isTemperatureAlert: isTemperatureAlert,
          }
          // this.data.id = element.id;
          // this.data.name = element.name;
          // this.data.minValue = element.minValue;
          // this.data.maxValue = element.maxValue;
          // this.data.isTemperatureAlert = true;
        }
      });
    } else {
      this.humidityAlerts.forEach((element) => {
        if (id != 1 && id == element.id) {
          this.data = {
            id: element.id,
            name: element.name,
            minValue: element.minValue,
            maxValue: element.maxValue,
            isTemperatureAlert: isTemperatureAlert,
          }
          // this.data.id = element.id;
          // this.data.name = element.name;
          // this.data.minValue = element.minValue;
          // this.data.maxValue = element.maxValue;
          // this.data.isTemperatureAlert = true;
        }
      })
    }
  }
}
