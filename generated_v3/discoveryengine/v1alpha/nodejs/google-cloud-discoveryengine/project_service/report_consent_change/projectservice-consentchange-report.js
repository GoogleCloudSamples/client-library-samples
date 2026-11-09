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

// [START discoveryengine_v1alpha_projectservice_report_consent_change]
'use strict';

const {v1alpha} = require('@google-cloud/discoveryengine');
const {status} = require('@grpc/grpc-js');

const client = new v1alpha.ProjectServiceClient();

/**
 * Reports a consent change for a Google Cloud project.
 *
 * @param {string} projectId - The Google Cloud project ID.
 */
async function reportConsentChange(projectId) {
  try {
    const serviceTermId = 'GA_DATA_USE_TERMS';
    const project = `projects/${projectId}`;
    const consentChangeAction = 'ACCEPT';
    const serviceTermVersion = '2022-11-23';

    const request = {
      project,
      serviceTermId,
      serviceTermVersion,
      consentChangeAction,
    };

    const [response] = await client.reportConsentChange(request);
    console.log(`Reported consent change for project: ${response.name}`);
  } catch (err) {
    if (typeof err.code === 'number' && Object.values(status).includes(err.code)) {
      console.error(`Google Cloud API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { reportConsentChange };
// [END discoveryengine_v1alpha_projectservice_report_consent_change]
