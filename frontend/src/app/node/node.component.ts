import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

import { Node } from '../models/node';
import { Temperature } from '../models/temperature';
import { Humidity } from '../models/humidity';
import { NodeService } from '../services/node.service';
import { TemperatureService } from '../services/temperature.service';
import { HumidityService } from '../services/humidity.service';
import { AlertService } from '../services/alert.service';
import { TemperatureAlertService } from '../services/temperature-alert.service';
import { HumidityAlertService } from '../services/humidity-alert.service';

export interface TimeFilter {
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  node: Node = {
    id: -1,
    name: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  };
  filter: TimeFilter = {
    startDate: '',
    endDate: ''
  };
  temperatureValues: Temperature[] = [];
  humidityValues: Humidity[] = [];
  refreshFunction: any;
  height = 400;
  interval = 30;
  timer!: number;

  alertControl: boolean = false;
  temperatureAlertControl: boolean = false;
  humidityAlertControl: boolean = false;
  alertMessage: string = '';
  temperatureAlertMessage: string = '';
  humidityAlertMessage: string = '';

  temperatureChart!: HTMLCanvasElement;
  temperatureTable!: HTMLElement;
  humidityChart!: HTMLCanvasElement;
  humidityTable!: HTMLElement;

  constructor(
    private nodeService: NodeService,
    private temperatureService: TemperatureService,
    private humidityService: HumidityService,
    private alertService: AlertService,
    private temperatureAlertService: TemperatureAlertService,
    private humidityAlertService: HumidityAlertService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.temperatureChart = document.getElementById('temperature-chart') as HTMLCanvasElement;
    this.temperatureTable = document.getElementById('temperature-table') as HTMLElement;
    this.humidityChart = document.getElementById('humidity-chart') as HTMLCanvasElement;
    this.humidityTable = document.getElementById('humidity-table') as HTMLElement;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let startDate, endDate;
    let page = this.route.snapshot.queryParamMap.get('page');
    let pageSize = this.route.snapshot.queryParamMap.get('pageSize');

    if (this.route.snapshot.queryParamMap.get('startDate') !== null) {
      startDate = new Date(this.route.snapshot.queryParamMap.get('startDate') as string);
      this.filter.startDate = this.route.snapshot.queryParamMap.get('startDate') as string;
      this.filter.startDate = this.filter.startDate.replace('Z', '');
    } else {
      startDate = undefined;
    }

    if (this.route.snapshot.queryParamMap.get('endDate') !== null) {
      endDate = new Date(this.route.snapshot.queryParamMap.get('endDate') as string);
      this.filter.endDate = this.route.snapshot.queryParamMap.get('endDate') as string;
      this.filter.endDate = this.filter.endDate.replace('Z', '');
    } else {
      endDate = new Date(Date.now());
    }

    this.nodeService.getNode(id).subscribe(node => {
      this.node = node;
      this.timer = this.interval;
      this.refreshFunction = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          this.timer = this.interval;

          let link = '/node/' + this.node.id;
          if (this.filter.startDate !== '') {
            link += '?startDate=' + this.filter.startDate;

            if (this.filter.endDate !== '') {
              link += '&endDate=' + this.filter.endDate;
            }
          }

          window.location.href = link;
        }

      }, 1000);
    });

    if (pageSize === null) {
      this.fetchData(startDate, endDate, id);
    } else {
      this.fetchDataByPage(startDate, endDate, id, page,pageSize);
    }
  }

  createChart(ctx: HTMLCanvasElement, table: HTMLElement, label: string, arr: any[]): void {
    const labels: (string | undefined)[] = [];
    const values: (number | undefined)[] = [];

    arr.forEach(data => {
      labels.push(new Date(data.updatedAt).toLocaleString());
      values.push(data.value);
    });

    this.controlTemperatureAlert();
    this.controlHumidityAlert();

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: label,
          data: values,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        maintainAspectRatio: false
      }
    });

    table.style.height = ctx.style.height;
  }

  getDateTimeNow() {
    const current = new Date();

    const year = current.getFullYear().toString();
    const month = (current.getMonth() + 1).toString().padStart(2, '0');
    const day = current.getDate().toString().padStart(2, '0');

    const hour = current.getHours().toString().padStart(2, '0');
    const minute = current.getMinutes().toString().padStart(2, '0');

    return year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
  };

  getDateTimeBeforeOneDay() {
    let date = new Date();
    date = new Date(date.getTime() - 1000 * 60 * 60 * 24);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
  };

  fetchData(startDate:any, endDate:any, id:number):void {
    if (startDate === undefined) {
      this.temperatureService.getValuesByNodeId(id).subscribe(temperatureValues => {
        this.temperatureValues = temperatureValues;

        this.createChart(this.temperatureChart, this.temperatureTable, 'Temperature Values', this.temperatureValues);
      });

      this.humidityService.getValuesByNodeId(id).subscribe(humidityValues => {
        this.humidityValues = humidityValues;

        this.createChart(this.humidityChart, this.humidityTable, "Humidity Values", this.humidityValues);
      })
    } else {
      this.temperatureService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(temperatureValues => {
        this.temperatureValues = temperatureValues;

        this.createChart(this.temperatureChart, this.temperatureTable, 'Temperature Values', this.temperatureValues);
      });

      this.humidityService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(humidityValues => {
        this.humidityValues = humidityValues;

        this.createChart(this.humidityChart, this.humidityTable, "Humidity Values", this.humidityValues);
      })
    }
  }

  fetchDataByPage(startDate:any, endDate:any, id:number, page:any, pageSize:any):void {
    if (startDate === undefined) {
      this.temperatureService.getValuesByNodeIdByPageSize(id, page, pageSize).subscribe(temperatureValues => {
        this.temperatureValues = temperatureValues;
        
        this.createChart(this.temperatureChart, this.temperatureTable, 'Temperature Values', this.temperatureValues);
      });

      this.humidityService.getValuesByNodeIdByPageSize(id, page, pageSize).subscribe(humidityValues => {
        this.humidityValues = humidityValues;

        this.createChart(this.humidityChart, this.humidityTable, "Humidity Values", this.humidityValues);
      })
    } else {
      this.temperatureService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(temperatureValues => {
        this.temperatureValues = temperatureValues;

        this.createChart(this.temperatureChart, this.temperatureTable, 'Temperature Values', this.temperatureValues);
      });

      this.humidityService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(humidityValues => {
        this.humidityValues = humidityValues;

        this.createChart(this.humidityChart, this.humidityTable, "Humidity Values", this.humidityValues);
      })
    }
  }

  filterData(data: TimeFilter): void {
    // console.log(data);
    if (data.startDate != undefined) {
      let url = '/node/' + this.node.id + '?';
      url += 'startDate=' + data.startDate;
      // url += 'startDate=' + data.startDate + 'Z';
      // url += 'startDate=' + data.startDate + ':00Z';

      if (data.endDate != undefined) {
        url += '&endDate=' + data.endDate;
        // url += '&endDate=' + data.endDate + 'Z';
        // url += '&endDate=' + data.endDate + ':00Z';
      }

      // window.location.href = '/node/' + this.node.id;
      window.location.href = url;
      // console.log(url);
    }
  }

  controlTemperatureAlert():void{
    const temperatureValue = this.temperatureValues[this.temperatureValues.length - 1];

    this.alertService.getAlert(this.node.id).subscribe((alert) => {
      if(alert.temperatureAlertId !== 1){
        this.temperatureAlertService.getTemperatureAlert(alert.temperatureAlertId).subscribe((temperatureAlert) =>{
          if (temperatureValue.value < temperatureAlert.minValue && temperatureValue.updatedAt > alert.updatedAt) {
            this.temperatureAlertControl = true;
            this.temperatureAlertMessage = 'The temperature value is too low for ' + this.node.name 
              + '. The alert type is ' + temperatureAlert.name 
              + '. The temperature value is ' + temperatureValue.value
              + '. Date : ' + temperatureValue.updatedAt.toLocaleString();
          } else if (temperatureValue.value > temperatureAlert.maxValue) {
            this.temperatureAlertControl = true;
            this.temperatureAlertMessage = 'The temperature value is too high for ' + this.node.name 
              + '. The alert type is ' + temperatureAlert.name 
              + '. The temperature value is ' + temperatureValue.value
              + '. Date : ' + temperatureValue.updatedAt.toLocaleString();
            }
        });  
      }
    });
  }

  controlHumidityAlert():void{
    const humidityValue = this.temperatureValues[this.temperatureValues.length - 1];

    this.alertService.getAlert(this.node.id).subscribe((alert) => {
      if(alert.humidityAlertId !== 1){
        this.humidityAlertService.getHumidityAlert(alert.humidityAlertId).subscribe((humidityAlert) =>{
          if (humidityValue.value < humidityAlert.minValue && humidityValue.updatedAt > alert.updatedAt) {
            this.humidityAlertControl = true;
            this.humidityAlertMessage = 'The humidity value is too low for ' + this.node.name 
              + '. The alert type is ' + humidityAlert.name 
              + '. The humidity value is ' + humidityValue.value
              + '. Date : ' + humidityValue.updatedAt.toLocaleString();
          } else if (humidityValue.value > humidityAlert.maxValue) {
            this.humidityAlertControl = true;
            this.humidityAlertMessage = 'The humidity value is too high for ' + this.node.name 
              + '. The alert type is ' + humidityAlert.name 
              + '. The humidity value is ' + humidityValue.value
              + '. Date : ' + humidityValue.updatedAt.toLocaleString();
            }
        });  
      }
    });
  }

  refreshPage(): void{
    window.location.reload();
  }

  ngOnDestroy() {
    if (this.refreshFunction) {
      clearInterval(this.refreshFunction);
    }
  }
}
