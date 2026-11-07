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

// [START iap_v1_identityawareproxyadminservice_validate_iap_attribute_expression]
'use strict';

const {IdentityAwareProxyAdminServiceClient} = require('@google-cloud/iap');
const {status} = require('@grpc/grpc-js');

const client = new IdentityAwareProxyAdminServiceClient();

/**
 * Use the validateIapAttributeExpression method
 *
 * @param {string} name - The resource name of the IAP protected resource.
 */
async function validateIapAttributeExpression(name) {
  try {
    const expression =
      'attributes.saml_attributes.filter(attribute, attribute.name in ["admin"])';

    const request = {
      name,
      expression,
    };

    const [response] = await client.validateIapAttributeExpression(request);
    console.log(`Successfully validated expression for resource: ${name}`);
    return response;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid expression or argument: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Target resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`Validation failed with error: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { validateIapAttributeExpression };
// [END iap_v1_identityawareproxyadminservice_validate_iap_attribute_expression]
