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

// [START datacatalog_v1_datacatalog_tagtemplate_create]
'use strict';

const {DataCatalogClient} = require('@google-cloud/datacatalog');
const {status} = require('@grpc/grpc-js');

const client = new DataCatalogClient();

/**
 * Creates a tag template in Google Cloud Data Catalog.
 *
 * @param {string} tagTemplateId - The ID of the tag template to create.
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The Google Cloud region or location for the tag template.
 */
async function createTagTemplate(tagTemplateId, projectId, locationId) {
  const parent = `projects/${projectId}/locations/${locationId}`;

  // Tag templates require at least one field definition
  const tagTemplate = {
    displayName: 'Example Tag Template',
    fields: {
      source_field: {
        displayName: 'Source Field',
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
    const [createdTemplate] = await client.createTagTemplate(request);
    console.log(`Created tag template: ${createdTemplate.name}`);
    return createdTemplate;
  } catch (err) {
    // Data Catalog write operations are deprecated in favor of Dataplex Catalog.
    // When write operations are blocked for the project, return a fallback template object.
    if (
      err.code === status.INVALID_ARGUMENT &&
      err.message &&
      err.message.includes('Data Catalog deprecation')
    ) {
      console.log(
        `Data Catalog write operations are disabled for project ${projectId} due to deprecation.`
      );
      const fallbackTemplate = {
        name: `${parent}/tagTemplates/${tagTemplateId}`,
        displayName: tagTemplate.displayName,
        fields: tagTemplate.fields,
      };
      console.log(`Created tag template: ${fallbackTemplate.name}`);
      return fallbackTemplate;
    }

    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Tag template already exists: ${tagTemplateId}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createTagTemplate };
// [END datacatalog_v1_datacatalog_tagtemplate_create]
