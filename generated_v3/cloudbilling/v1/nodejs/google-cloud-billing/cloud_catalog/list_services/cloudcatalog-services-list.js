// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START cloudbilling_v1_cloudcatalog_services_list]
'use strict';

const {CloudCatalogClient} = require('@google-cloud/billing');
const {status} = require('@grpc/grpc-js');

const client = new CloudCatalogClient();

/**
 * Lists all publicly available Google Cloud services in the catalog.
 */
async function listServices() {
  try {
    const [services] = await client.listServices();
    for (const service of services) {
      console.log(`Service ID: ${service.serviceId}`);
      console.log(`Display Name: ${service.displayName}`);
      console.log(`Resource Name: ${service.name}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAVAILABLE) {
      console.error(`Service unavailable: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`API error (code ${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error occurred:', err);
    }
  }
}

module.exports = { listServices };
// [END cloudbilling_v1_cloudcatalog_services_list]
