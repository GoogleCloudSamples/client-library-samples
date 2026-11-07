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

// [START networksecurity_v1alpha1_mirroring_mirroringendpointgroups_list]
'use strict';

const {MirroringClient} = require('@google-cloud/network-security').v1alpha1;
const {status} = require('@grpc/grpc-js');

const client = new MirroringClient();

/**
 * Lists network security mirroring endpoint groups in a given project and location.
 */
async function listMirroringEndpointGroups() {
  try {
    const projectId = await client.getProjectId();
    const location = 'global';
    const parent = `projects/${projectId}/locations/${location}`;

    const request = {
      parent,
    };

    const [endpointGroups] = await client.listMirroringEndpointGroups(request);

    if (endpointGroups.length === 0) {
      console.log('No mirroring endpoint groups found.');
      return;
    }

    for (const group of endpointGroups) {
      console.log(`Endpoint group: ${group.name}`);
      console.log(`State: ${group.state}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API error [code ${err.code}]: ${err.message}`);
    }
  }
}

module.exports = { listMirroringEndpointGroups };
// [END networksecurity_v1alpha1_mirroring_mirroringendpointgroups_list]
