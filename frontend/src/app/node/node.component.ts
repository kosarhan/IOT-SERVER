import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

import { Node } from '../models/node';
import { Temperature } from '../models/temperature';
import { NodeService } from '../services/node.service';
import { TemperatureService } from '../services/temperature.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  node = new Node;
  temperatureValues: Temperature[] = [];

  constructor( 
    private nodeService: NodeService,
    private temperatureService: TemperatureService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const element = document.getElementById('myChart') as HTMLCanvasElement;

    this.nodeService.getNode(id).subscribe(node => {
      this.node = node;
    });

    this.temperatureService.getValuesByNodeId(id).subscribe(temperatureValues => {
      this.temperatureValues = temperatureValues;
      this.createChart(element);
    });
  }

  createChart(ctx: HTMLCanvasElement): void {
    const labels: (Date | undefined)[] = [];
    const data: (number | undefined)[] = [];

    this.temperatureValues.forEach(temperature => {
      labels.push(temperature.updatedAt);
      data.push(temperature.value);
    });

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: 'Temperature Values',
              data: data,
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
}
