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

// [START certificatemanager_v1_certificatemanager_certificatemap_create]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Creates a certificate map.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location (certificate maps are global, for example, 'global')
 * @param {string} certificateMapId - ID of the CertificateMap (for example, 'example-certificatemap-id')
 */
async function createCertificateMap(projectId, locationId, certificateMapId) {
  try {
    // Certificate maps are global resources and require the 'global' location.
    const mapLocation = locationId === 'global' ? locationId : 'global';
    const parent = client.locationPath(projectId, mapLocation);
    const certificateMap = {
      description: 'Example certificate map description',
      labels: {
        environment: 'example',
      },
    };

    const [operation] = await client.createCertificateMap({
      parent,
      certificateMapId,
      certificateMap,
    });

    const [response] = await operation.promise();
    console.log(`Certificate map created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Certificate map ${certificateMapId} already exists.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create certificate map: ${err.message}`);
    }
  }
}

module.exports = { createCertificateMap };
// [END certificatemanager_v1_certificatemanager_certificatemap_create]
