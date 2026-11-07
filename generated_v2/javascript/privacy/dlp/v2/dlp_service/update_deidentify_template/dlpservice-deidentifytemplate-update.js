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

// [START dlp_v2_dlpservice_deidentifytemplate_update]
'use strict';

const {DlpServiceClient} = require('@google-cloud/dlp');
const {status} = require('@grpc/grpc-js');

const client = new DlpServiceClient();

/**
 * Updates an existing Sensitive Data Protection de-identify template.
 */
async function updateDeidentifyTemplate() {
  let createdTemplateName;
  try {
    const projectId = await client.getProjectId();
    const parent = `projects/${projectId}/locations/global`;

    // Create a template to demonstrate the update operation.
    const transformation = {
      primitiveTransformation: {
        replaceWithInfoTypeConfig: {},
      },
    };
    const initialConfig = {
      infoTypeTransformations: {
        transformations: [transformation],
      },
    };
    const [created] = await client.createDeidentifyTemplate({
      parent,
      deidentifyTemplate: {
        displayName: 'Original Display Name',
        description: 'Original description',
        deidentifyConfig: initialConfig,
      },
    });
    createdTemplateName = created.name;

    const name = createdTemplateName;

    const deidentifyTemplate = {
      displayName: 'Updated Display Name',
      description: 'Updated description for the de-identify template',
    };

    const updateMask = {
      paths: ['description', 'display_name'],
    };

    const request = {
      name,
      deidentifyTemplate,
      updateMask,
    };

    const [response] = await client.updateDeidentifyTemplate(request);
    console.log(`Updated template: ${response.name}`);
    console.log(`Display name: ${response.displayName}`);
    console.log(`Description: ${response.description}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Template not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Failed to update template: ${err.message}`);
    }
  } finally {
    if (createdTemplateName) {
      try {
        await client.deleteDeidentifyTemplate({name: createdTemplateName});
      } catch (err) {
        if (err.code !== status.NOT_FOUND) {
          console.error(`Failed to delete template: ${err.message}`);
        }
      }
    }
  }
}

module.exports = {updateDeidentifyTemplate};
// [END dlp_v2_dlpservice_deidentifytemplate_update]
