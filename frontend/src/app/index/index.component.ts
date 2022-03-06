import { Component, OnInit } from '@angular/core';
import { AlertLog } from '../models/alert-log';

import { Node } from '../models/node';
import { AlertLogService } from '../services/alert-log.service';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  nodes: Node[] = [];
  alertLogs: AlertLog[] = [];

  constructor(
    private nodeService: NodeService,
    private alerLogService: AlertLogService) { }

  ngOnInit(): void {
    this.nodeService.getNodes().subscribe(nodes => this.nodes = nodes);
    this.alerLogService.getAlertLogs().subscribe(alertLogs => this.alertLogs = alertLogs);
  }
}
