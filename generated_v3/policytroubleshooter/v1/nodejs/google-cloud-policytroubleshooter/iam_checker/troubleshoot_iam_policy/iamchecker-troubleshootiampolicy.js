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

// [START policytroubleshooter_v1_iamchecker_troubleshoot_iam_policy]
'use strict';

const {IamCheckerClient} = require('@google-cloud/policy-troubleshooter');
const {status} = require('@grpc/grpc-js');

const client = new IamCheckerClient();

/**
 * Troubleshoots an IAM policy to determine whether a principal has a permission on a resource.
 *
 * @param {string} principal - The email address of the principal to check (for example, 'member@example.com' or 'example-sa@example-project.iam.gserviceaccount.com'). Only Google Accounts and service accounts are supported.
 * @param {string} fullResourceName - The full resource name identifying the resource (for example, '//cloudresourcemanager.googleapis.com/projects/example-project').
 * @param {string} permission - The IAM permission to evaluate (for example, 'resourcemanager.projects.get').
 */
async function troubleshootIamPolicy(principal, fullResourceName, permission) {
  try {
    const request = {
      accessTuple: {
        principal,
        fullResourceName,
        permission,
      },
    };

    const [response] = await client.troubleshootIamPolicy(request);

    console.log(`Access state: ${response.accessState}`);
    if (response.explainedPolicies) {
      for (const policy of response.explainedPolicies) {
        console.log(`Policy access: ${policy.access}`);
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Resource not found: ${err.message}`);
    } else {
      console.error(`Error during policy troubleshooting: ${err.message}`);
    }
  }
}

module.exports = { troubleshootIamPolicy };
// [END policytroubleshooter_v1_iamchecker_troubleshoot_iam_policy]
