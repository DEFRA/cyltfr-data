[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=alert_status)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=security_rating)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=ncloc)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=bugs)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=code_smells)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=sqale_index)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=DEFRA_cyltfr-data&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=DEFRA_cyltfr-data)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![GitHub issues](https://img.shields.io/github/issues/DEFRA/cyltfr-data.svg)](https://github.com/DEFRA/cyltfr-data/issues/)
[![Code size](https://img.shields.io/github/languages/code-size/DEFRA/cyltfr-data.svg)]()
[![Repo size](https://img.shields.io/github/repo-size/DEFRA/cyltfr-data.svg)]()
[![Licence](https://img.shields.io/badge/licence-OGLv3-blue.svg)](http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3)

# Check Your Long Term Flood Risk Services (cyltfr-data)
?Repo for the Check Your Long Term Flood (CYLTFR) services admin data service.

This repository is part of the CYLTFR service which also includes:\
<https://github.com/DEFRA/cyltfr-app>\
<https://github.com/DEFRA/cyltfr-service>\
<https://github.com/DEFRA/cyltfr-admin>

## Prerequisites
Node v22.x/
Docker v20.10.0+

### Start app

`npm start`

### Test app

`npm test`

## Environment variables

| name                    | description      | required |        default        |                valid               | notes |
|-------------------------|------------------|:--------:|-----------------------|:----------------------------------:|-------|
| NODE_ENV                | Environment name   |    no    | dev                   | dev,test,pre,prod-green,prod-blue  |       |
| HOST                    | Host name          |    no    | 0.0.0.0               |                                    |       |
| PORT                    | Port number        |    no    | 3000                  |                                    |       |
| STAND_ALONE             | Development option |    no    | false                 |                                    |       |
| AWS_BUCKET_REGION       |                    |    yes   |                       |                                    |       |
| AWS_BUCKET_NAME         |                    |    yes   |                       |                                    |       |
| HOLDING_COMMENTS_PREFIX |                    |    no    | holding-comments      |                                    |       |
| MANIFEST_FILENAME       |                    |    no    | manifest.json         |                                    |       |

## Running the application locally

`$ node index.js`

## Debugging the application in docker using vscode

First build the debug image using

`$ npm run container:builddebug`

Configure vscode using a debug configuration launch.json like

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "address": "0.0.0.0",
      "name": "Attach",
      "port": 9229,
      "request": "attach",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "/home/node/app",
      "type": "node"
    }
  ]
}
```

Then you can run the container in debug mode using

`$ npm run container:debug`

or 

`$ npm run cd`

This maps your source directory into the container, so that you can make changes locally and they'll be reflected in the container.

If you have auto-attach configured in vscode you might need to disable it for this to work.

When you have finished end the debug container using

`$ npm run container:stopdebug`

or 

`$ npm run cx`

## License
THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

>Contains public sector information licensed under the Open Government licence v3

### About the license
The Open Government Licence (OGL) was developed by the Controller of His Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.