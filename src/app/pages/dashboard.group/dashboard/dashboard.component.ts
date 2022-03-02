/**
 * @author songxiwen
 * @date 2020/09/28 15:57
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DashboardApiService } from '../../../api.service';

@Component({
  selector: 'metagraph-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardData?: {
    user: number,
    repository: number,
    file: number,
    knowledge: number,
    fileTotalSize: number
  };

  isLoading = false;

  constructor(
    private readonly dashboardApiService: DashboardApiService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }
  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
  async getSystemDashboard() {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
    const response = await this.dashboardApiService.getSystemDashboard();
    if (response.data) {
      this.dashboardData = response.data;
    }
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }

  async ngOnInit(): Promise<void> {
    await this.getSystemDashboard();
  }
}
