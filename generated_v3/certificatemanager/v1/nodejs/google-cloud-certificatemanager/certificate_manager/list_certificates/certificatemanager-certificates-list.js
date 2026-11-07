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

// [START certificatemanager_v1_certificatemanager_certificates_list]
'use strict';

const {CertificateManagerClient} = require('@google-cloud/certificate-manager');
const {status} = require('@grpc/grpc-js');

const client = new CertificateManagerClient();

/**
 * Use the listCertificates method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud location ID (for example, 'global' or 'us-central1').
 */
async function listCertificates(projectId, locationId) {
  try {
    // Construct the parent resource identifier
    const parent = `projects/${projectId}/locations/${locationId}`;

    // Retrieve the list of certificates matching the parent location
    const [certificates] = await client.listCertificates({parent});

    for (const certificate of certificates) {
      console.log(`Certificate Name: ${certificate.name}`);
      console.log(`Description: ${certificate.description || 'None'}`);
      console.log(`SAN DNS Names: ${certificate.sanDnsnames ? certificate.sanDnsnames.join(', ') : 'None'}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else {
      console.error(`API operation failed: ${err.message}`);
      throw err;
    }
  }
}

module.exports = { listCertificates };
// [END certificatemanager_v1_certificatemanager_certificates_list]
