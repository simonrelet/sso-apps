# sso-apps

> Example of Single Sign On with multiple apps

# Usage

```
npm i && npm run start
```

Then open a browser on: [http://localhost:8080/login/](http://localhost:8080/login/)

# Features

* Each app is developed independently
* Login is handled by a token stored in the `localStorage`
* An API is used by each app to ensure that the user is logged in
* Query parameters are used for inputs (and _outputs_)

# Apps

* app-details: Show details of a user
* app-master: List all user and allow selection
* login: Login a user
* navigation: List of all the apps
