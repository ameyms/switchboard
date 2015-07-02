# switchboard
An experimental router for browser side JS

## API Goal

```js

// Intialization
var SwitchBoard = require('switchboard');
var sb = new SwitchBoard();

// To initialize a switchboard, one defines `places` of an app
// Defining a place can be as simple as:
sb.addPlace('home', '/home').

   // But one can even configure powerful
  // customization like so:
   addPlace('profile', '/user/:userId', {
        // Each place can have dependencies...
        dependencies: {
             // ...like promise that resolves to give data...
            pageData: fetch('/api/v1/users'),

            // ... or result of a function...
            computedVal: function () {
                return homeApi();
            },

            // ... or `fixed` data
            myArr: [42, 3.1415, 1.61828]
        }
    }
);


// Listening to page changes

sb.onPageChange(function (pgName, params, deps) {
    switch (pgName) {
        case 'profile':
            someViewRenderingFn(params.userId, deps.pageData);
            break;
        default:

    }
})
```

License: MIT
