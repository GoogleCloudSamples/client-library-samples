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

// [START policytroubleshooter_v3beta_policytroubleshooter_troubleshoot_iam_policy]
'use strict';

const {PolicyTroubleshooterClient} = require('@google-cloud/policy-troubleshooter-iam');
const {status} = require('@grpc/grpc-js');

const client = new PolicyTroubleshooterClient();

/**
 * Troubleshoots IAM access for a principal on a Google Cloud resource.
 *
 * @param {string} principal - The email address of the principal to check (for example, user@example.com or a service account email).
 * @param {string} fullResourceName - The full resource name identifying the target resource (for example, //cloudresourcemanager.googleapis.com/projects/example-project-id).
 * @param {string} permission - The IAM permission to check (for example, resourcemanager.projects.get).
 */
async function troubleshootIamPolicy(principal, fullResourceName, permission) {
  try {
    const accessTuple = {
      principal,
      fullResourceName,
      permission,
    };

    const request = {
      accessTuple,
    };

    const [response] = await client.troubleshootIamPolicy(request);

    console.log(`Overall access state: ${response.overallAccessState}`);
    return response;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Failed to troubleshoot IAM policy: ${err.message}`);
    }
  }
}

module.exports = { troubleshootIamPolicy };
// [END policytroubleshooter_v3beta_policytroubleshooter_troubleshoot_iam_policy]
