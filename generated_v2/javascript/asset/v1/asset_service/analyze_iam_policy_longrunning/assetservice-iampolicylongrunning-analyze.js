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

// [START cloudasset_v1_assetservice_analyze_iam_policy_longrunning]
'use strict';

const {AssetServiceClient} = require('@google-cloud/asset');
const {status} = require('@grpc/grpc-js');

const client = new AssetServiceClient();

/**
 * Use the analyzeIamPolicyLongrunning method
 *
 * @param {string} projectId - The Google Cloud project ID to scope the IAM policy analysis.
 */
async function analyzeIamPolicyLongrunning(projectId) {
  try {
    const outputConfig = {
      gcsDestination: {
        uri: 'gs://example-bucket/iam-analysis.json',
      },
    };
    const analysisQuery = {
      scope: `projects/${projectId}`,
    };

    const request = {
      analysisQuery,
      outputConfig,
    };

    const [operation] = await client.analyzeIamPolicyLongrunning(request);
    console.log(`Operation initiated: ${operation.name}`);

    const [response] = await operation.promise();
    console.log('Analysis completed successfully.');
    console.log(`Results exported to: ${outputConfig.gcsDestination.uri}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(`Google Cloud Asset API error [code ${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { analyzeIamPolicyLongrunning };
// [END cloudasset_v1_assetservice_analyze_iam_policy_longrunning]
