import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

import { Node } from '../models/node';
import { Temperature } from '../models/temperature';
import { Humidity } from '../models/humidity';
import { NodeService } from '../services/node.service';
import { TemperatureService } from '../services/temperature.service';
import { HumidityService } from '../services/humidity.service';

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
    endDate: this.getDateTimeNow()
  };
  temperatureValues: Temperature[] = [];
  humidityValues: Humidity[] = [];
  temperatureChartData: Temperature[] = [];
  humidityCharData: Humidity[] = [];
  height = 400;

  temperatureAlert: boolean = false;
  humidityAlert: boolean = false;

  constructor(
    private nodeService: NodeService,
    private temperatureService: TemperatureService,
    private humidityService: HumidityService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const temperatureChart = document.getElementById('temperature-chart') as HTMLCanvasElement;
    const temperatureTable = document.getElementById('temperature-table') as HTMLElement;
    const humidityChart = document.getElementById('humidity-chart') as HTMLCanvasElement;
    const humidityTable = document.getElementById('humidity-table') as HTMLElement;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    let startDate, endDate;
    let page = this.route.snapshot.queryParamMap.get('page');
    let pageSize = this.route.snapshot.queryParamMap.get('pageSize');

    // console.log(this.filter);
    // console.log(page);
    // console.log(pageSize);

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
    });

    if (pageSize === null) {
      if (startDate === undefined) {
        this.temperatureService.getValuesByNodeId(id).subscribe(temperatureValues => {
          this.temperatureValues = temperatureValues;
          // this.createChart(temperatureChart);
          this.createChart(temperatureChart, temperatureTable, 'Temperature Values', this.temperatureValues);
        });

        this.humidityService.getValuesByNodeId(id).subscribe(humidityValues => {
          this.humidityValues = humidityValues;
          this.createChart(humidityChart, humidityTable, "Humidity Values", this.humidityValues);
        })
      } else {
        this.temperatureService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(temperatureValues => {
          this.temperatureValues = temperatureValues;

          // this.createChart(temperatureChart);
          this.createChart(temperatureChart, temperatureTable, 'Temperature Values', this.temperatureValues);
        });

        this.humidityService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(humidityValues => {
          this.humidityValues = humidityValues;
          this.createChart(humidityChart, humidityTable, "Humidity Values", this.humidityValues);
        })
      }
    } else {
      if (startDate === undefined) {
        this.temperatureService.getValuesByNodeIdByPageSize(id, page, pageSize).subscribe(temperatureValues => {
          this.temperatureValues = temperatureValues;
          // this.createChart(temperatureChart);
          this.createChart(temperatureChart, temperatureTable, 'Temperature Values', this.temperatureValues);
        });

        this.humidityService.getValuesByNodeIdByPageSize(id, page, pageSize).subscribe(humidityValues => {
          this.humidityValues = humidityValues;
          this.createChart(humidityChart, humidityTable, "Humidity Values", this.humidityValues);
        })
      } else {
        this.temperatureService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(temperatureValues => {
          this.temperatureValues = temperatureValues;

          // this.createChart(temperatureChart);
          this.createChart(temperatureChart, temperatureTable, 'Temperature Values', this.temperatureValues);
        });

        this.humidityService.getValuesByNodeIdWithTimeFilters(id, startDate, endDate).subscribe(humidityValues => {
          this.humidityValues = humidityValues;
          this.createChart(humidityChart, humidityTable, "Humidity Values", this.humidityValues);
        })
      }
    }
  }

  createChart(ctx: HTMLCanvasElement, table: HTMLElement, label: string, arr: any[]): void {
    const labels: (string | undefined)[] = [];
    const values: (number | undefined)[] = [];

    arr.forEach(data => {
      labels.push(new Date(data.updatedAt).toLocaleString());
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
}
