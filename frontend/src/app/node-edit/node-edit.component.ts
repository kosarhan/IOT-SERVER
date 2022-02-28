import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Node } from '../models/node';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-node-edit',
  templateUrl: './node-edit.component.html',
  styleUrls: ['./node-edit.component.css']
})
export class NodeEditComponent implements OnInit {
  node!: Node;

  constructor(
    private route: ActivatedRoute,
    private nodeService: NodeService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.nodeService.getNode(id).subscribe(node => this.node = node);
  }

  updateNode(): void {
    this.nodeService.updateNode(this.node);
    // window.location.href = '/';
  }

  resetForm(): void { 

  }

}
