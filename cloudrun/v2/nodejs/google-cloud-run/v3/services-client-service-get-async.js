// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START cloudrun_v2_services_service_get_async]
const {ServicesClient} = require('@google-cloud/run').v2;
const {status} = require('@grpc/grpc-js');

const client = new ServicesClient();

/**
 * Get a Cloud Run service by its name.
 *
 * This sample demonstrates how to retrieve details of a specific Cloud Run service
 * using the `getService` method. It shows how to construct the service name
 * and handle potential 'NOT_FOUND' errors.
 *
 * @param {string} projectId The Google Cloud Project ID.
 * @param {string} location The Google Cloud region where the service is located.
 * @param {string} serviceId The ID of the service to retrieve.
 */
async function getService(projectId, location, serviceId) {
  // Construct the full service name.
  const name = `projects/${projectId}/locations/${location}/services/${serviceId}`;

  const request = {
    name,
  };

  try {
    const [service] = await client.getService(request);
    console.log(`Successfully retrieved service: ${service.name}`);
    console.log(`  Description: ${service.description || 'N/A'}`);
    console.log(`  URI: ${service.uri}`);
    console.log(`  Status: ${service.terminalCondition?.state || 'UNKNOWN'}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(
        `Service ${serviceId} not found in location ${location} of project ${projectId}.`,
      );
      console.error(
        'Please ensure the service ID and location are correct and the service exists.',
      );
    } else {
      console.error('Error getting service:', err);
    }
  }
}

// [END cloudrun_v2_services_service_get_async]

async function main(args) {
  if (args.length !== 3) {
    throw new Error(`3 arguments required but received ${args.length}.`);
  }
  await getService(args[0], args[1], args[2]);
}

if (require.main === module) {
  process.on('uncaughtException', err => {
    console.error(`Error running sample: ${err.message}`);
    console.error(`To run this sample from the command-line, provide the following arguments:
 - Google Cloud Project ID like 'my-project-id'
 - Google Cloud Location like 'us-central1'
 - Service ID like 'my-service'

Usage:

 node services-client-service-get-async.js my-project-id us-central1 my-service
`);
    process.exitCode = 1;
  });

  main(process.argv.slice(2));
}

module.exports = {
  getService,
};
