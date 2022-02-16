import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

import { Node } from '../models/node';
import { Temperature } from '../models/temperature';
import { Humidity } from '../models/humidity';
import { NodeService } from '../services/node.service';
import { TemperatureService } from '../services/temperature.service';
import { HumidityService } from '../services/humidity.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  node = new Node;
  temperatureValues: Temperature[] = [];
  humidityValues: Humidity[] = [];

  constructor( 
    private nodeService: NodeService,
    private temperatureService: TemperatureService,
    private humidityService: HumidityService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const temperatureChart = document.getElementById('temperature-chart') as HTMLCanvasElement;
    const humidityChart = document.getElementById('humidity-chart') as HTMLCanvasElement;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let startDate, endDate;

    if (this.route.snapshot.queryParamMap.get('start-date') !== null) {
      startDate = new Date(this.route.snapshot.queryParamMap.get('start-date') as string);
    } else {
      startDate = undefined;
    }

    if (this.route.snapshot.queryParamMap.get('end-date') !== null) {
      endDate = new Date(this.route.snapshot.queryParamMap.get('end-date') as string);
    } else {
      endDate = new Date(Date.now());
    }

    this.nodeService.getNode(id).subscribe(node => {
      this.node = node;
    });

    if (startDate === undefined) {
      this.temperatureService.getValuesByNodeId(id).subscribe(temperatureValues => {
        this.temperatureValues = temperatureValues;
        // this.createChart(temperatureChart);
        this.createChart(temperatureChart, 'Temperature Values', this.temperatureValues);
      });

      this.humidityService.getValuesByNodeId(id).subscribe(humidityValues => {
        this.humidityValues = humidityValues;
        this.createChart(humidityChart, "Humidity Values", this.humidityValues);
      })
    } else {
      this.temperatureService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(temperatureValues => {
        this.temperatureValues = temperatureValues;
        // this.createChart(temperatureChart);
        this.createChart(temperatureChart, 'Temperature Values', this.temperatureValues);
      });  

      this.humidityService.getValuesByNodeId(id).subscribe(humidityValues => {
        this.humidityValues = humidityValues;
        this.createChart(humidityChart, "Humidity Values", this.humidityValues);
      })
    }
  }

  createChart(ctx: HTMLCanvasElement, label: string, arr: any[]): void {
    const labels: (Date | undefined)[] = [];
    const values: (number | undefined)[] = [];

    arr.forEach(data => {
      labels.push(data.updatedAt);
      values.push(data.value);
    });

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
}
