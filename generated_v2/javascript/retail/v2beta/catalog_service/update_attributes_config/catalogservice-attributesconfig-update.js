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

// [START retail_v2beta_catalogservice_attributesconfig_update]
'use strict';

const {CatalogServiceClient} = require('@google-cloud/retail').v2beta;
const {status} = require('@grpc/grpc-js');

/**
 * Updates the attributes configuration for a catalog.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID of the catalog. Cloud Retail catalogs typically reside in 'global'.
 * @param {string} catalogId - The catalog ID. The default catalog is 'default_catalog'.
 */
async function updateAttributesConfig(projectId, locationId, catalogId) {
  const client = new CatalogServiceClient();

  try {
    const attribute = {
      key: 'example_attribute_key',
      searchableOption: 'SEARCHABLE_ENABLED',
      indexableOption: 'INDEXABLE_ENABLED',
    };

    const attributesConfig = {
      name: `projects/${projectId}/locations/${locationId}/catalogs/${catalogId}/attributesConfig`,
      catalogAttributes: {
        example_attribute_key: attribute,
      },
    };

    const updateMask = {
      paths: ['catalog_attributes'],
    };

    const request = {
      attributesConfig,
      updateMask,
    };

    const [response] = await client.updateAttributesConfig(request);
    console.log(`Updated attributes configuration: ${response.name}`);
    return response;
  } catch (err) {
    if (err.code === status.FAILED_PRECONDITION) {
      console.log(
        'Cloud Retail is not enabled or data terms are not accepted for the project.'
      );
    } else if (err.code === status.NOT_FOUND) {
      console.log('The requested catalog or attributes configuration does not exist.');
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.log('The attributes configuration request contains invalid arguments.');
    } else if (err.code === status.PERMISSION_DENIED) {
      console.log('Permission denied when updating attributes configuration.');
    } else {
      throw err;
    }
  }
}

module.exports = {updateAttributesConfig};
// [END retail_v2beta_catalogservice_attributesconfig_update]
