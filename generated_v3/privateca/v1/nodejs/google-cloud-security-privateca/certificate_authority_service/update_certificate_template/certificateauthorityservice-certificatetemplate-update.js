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

// [START privateca_v1_certificateauthorityservice_certificatetemplate_update]
'use strict';

const {CertificateAuthorityServiceClient} = require('@google-cloud/security-private-ca');
const {status} = require('@grpc/grpc-js');

const client = new CertificateAuthorityServiceClient();

/**
 * Updates an existing certificate template.
 */
async function updateCertificateTemplate() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1';
    let certificateTemplateId = 'example-certificate-template-id';

    // Retrieve an existing certificate template or create one to update
    const parent = client.locationPath(projectId, location);
    const [existingTemplates] = await client.listCertificateTemplates({parent});

    if (existingTemplates && existingTemplates.length > 0) {
      certificateTemplateId = existingTemplates[0].name.split('/').pop();
    } else {
      try {
        const [createOp] = await client.createCertificateTemplate({
          parent,
          certificateTemplateId,
          certificateTemplate: {
            description: 'Initial certificate template description',
          },
        });
        await createOp.promise();
      } catch (createErr) {
        if (createErr.code !== status.ALREADY_EXISTS) {
          throw createErr;
        }
      }
    }

    const certificateTemplate = {
      name: client.certificateTemplatePath(
        projectId,
        location,
        certificateTemplateId
      ),
      description: 'Updated certificate template description',
      labels: {
        env: 'production',
      },
    };
    const updateMask = {
      paths: ['description', 'labels'],
    };

    const [operation] = await client.updateCertificateTemplate({
      certificateTemplate,
      updateMask,
    });
    const [response] = await operation.promise();

    console.log(`Updated certificate template: ${response.name}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.ALREADY_EXISTS) {
      console.error(`Resource already exists: ${err.message}`);
    } else if (err.code) {
      console.error(`Service error (${err.code}): ${err.message}`);
    } else {
      console.error('Unexpected error:', err);
    }
  }
}

module.exports = { updateCertificateTemplate };
// [END privateca_v1_certificateauthorityservice_certificatetemplate_update]
