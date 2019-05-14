import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouteHistoryService } from '../../ngx-route-history';
import { Router, Routes, Route } from '@angular/router';
import { TestComponent } from '../test.component';
import { TestComponentModule } from '../test-component.module';

const TestRoutes: Routes = [
    { path: '', component: TestComponent },
    { path: 'home', component: TestComponent },
    { path: 'profile', component: TestComponent },
    { path: 'test', component: TestComponent },
];

describe('RouteHistoryService', () => {

    let service: RouteHistoryService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestComponentModule,
                RouterTestingModule.withRoutes(TestRoutes)
            ],
            providers: [
                RouteHistoryService
            ]
        });

        router = TestBed.get(Router);
        service = TestBed.get(RouteHistoryService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should provide the current route after navigation', fakeAsync(() => {
        expect(service.currentRoute).toBeUndefined();
        router.navigate(['/home']);
        tick();
        expect(service.currentRoute).toEqual('/home');
        expect(service.previousRoute).toBeUndefined();
    }));

    it('should provide the previous route after second navigation', fakeAsync(() => {
        expect(service.currentRoute).toBeUndefined();
        expect(service.previousRoute).toBeUndefined();
        router.navigate(['/home']);
        tick();
        router.navigate(['/profile']);
        tick();
        expect(service.currentRoute).toEqual('/profile');
        expect(service.previousRoute).toEqual('/home');
    }));
});
