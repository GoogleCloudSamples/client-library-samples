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

// [START privateca_v1_certificateauthorityservice_certificatetemplate_create]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Use the createCertificateTemplate method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} certificateTemplateId - ID of the CertificateTemplate (for example, 'example-certificatetemplate-id')
 */
async function createCertificateTemplate(projectId, locationId, certificateTemplateId) {
  try {
    const parent = client.locationPath(projectId, locationId);
    const certificateTemplate = {
      description: 'An example certificate template',
    };

    const request = {
      parent,
      certificateTemplateId,
      certificateTemplate,
    };

    const [operation] = await client.createCertificateTemplate(request);
    const [response] = await operation.promise();

    console.log(`Created certificate template: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Certificate template ${certificateTemplateId} already exists.`);
    } else {
      console.error('Error creating certificate template:', err);
    }
  }
}

module.exports = { createCertificateTemplate };
// [END privateca_v1_certificateauthorityservice_certificatetemplate_create]
