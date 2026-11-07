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

// [START edgenetwork_v1_edgenetwork_interconnects_list]
'use strict';

const {EdgeNetworkClient} = require('@google-cloud/edgenetwork');
const {status} = require('@grpc/grpc-js');

/**
 * Lists interconnects within a specified Edge Network zone.
 *
 * @param {string} projectId - Google Cloud project ID.
 * @param {string} locationId - Google Cloud location ID (for example, 'us-central1').
 * @param {string} zoneId - Edge Network zone ID.
 */
async function listInterconnects(projectId, locationId, zoneId) {
  const client = new EdgeNetworkClient();
  const parent = `projects/${projectId}/locations/${locationId}/zones/${zoneId}`;
  const request = {
    parent,
  };

  try {
    const [interconnects] = await client.listInterconnects(request);

    console.log(`Retrieved ${interconnects.length} interconnect(s).`);
    for (const interconnect of interconnects) {
      console.log(`Interconnect name: ${interconnect.name}`);
    }
    return interconnects;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log('Retrieved 0 interconnect(s).');
      return [];
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log('Permission denied.');
      return [];
    }
    throw err;
  }
}

module.exports = {listInterconnects};
// [END edgenetwork_v1_edgenetwork_interconnects_list]
