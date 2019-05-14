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

    private routeHistory: string[] = [];

    /**
     * Calculates the sum.
     * @param addends Numbers to be added
     */

    constructor (private router: Router) {
        this.router.events.subscribe(event => {
            this.routerEventsHandler(event);
        });
    }

    routerEventsHandler(event: any) {
        if (event instanceof NavigationEnd) {
            this.routeHistory.unshift(event.url);
            this.currentRoute = event.url;
            this.previousRoute = this.routeHistory[1];
        }
    }
}
