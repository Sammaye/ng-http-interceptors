# ng-http-interceptors

A collection of bookmarked Angular HTTP interceptors along with their usage.

This includes:

- `auth-interceptor` which gets the access_token from every request to a server and sets it
- `error-interceptor` which checks responses for errors and processes them
- `https-interceptor` which converts requests from HTTP to HTTPS
- `timezone-interceptor` which adds a HTTP header for the user's current timezone
