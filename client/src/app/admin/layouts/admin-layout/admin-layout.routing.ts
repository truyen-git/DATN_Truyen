import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AdminLoginComponent } from '../../admin-login/admin-login.component';
import { AdminGuard } from '../../../auth/admin.guard';

export const AdminLayoutRoutes: Routes = [
	{ path: 'admin-login',    component: AdminLoginComponent},
    { path: 'dashboard',      component: DashboardComponent, canActivate:[AdminGuard],},
    { path: 'user-profile',   component: UserProfileComponent, canActivate:[AdminGuard],},
    { path: 'table-list',     component: TableListComponent, canActivate:[AdminGuard],},
    { path: 'typography',     component: TypographyComponent, canActivate:[AdminGuard],},
    { path: 'icons',          component: IconsComponent, canActivate:[AdminGuard],},
    { path: 'maps',           component: MapsComponent, canActivate:[AdminGuard],},
    { path: 'notifications',  component: NotificationsComponent, canActivate:[AdminGuard],},
    { path: 'upgrade',        component: UpgradeComponent, canActivate:[AdminGuard],},
    {
        path: '', redirectTo: 'admin-login', pathMatch: 'full'
    }
];
