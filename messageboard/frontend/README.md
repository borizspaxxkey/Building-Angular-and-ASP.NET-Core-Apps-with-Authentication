"noImplicitAny": false, to use non-safe code 
to use async await we target es6 in the tsconfig.json 
and change the observable returned from httpClient.Get to ToPromise();

async await enable us to use try catch block

try catch doesnt work with observables, to make it work, you need to pass the error handling code as a second parameter in the subscribe function, think of the first parameter as a try and the second as a catch

async pipe used to get reponse data from observable

// templateurl requires an absolute location hence the moduleId attribute;

// Asp.net has alot of options with authentication

Cookie Authentication with the identity Framework[Stateful Method]: stored on the server and the client, and then passed on very request so the server know who the user is.

Token Authentication [Stateless Method]: Server generates the token which contains the user id and is signed against the secret, the encrypted token is then sent upon registering or logging in and is kept some how on the browser, the token is then passed back with very request and the server decrpts the token with the secret and the server knows who sent the request, since it contains the user Id,

// For Production Environment use Identity Framework

// Authentication was done using nuget package called system.identityModel.Tokens.Jwt

// A getter is a function you call with the dot operator eg; authService.name though name() is a function in the auth class with a get keyword before it

// !!localStorage.getItem(this.TOKEN_KEY);  -- double negative operator returns true if the token value exist or false if it doesnt
