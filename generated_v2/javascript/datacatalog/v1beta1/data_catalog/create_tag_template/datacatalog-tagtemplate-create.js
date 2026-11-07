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

// [START datacatalog_v1beta1_datacatalog_tagtemplate_create]
'use strict';

const {DataCatalogClient} = require('@google-cloud/datacatalog').v1beta1;
const {status} = require('@grpc/grpc-js');

const client = new DataCatalogClient();

/**
 * Creates a Data Catalog tag template.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} tagTemplateId - ID of the TagTemplate (for example, 'example-tagtemplate-id')
 */
async function createTagTemplate(projectId, tagTemplateId) {
  const parent = `projects/${projectId}/locations/us-central1`;
  const tagTemplate = {
    displayName: 'Example Tag Template',
    fields: {
      source: {
        displayName: 'Source',
        type: {
          primitiveType: 'STRING',
        },
      },
    },
  };

  const request = {
    parent,
    tagTemplateId,
    tagTemplate,
  };

  try {
    const [response] = await client.createTagTemplate(request);
    console.log(`Created tag template: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.log(`Tag template already exists: ${tagTemplateId}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log(`Cannot create tag template: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log(`Permission denied: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = {createTagTemplate};
// [END datacatalog_v1beta1_datacatalog_tagtemplate_create]
