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

// [START networkservices_v1_networkservices_grpcroute_create]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the createGrpcRoute method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location or region (for example, 'global' or 'us-central1').
 * @param {string} grpcRouteId - The caller-chosen identifier for the GrpcRoute. Must consist of lowercase letters, digits, and hyphens (for example, 'example-grpc-route').
 */
async function createGrpcRoute(projectId, locationId, grpcRouteId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const action = {
      timeout: {
        seconds: 30,
      },
    };

    const grpcRoute = {
      hostnames: ['example.com'],
      rules: [
        {
          action,
        },
      ],
    };

    const request = {
      parent,
      grpcRouteId,
      grpcRoute,
    };

    // CreateGrpcRoute is a long-running operation; wait for it to complete.
    const [operation] = await client.createGrpcRoute(request);
    const [response] = await operation.promise();

    console.log(`Created GrpcRoute: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`GrpcRoute ${grpcRouteId} already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating GrpcRoute: ${err.message}`);
    } else {
      console.error(`Operation failed with gRPC status ${err.code}: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { createGrpcRoute };
// [END networkservices_v1_networkservices_grpcroute_create]
