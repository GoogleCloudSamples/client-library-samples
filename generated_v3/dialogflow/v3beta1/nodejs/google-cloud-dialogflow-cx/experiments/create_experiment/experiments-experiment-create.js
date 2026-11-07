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

// [START dialogflow_v3beta1_experiments_experiment_create]
'use strict';

const {ExperimentsClient} = require('@google-cloud/dialogflow-cx');
const {status} = require('@grpc/grpc-js');

const client = new ExperimentsClient();

/**
 * Creates an experiment in the specified Dialogflow CX environment.
 *
 * @param {string} projectId - The Google Cloud project ID (for example, 'example-project-id')
 * @param {string} locationId - The Google Cloud region where the service is located (for example, 'us-central1')
 * @param {string} agentId - ID of the Agent (for example, 'example-agent-id')
 * @param {string} environmentId - ID of the Environment (for example, 'example-environment-id')
 */
async function createExperiment(projectId, locationId, agentId, environmentId) {
  try {
    const parent = `projects/${projectId}/locations/${locationId}/agents/${agentId}/environments/${environmentId}`;
    const experiment = {
      displayName: 'Example Experiment',
      description: 'An experiment evaluating conversation flows.',
    };

    const request = {
      parent,
      experiment,
    };

    const [response] = await client.createExperiment(request);

    console.log(`Experiment created successfully: ${response.name}`);
    console.log(`Display Name: ${response.displayName}`);
    console.log(`State: ${response.state}`);

    return response;
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Experiment already exists: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Parent resource not found: ${err.message}`);
    } else if (err.code !== undefined) {
      console.error(`Google API error [${err.code}]: ${err.message}`);
    } else {
      throw err;
    }
  }
}

module.exports = { createExperiment };
// [END dialogflow_v3beta1_experiments_experiment_create]
