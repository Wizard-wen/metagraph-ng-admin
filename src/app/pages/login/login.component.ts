/**
 * @author songxiwen
 * @date 2020/09/14 13:19
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../api.service';

@Component({
  selector: 'metagraph-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: NzMessageService
  ) {}

  async loginThenNavigateToNewPage(): Promise<void> {
    Object.keys(this.loginForm.controls).forEach((item: string) => {
      this.loginForm.controls[item].markAsDirty();
      this.loginForm.controls[item].updateValueAndValidity();
    });
    const invalidFormItem = Object.keys(this.loginForm.controls).find(
      (item: string) => this.loginForm.controls[item].status === 'INVALID'
    );
    if (invalidFormItem) {
      this.messageService.create('error', '用户名或密码缺失！');
      return;
    }
    const response = await this.authService.login(this.loginForm.value);
    if (response.code === 0) {
      this.messageService.create('success', '登录成功！');
      await this.router.navigate(['/pages/dashboardGroup/dashboard']);
    } else {
      this.messageService.create('error', response.message || '登录失败！');
    }
  }

  ngOnInit(): void {}
}
