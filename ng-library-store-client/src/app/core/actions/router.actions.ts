import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const go = createAction(
    '[Router] Go',
    props<{ path: any[], query?: object, extras?: NavigationExtras }>()
);

export const back = createAction(
    '[Router] Back',
    props<{}>()
);

export const forward = createAction(
    '[Router] Forward',
    props<{}>()
);
