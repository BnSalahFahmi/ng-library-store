import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  routeLinks: any[];
  activeLinkIndex = 0;

  constructor() {
    this.routeLinks = [
      { label: 'Library', link: '/library/list' }
    ];
  }

  ngOnInit() {
  }

}
