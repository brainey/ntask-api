# building-apis-ntask-api
Example of building a service API with Node JS and express.

Working through the book [Building APIs with Node.js](http://www.apress.com/us/book/9781484224410#otherversion=9781484224427). Most of the code here comes from the chapters in that book.
So far, my improvements have been:
* Getting port number from environment variable PORT
* Building upon example of config_test.js, added config_development.js and config_production.js.
* Moved port number to params in config_<NODE_ENV>.js
* Made storage name of the database specific to each NODE_ENV {test, development, production} so as to destroy the production DB during either tests or development.
* Modified the beforeEach() of the tests to completely reinitialize the database each time
* Fixed typo in APIDoc stuff for Users (book had it as Tasks)

Problems:
* .expect(200) seems mostly useless in that it doesn't throw an error, research so far points to problem of waiting for the response and the use of Promises versus callbacks. More research needed here to come up with better solution. For now, added shoulds inside the end() to made sure that the status is 200 (OK).
