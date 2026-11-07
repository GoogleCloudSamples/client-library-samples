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

// [START networkservices_v1_networkservices_grpcroute_get]
'use strict';

const {NetworkServicesClient} = require('@google-cloud/networkservices');
const {status} = require('@grpc/grpc-js');

const client = new NetworkServicesClient();

/**
 * Use the getGrpcRoute method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} grpcRouteId - ID of the GrpcRoute (for example, 'example-grpcroute-id')
 */
async function getGrpcRoute(projectId, locationId, grpcRouteId) {
  try {
    const name = client.grpcRoutePath(projectId, locationId, grpcRouteId);
    const request = {
      name,
    };

    const [grpcRoute] = await client.getGrpcRoute(request);

    console.log(`Retrieved GrpcRoute: ${grpcRoute.name}`);
    console.log(`Create time: ${grpcRoute.createTime?.seconds}`);
    return grpcRoute;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`GrpcRoute not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing GrpcRoute: ${err.message}`);
    } else {
      console.error(`Failed to retrieve GrpcRoute: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getGrpcRoute };
// [END networkservices_v1_networkservices_grpcroute_get]
