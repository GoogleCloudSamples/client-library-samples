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

// [START recaptchaenterprise_v1_recaptchaenterpriseservice_assessment_create]
'use strict';

const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');
const {status} = require('@grpc/grpc-js');

const client = new RecaptchaEnterpriseServiceClient();

/**
 * Creates an assessment to analyze the risk of an event.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 */
async function createAssessment(projectId) {
  try {
    const parent = `projects/${projectId}`;

    // Obtain a valid site key from environment variables or project keys.
    let siteKey =
      process.env.RECAPTCHA_SITE_KEY ||
      process.env.RECAPTCHA_KEY ||
      process.env.SITE_KEY;

    if (!siteKey) {
      const [keys] = await client.listKeys({parent});
      if (keys && keys.length > 0) {
        siteKey = keys[0].name.split('/').pop();
      } else {
        const [createdKey] = await client.createKey({
          parent,
          key: {
            displayName: 'example-key',
            webSettings: {
              allowAllDomains: true,
              integrationType: 'SCORE',
            },
          },
        });
        siteKey = createdKey.name.split('/').pop();
      }
    }

    const assessment = {
      event: {
        token: process.env.RECAPTCHA_TOKEN || 'example-token',
        siteKey,
      },
    };

    const [response] = await client.createAssessment({
      parent,
      assessment,
    });

    console.log(`Assessment created: ${response.name}`);

    if (!response.tokenProperties.valid) {
      console.log(`Token is invalid: ${response.tokenProperties.invalidReason}`);
      return;
    }

    console.log(`Risk score: ${response.riskAnalysis.score}`);
    for (const reason of response.riskAnalysis.reasons || []) {
      console.log(`Risk reason: ${reason}`);
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`API error: ${err.message}`);
    }
  }
}

module.exports = { createAssessment };
// [END recaptchaenterprise_v1_recaptchaenterpriseservice_assessment_create]
