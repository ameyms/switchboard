# switchboard

An experimental router for browser side JS

## API Goal

First, create a new instance of the Switchboard:

```js
// app.js
import Switchboard from 'switchboard';

let app = new Switchboard();
let {route, Page, DependsOn} = app;
export default {
    route,
    Page,
    DependsOn
};

```
Then, define your pages:
```js
// UserProfile.jsx
import React, {Component} from 'react';

import {Page, DependsOn, PageContainer} from '../app';
import {UserView} from '../views/UserView';

@Page('user-profile', '/user/:userId')
@DependsOn({
    userData: getUserData // A dependency function
    someConstData: [1, 2, 3.14]
})
class UserProfile extends Component {

    render() {
        let {userData, someConstData} = this.route.dependencies;

        let {userId} = this.route.params;

        return (
            <UserView userId={userId} profile={userData}>
            </UserView>
        );

    }
}

/*
  Dependency functions are invoked with positional
  parameters same as the route URL.
  This function returns a promise which Switchboard resolves
  before instantiating the component
*/
function userData(userId) {
    return fetch(`/users/${userId}.json`);
}

```

...And ofcourse, the container:

```js
import React, {Component} from 'react';
import {PageContainer} from '../app';

@PageContainer
class AppView extends Component {
    render() {
        return (
            <div className="page-container">
                {this.activePage}
            </div>
        );
    }
}
```
License: MIT
