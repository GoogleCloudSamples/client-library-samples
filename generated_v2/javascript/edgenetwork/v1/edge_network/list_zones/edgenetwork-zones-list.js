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

// [START edgenetwork_v1_edgenetwork_zones_list]
'use strict';

const {EdgeNetworkClient} = require('@google-cloud/edgenetwork');
const {status} = require('@grpc/grpc-js');

const client = new EdgeNetworkClient();

/**
 * Use the listZones method
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud location/region ID.
 */
async function listZones(projectId, locationId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;

    const [zones] = await client.listZones({parent});

    for (const zone of zones) {
      console.log(`Zone: ${zone.name}`);
    }
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { listZones };
// [END edgenetwork_v1_edgenetwork_zones_list]
