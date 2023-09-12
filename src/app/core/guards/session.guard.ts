import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const sessionGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  const router = inject(Router);

  if (cookie.get('token')) {
    console.log('tengo token');
    return true;
  } else {
    console.log('No tengo token');
    router.navigate(['/auth']);
    return false;
  }
};
