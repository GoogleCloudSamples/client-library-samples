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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_metrics_get]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Use the getMetrics method
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id').
 * @param {string} keyId - The server-generated ID of the reCAPTCHA key (for example, '6Le-w-cUAAAAAF_example_key_id'). Obtain this from an existing Key resource, such as from the response of ListKeys or CreateKey.
 */
async function getMetrics(projectId, keyId) {
  try {
    const name = `projects/${projectId}/keys/${keyId}/metrics`;

    const request = {
      name,
    };

    const [metrics] = await client.getMetrics(request);

    console.log(`Retrieved metrics for: ${metrics.name}`);
    if (metrics.scoreMetrics && metrics.scoreMetrics.length > 0) {
      console.log(`Number of score metric intervals: ${metrics.scoreMetrics.length}`);
    }
    if (metrics.challengeMetrics && metrics.challengeMetrics.length > 0) {
      console.log(`Number of challenge metric intervals: ${metrics.challengeMetrics.length}`);
    }
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Metrics resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing metrics: ${err.message}`);
    } else {
      console.error(`Failed to retrieve metrics: ${err.message}`);
    }
  }
}

module.exports = { getMetrics };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_metrics_get]
