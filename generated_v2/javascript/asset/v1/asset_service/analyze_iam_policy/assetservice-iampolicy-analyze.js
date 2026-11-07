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

// [START cloudasset_v1_assetservice_analyze_iam_policy]
'use strict';

const {AssetServiceClient} = require('@google-cloud/asset');
const {status} = require('@grpc/grpc-js');

const client = new AssetServiceClient();

/**
 * Use the analyzeIamPolicy method
 *
 * @param {string} projectId - The Google Cloud project ID to scope the IAM policy analysis.
 */
async function analyzeIamPolicy(projectId) {
  try {
    const analysisQuery = {
      scope: `projects/${projectId}`,
      resourceSelector: {
        fullResourceName: `//cloudresourcemanager.googleapis.com/projects/${projectId}`,
      },
      options: {
        expandGroups: true,
        outputResourceEdges: true,
      },
    };

    const request = {
      analysisQuery,
    };

    const [response] = await client.analyzeIamPolicy(request);

    console.log(`Analysis scope: ${analysisQuery.scope}`);
    if (response.mainAnalysis && response.mainAnalysis.analysisResults) {
      for (const result of response.mainAnalysis.analysisResults) {
        console.log(`Attached resource: ${result.attachedResourceFullName}`);
        if (result.iamBinding) {
          console.log(`Role: ${result.iamBinding.role}`);
        }
      }
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error('Invalid argument provided for IAM policy analysis:', err.message);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while analyzing IAM policy:', err.message);
    } else if (err.code === status.NOT_FOUND) {
      console.error('Target resource not found for IAM policy analysis:', err.message);
    } else {
      console.error('IAM policy analysis failed with error:', err.message || err);
    }
  }
}

module.exports = { analyzeIamPolicy };
// [END cloudasset_v1_assetservice_analyze_iam_policy]
