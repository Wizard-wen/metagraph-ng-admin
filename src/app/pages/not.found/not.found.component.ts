/**
 * @author songxiwen
 * @date 2020/09/11 13:!2
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'metagraph-not-found',
  styleUrls: ['./not.found.component.scss'],
  templateUrl: './not.found.component.html'
})
export class NotFoundComponent {
  constructor(private readonly router: Router) {}

  async navigateToLoginPage() {
    await this.router.navigate(['/pages/dashboardGroup/dashboard']);
  }
}
