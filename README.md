# Ng Library Store Application

> Ng Library Store is a sample prototype that uses Spring Boot and Angular 8 to organize books into different libraries.

Technology Stack :
* Angular 8
* NgRx : redux implementation for angular apps. 
* Spring Boot
* Axon 4 (CQRS architecture / Event Sourcing)

## Screenshots

<p align="center">
    <img src="/meta-assets/library-list.png" alt="Library List" align="center">
</p>
<p align="center">
    <img src="/meta-assets/create-library.png" alt="Create Library" align="center">
</p>
<p align="center">
    <img src="/meta-assets/book-list.png" alt="Book List" align="center">
</p>
<p align="center">
    <img src="/meta-assets/book-create.png" alt="Create Book" align="center">
</p>
<p align="center">
    <img src="/meta-assets/404.png" alt="404 Not Found" align="center">
</p>


## Development server

First of all you need to install dependencies for both client and server.

Run `npm install` in the root folder of the project to install client dependencies.

After installing the dependencies you should be able to run the application locally by following these steps : 

* Run `mvn spring-boot:run` to launch the server

* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Goals

The main goal of this repository is to provide an up to date example of : 
###### Angular application for the front end part following all recent best practices in various areas like:

- `@ngrx/store` - including reducers, actions, selectors
- `@ngrx/effects` - for implementation of side effects like `http` requests, logging, notifications,...
- `@ngrx/entity` - for CRUD operations
- `@ngrx/router-store` - to connect the Angular Router to @ngrx/store
- `@ngrx/store-devtools` - to enable a powerful time-travelling debugger.
- `@angular/material` - material design components
- routing

###### Spring Boot Application for the back end part to show how CQRS(Command And Query Segregation) and ES(Event Sourcing) pattern has to be implemented.

## Documentation

* Axon Framework - http://www.axonframework.org/
* Spring Boot - http://projects.spring.io/spring-boot/
* Spring Framework - http://projects.spring.io/spring-framework/
* Angular 8 - https://angular.io/
* NgRx - https://ngrx.io/
* RxJS - https://rxjs-dev.firebaseapp.com/

## Contributors  

**Author:** Fahmi BEN SALAH *( [fahmii.bensalah@gmail.com](mailto:fahmii.bensalah@gmail.com) )* 

### Contributing
If you like the project, shoot a :star2: and feel free to fork & send PR anytime


