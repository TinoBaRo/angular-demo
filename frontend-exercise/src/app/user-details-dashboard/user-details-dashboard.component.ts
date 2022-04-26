import { Component, OnInit } from '@angular/core';
import { UserData } from '../models/UserData';
import { GlobalDataService } from '../services/global-data.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-user-details-dashboard',
  templateUrl: './user-details-dashboard.component.html',
  styleUrls: ['./user-details-dashboard.component.css']
})
export class UserDetailsDashboardComponent implements OnInit 
{
  user: any;

  constructor(private globalService: GlobalDataService, private routeService: RouterService) 
  { }

  ngOnInit(): void 
  {
    // fetch user data
    this.user = this.globalService.getUser();
  }


  loadManagementDashboard()
  {
    this.routeService.openManage();
  }

}
