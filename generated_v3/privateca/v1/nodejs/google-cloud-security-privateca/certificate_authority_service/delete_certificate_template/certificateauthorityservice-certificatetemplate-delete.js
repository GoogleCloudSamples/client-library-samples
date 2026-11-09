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

// [START privateca_v1_certificateauthorityservice_certificatetemplate_delete]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the deleteCertificateTemplate method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} certificateTemplateId - The caller-chosen ID of the CertificateTemplate to delete (for example, 'example-certificatetemplate-id').
 */
async function deleteCertificateTemplate(projectId, locationId, certificateTemplateId) {
  try {
    const name = `projects/${projectId}/locations/${locationId}/certificateTemplates/${certificateTemplateId}`;

    const [operation] = await client.deleteCertificateTemplate({name});
    await operation.promise();

    console.log(`Deleted certificate template: ${name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Certificate template not found: ${err.message}`);
    } else if (err.code === status.FAILED_PRECONDITION) {
      console.error(`Precondition failed: ${err.message}`);
    } else {
      console.error(`Failed to delete certificate template: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { deleteCertificateTemplate };
// [END privateca_v1_certificateauthorityservice_certificatetemplate_delete]
