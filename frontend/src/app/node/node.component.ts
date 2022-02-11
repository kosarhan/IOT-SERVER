import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Node } from '../models/node';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  node = new Node;

  constructor( private nodeService: NodeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.nodeService.getNode(id).subscribe(node => {
      this.node = node;
    });
  }

}
