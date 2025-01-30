# Check Your Long Term Flood Risk Services (cyltfr-data)

# v5.1.0

## Release date 11 February 2025

### Improve data caching on the risk-data service.

The service no longer reloads every file from the S3 bucket after the cache interval time, but will check if the
`manifest.json` file has been updated. If no updates are made it will continue to return the previously
cached data.
