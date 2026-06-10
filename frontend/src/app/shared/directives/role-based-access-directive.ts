import { Directive, Input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { UserRole } from '../../core/models/user.model';

@Directive({ selector: '[appRoleBasedAccess]', standalone: true })
export class RoleBasedAccessDirective {
  private allowedRoles: UserRole[] = [];

  @Input() set appRoleBasedAccess(roles: UserRole[]) {
    this.allowedRoles = roles;
    this.updateView();
  }

  constructor(private template: TemplateRef<unknown>, private view: ViewContainerRef, private auth: AuthService) {
    effect(() => {
      this.auth.currentUser();
      this.updateView();
    });
  }

  private updateView(): void {
    const user = this.auth.currentUser();
    this.view.clear();
    if (user && this.allowedRoles.includes(user.role)) {
      this.view.createEmbeddedView(this.template);
    }
  }
}
