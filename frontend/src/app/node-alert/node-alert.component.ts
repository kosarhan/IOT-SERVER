import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from '../services/node.service';

import { Node } from '../models/node';
import { TemperatureAlert } from '../models/temperature-alert';
import { TemperatureAlertService } from '../services/temperature-alert.service';
import { AlertService } from '../services/alert.service';
import { HumidityAlertService } from '../services/humidity-alert.service';
import { HumidityAlert } from '../models/humidity-alert';
import { Alert } from '../models/alert';

@Component({
  selector: 'app-node-alert',
  templateUrl: './node-alert.component.html',
  styleUrls: ['./node-alert.component.css']
})
export class NodeAlertComponent implements OnInit {
  node: Node = {
    id: -1,
    name: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  };
  nodeAlert: Alert = {
    id: -1,
    nodeId: -1,
    temperatureAlertId: -1,
    humidityAlertId: -1,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date()
  };
  temperatureAlerts: TemperatureAlert[] = [];
  humidityAlerts: HumidityAlert[] = [];

  constructor(
    private nodeService:NodeService,
    private temperatureAlertService:TemperatureAlertService,
    private alertService: AlertService,
    private humidityAlertService: HumidityAlertService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.nodeService.getNode(id).subscribe(node => {
      this.node = node;
    });

    this.temperatureAlertService.getTemperatureAlerts().subscribe(alerts => this.temperatureAlerts = alerts);
    this.humidityAlertService.getHumidityAlerts().subscribe(alerts => this.humidityAlerts = alerts);

    this.alertService.getAlert(id).subscribe(alert => {
      this.nodeAlert = alert;
      console.log(this.nodeAlert);
    });
  }

  onSubmit(): void{
    /*if(this.nodeAlert.temperatureAlertId.toString() === ''){
      this.nodeAlert.temperatureAlertId = -1;
    }
    
    if(this.nodeAlert.humidityAlertId.toString() === ''){
      this.nodeAlert.humidityAlertId = -1;
    }*/
    this.alertService.updateAlert(this.nodeAlert).subscribe((alert => {
      console.log(alert);
      // window.location.href = '';
    }));
  }

  resetForm(): void{
    location.reload();
  }
}
