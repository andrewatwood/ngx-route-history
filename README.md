# ngx-route-history

An Angular service to automatically track route changes and store previous routes

- Run `npm install ngx-route-history` in your Angular project
- Import `RouteHistoryService` into the top level module imports `RouterModule`
- Inject `RouteHistoryService` wherever you'd like to use it
- The properties `currentRoute` and `previousRoute` provide, you guessed it, the current route url and the previous route url