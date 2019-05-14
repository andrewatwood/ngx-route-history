import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class RouteHistoryService {

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

    constructor (private router: Router) {
        this.router.events.subscribe(event => {
            this.routerEventsHandler(event);
        });
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
