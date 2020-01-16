import { LibraryEffects } from './library.effects';
import { Observable, of } from 'rxjs';
import { LibraryService } from '../services/library.service';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  createLibrary,
  createLibrarySuccess,
  deleteLibrary,
  deleteLibrarySuccess,
  createLibraryFailure,
  loadLibraries
} from '../actions/library.actions';
import { Library } from '../models/library.model';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import {Router} from '@angular/router';

describe('Library effects scenarios', () => {

    let libraryEffects: LibraryEffects;
    let actions: Observable<any>;
    let libraryService: jasmine.SpyObj<LibraryService>;
    let toastrService: jasmine.SpyObj<ToastrService>;
    let router: Router;

    beforeEach(() => {
        const store = jasmine.createSpyObj('Store', ['dispatch', 'select']);
        store.select.and.returnValue(of(library));
        libraryService = jasmine.createSpyObj('LibraryService', ['createLibrary', 'deleteLibrary', 'fetchLibraries']);
        toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
        TestBed.configureTestingModule({
            declarations: [

            ],
            imports: [
              RouterTestingModule.withRoutes([])
            ],
            providers: [
                LibraryEffects,
                provideMockActions(() => actions),
                {
                    provide: Store,
                    useValue: store
                },
                {
                    provide: LibraryService,
                    useValue: libraryService
                },
                {
                    provide: ToastrService,
                    useValue: toastrService
                }
            ]
        });

        libraryEffects = TestBed.get(LibraryEffects);
        router = TestBed.get(Router);
    });

    const library: Library = {
        id: '83604298-f10d-4129-b510-2d45a0eb2427',
        name: 'Bibliothèque Mazarine',
        address: '23 Quai de Conti, 75006 Paris',
        creationDate: new Date('03-03-2005')
    };

    it('should handle library addition', () => {
        // Given
        libraryService.createLibrary.and.returnValue(cold('-a', { a: library }));

        // When
        actions = hot('-a', {a : createLibrary({ library })});

        // Then
        const expected = cold('--b', {b : createLibrarySuccess({ library })});
        expect(libraryEffects.CreateLibraryEffect$).toBeObservable(expected);
    });

    it('should return a library.createLibraryFailure if the library service throws', () => {
         // Given
         libraryService.createLibrary.and.returnValue(cold('-#|'));

         // When
         actions = hot('-a', {a : createLibrary({ library })});

         // Then
         const error = new Error();
         const expected = cold('--b', {b : createLibraryFailure({ error })});
         expect(toastrService.error).toHaveBeenCalled();
     });

    it('should reload when after library addition', () => {
        // When
        actions = hot('--a', {a : createLibrary({ library })});

        // Then
        const navigateSpy = spyOn(router, 'navigate');
        expect(toastrService.success).toHaveBeenCalledWith('Library Saved Successfully');
        expect(navigateSpy).toHaveBeenCalledWith(['/library/list']);
    });

    it('should handle library deletion', () => {
         // Given
         libraryService.deleteLibrary.and.returnValue(cold('-a', { a: library.id }));

         // When
         actions = hot('-a', {a : deleteLibrary({ libraryId: library.id })});

         // Then
         const expected = cold('--b', {b : deleteLibrarySuccess({ libraryId: library.id })});
         expect(libraryEffects.DeleteLibraryEffect$).toBeObservable(expected);
     });
});
