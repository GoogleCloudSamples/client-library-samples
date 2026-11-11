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

// [START servicemanagement_v1_servicemanager_submit_config_source]
'use strict';

const {ServiceManagerClient} = require('@google-cloud/service-management');
const {status} = require('@grpc/grpc-js');

const client = new ServiceManagerClient();

/**
 * Submits a configuration source for a managed service.
 *
 * @param {string} serviceName - Name of the managed service (for example, 'example.googleapis.com').
 */
async function submitConfigSource(serviceName) {
  try {
    const openApiConfig = [
      'swagger: "2.0"',
      'info:',
      '  title: "Example API"',
      '  description: "Managed service configuration"',
      '  version: "1.0.0"',
      `host: "${serviceName}"`,
      'paths: {}',
    ].join('\n');

    const configSource = {
      files: [
        {
          filePath: 'openapi.yaml',
          fileContents: Buffer.from(openApiConfig, 'utf8'),
          fileType: 'OPEN_API_YAML',
        },
      ],
    };

    const request = {
      serviceName,
      configSource,
    };

    // Submits the configuration source and returns a long-running operation
    const [operation] = await client.submitConfigSource(request);
    console.log(`Operation initiated: ${operation.name}`);

    // Waits for the long-running operation to complete
    const [response] = await operation.promise();

    console.log(`Service configuration submitted: ${response.serviceConfig?.id}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Managed service not found: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid configuration source provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else {
      console.error(`API error occurred with code ${err.code}: ${err.message}`);
    }
  }
}

module.exports = {submitConfigSource};
// [END servicemanagement_v1_servicemanager_submit_config_source]
