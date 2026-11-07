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

// [START dataform_v1_dataform_releaseconfig_get]
'use strict';

const {DataformClient} = require('@google-cloud/dataform');
const {status} = require('@grpc/grpc-js');

const client = new DataformClient();

/**
 * Retrieves a Dataform release configuration.
 */
async function getReleaseConfig() {
  try {
    const projectId =
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.PROJECT_ID ||
      (await client.getProjectId());
    const location =
      process.env.DATAFORM_LOCATION ||
      process.env.LOCATION ||
      process.env.REGION ||
      'us-central1';
    let repository =
      process.env.DATAFORM_REPOSITORY_ID ||
      process.env.DATAFORM_REPOSITORY ||
      process.env.REPOSITORY_ID ||
      process.env.REPOSITORY ||
      'example-repository';
    let releaseConfigId =
      process.env.DATAFORM_RELEASE_CONFIG_ID ||
      process.env.DATAFORM_RELEASE_CONFIG ||
      process.env.RELEASE_CONFIG_ID ||
      process.env.RELEASE_CONFIG ||
      'example-release-config';

    if (
      repository === 'example-repository' &&
      releaseConfigId === 'example-release-config'
    ) {
      try {
        const parent = `projects/${projectId}/locations/${location}`;
        const [repositories] = await client.listRepositories({parent});
        for (const repo of repositories) {
          const [configs] = await client.listReleaseConfigs({
            parent: repo.name,
          });
          if (configs && configs.length > 0) {
            const parts = configs[0].name.split('/');
            repository = parts[5];
            releaseConfigId = parts[7];
            break;
          }
        }
      } catch {
        // Fall back to default placeholder values if discovery fails.
      }
    }

    const name =
      process.env.DATAFORM_RELEASE_CONFIG_NAME ||
      process.env.RELEASE_CONFIG_NAME ||
      `projects/${projectId}/locations/${location}/repositories/${repository}/releaseConfigs/${releaseConfigId}`;

    const request = {
      name,
    };

    const [response] = await client.getReleaseConfig(request);

    console.log(`Release config: ${response.name}`);
    console.log(`Git commitish: ${response.gitCommitish}`);
    console.log(`Cron schedule: ${response.cronSchedule}`);
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.log(`Release config not found: ${err.message}`);
    } else if (err.code) {
      console.error(`Google API error code ${err.code}: ${err.message}`);
    } else {
      console.error(`Unexpected error: ${err.message}`);
    }
  }
}

module.exports = {getReleaseConfig};
// [END dataform_v1_dataform_releaseconfig_get]
