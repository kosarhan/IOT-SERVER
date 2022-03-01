import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-node-alert',
  templateUrl: './node-alert.component.html',
  styleUrls: ['./node-alert.component.css']
})
export class NodeAlertComponent implements OnInit {
  node!: Node;

  constructor(
    private nodeService:NodeService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  }

}
