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

// [START licensemanager_v1_licensemanager_configuration_create]
'use strict';

const {LicenseManagerClient} = require('@google-cloud/licensemanager');
const {status} = require('@grpc/grpc-js');

const client = new LicenseManagerClient();

/**
 * Creates a configuration for a License Manager product.
 *
 * @param {string} configurationId - Caller-chosen unique ID of the Configuration (for example, 'example-configuration-id').
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} locationId - The Google Cloud location ID (for example, 'us-central1').
 * @param {string} productId - The ID of an existing SPLA Product (for example, 'example-product-id') obtained from ListProducts.
 */
async function createConfiguration(configurationId, projectId, locationId, productId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}`;
    const billingInfo = {
      userCountBilling: {
        userCount: 10,
      },
    };

    const configuration = {
      displayName: 'example-spla-configuration',
      product: `projects/${projectId}/locations/${locationId}/products/${productId}`,
      licenseType: 'LICENSE_TYPE_PER_MONTH_PER_USER',
      currentBillingInfo: billingInfo,
      nextBillingInfo: billingInfo,
    };

    const request = {
      parent,
      configurationId,
      configuration,
    };

    const [operation] = await client.createConfiguration(request);
    const [response] = await operation.promise();

    console.log(`Configuration created: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Configuration already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Specified resource not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else {
      console.error(`Failed to create configuration: ${err.message}`);
    }
  }
}

module.exports = { createConfiguration };
// [END licensemanager_v1_licensemanager_configuration_create]
