# Companies House Proxy

A proxy component that provides access to the Companies House API so that multiple clients can connect via this proxy rather than connecting directly to Companies House

The proxy ensures that only GET requests are carried out. All other types of request will result in a 404 error.

There is a 'health' provided at:
http://proxy_address/health
e.g. http://localhost:5000/health

All other routes are available at:
http://proxy_address/companies_house_api_route
e.g. http://localhost:5000/company/02456473

For the Companies House API documentation please see: https://developer.companieshouse.gov.uk/document/docs/index.html

## Prerequisites

Please make sure the following are installed:

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js v8.*](https://nodejs.org/en/)
- [StandardJS](https://standardjs.com/) (using `npm install -g standard`)

## Installation

Clone the repository and install its package dependencies:

```bash
git clone https://github.com/DEFRA/companies-house-proxy.git && cd companies-house-proxy
npm install
```

## Building the app

There is no need to build the app

## Running the app

Run the app as a normal Node app

```sh
$ node server.js
```

## Contributing to this project

If you have an idea you'd like to contribute please log an issue.

All contributions should be submitted via a pull request.

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

>Contains public sector information licensed under the Open Government license v3

### About the license

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
