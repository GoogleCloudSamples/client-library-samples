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

// [START tpu_v1_tpu_tensorflowversion_get]
'use strict';

const {TpuClient} = require('@google-cloud/tpu');
const {status} = require('@grpc/grpc-js');

const client = new TpuClient();

/**
 * Retrieves details of a specific TensorFlow version supported by Cloud TPU.
 */
async function getTensorFlowVersion() {
  try {
    const projectId = await client.getProjectId();
    const location = 'us-central1-a';
    const tensorflowVersion = '2.12.0';
    const name = `projects/${projectId}/locations/${location}/tensorflowVersions/${tensorflowVersion}`;

    const request = {
      name,
    };

    const [response] = await client.getTensorFlowVersion(request);
    console.log(`TensorFlow version name: ${response.name}`);
    console.log(`Version string: ${response.version}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`TensorFlow version not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while accessing TensorFlow version: ${err.message}`);
    } else {
      console.error(`API error encountered: ${err.message}`);
    }
  }
}

module.exports = { getTensorFlowVersion };
// [END tpu_v1_tpu_tensorflowversion_get]
