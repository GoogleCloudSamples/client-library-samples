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

// [START domains_v1beta1_domains_retrieve_transfer_parameters]
'use strict';

const {DomainsClient} = require('@google-cloud/domains').v1beta1;
const {status} = require('@grpc/grpc-js');

/**
 * Retrieves domain transfer parameters for a specified domain.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location ID (for example, 'global')
 * @param {string} location - The Google Cloud location (for example, 'global')
 */
async function retrieveTransferParameters(projectId, locationId, location) {
  const client = new DomainsClient();

  try {
    const domainName = 'example.com';
    const parent = client.locationPath(projectId, location || locationId || 'global');

    const request = {
      domainName,
      location: parent,
    };

    const [response] = await client.retrieveTransferParameters(request);

    console.log(`Domain: ${response.transferParameters?.domainName}`);
    console.log(`Current registrar: ${response.transferParameters?.currentRegistrar}`);
    console.log(`Transfer lock state: ${response.transferParameters?.transferLockState}`);
    return response;
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log('Domain transfer is deprecated.');
    } else if (err.code === status.NOT_FOUND) {
      console.log('Domain not found.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log('Permission denied.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log('Invalid argument.');
    } else {
      throw err;
    }
  }
}

module.exports = { retrieveTransferParameters };
// [END domains_v1beta1_domains_retrieve_transfer_parameters]
