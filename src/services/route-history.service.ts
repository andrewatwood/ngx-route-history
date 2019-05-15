import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable()
export class RouteHistoryService implements OnDestroy {

    /**
     * Stores the previous succesfully navigated route.
     */
    public previousRoute: string;

    /**
     * Stores the current succesfully navigated route.
     */
    public currentRoute: string;

    /**
     * Stores the history succesfully navigated routes, in reverse order.
     */
    private routeHistory: string[] = [];

    /**
     * Subs to be destroyed on teardown.
     */
    private subs = new Subscription();

    constructor (private router: Router) {
        const routeHistorySub = this.router.events.subscribe((event: Event)  => {
            this.routerEventsHandler(event);
        });
        this.subs.add(routeHistorySub);
    }

    public ngOnDestroy() {
        this.subs.unsubscribe();
    }

    /**
     * Handles router events
     */
    private routerEventsHandler(event: any) {
        if (event instanceof NavigationEnd) {
            this.routeHistory.unshift(event.url);
            this.currentRoute = event.url;
            this.previousRoute = this.routeHistory[1];
        }
    }
}
