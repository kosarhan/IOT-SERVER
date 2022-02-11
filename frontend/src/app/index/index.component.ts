import { Component, OnInit } from '@angular/core';

import { Node } from '../models/node';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  nodes: Node[] = [];

  constructor(private nodeService: NodeService) { }

  ngOnInit(): void {
    this.nodeService.getNodes().subscribe(nodes => this.nodes = nodes);
  }
}
