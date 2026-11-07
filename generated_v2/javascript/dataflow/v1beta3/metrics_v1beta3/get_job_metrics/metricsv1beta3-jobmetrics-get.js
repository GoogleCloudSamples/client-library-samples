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

// [START dataflow_v1beta3_metricsv1beta3_jobmetrics_get]
'use strict';

const {MetricsV1Beta3Client} = require('@google-cloud/dataflow');
const {status} = require('@grpc/grpc-js');

const client = new MetricsV1Beta3Client();

/**
 * Retrieves metrics for a specific Cloud Dataflow job.
 *
 * @param {string} projectId - The Google Cloud project ID containing the Dataflow job.
 * @param {string} locationId - The regional endpoint where the Dataflow job runs (for example, 'us-central1').
 * @param {string} jobId - The server-generated ID of the Dataflow job.
 */
async function getJobMetrics(projectId, locationId, jobId) {
  try {
    const request = {
      projectId,
      location: locationId,
      jobId,
    };

    const [response] = await client.getJobMetrics(request);

    console.log(`Retrieved metrics for job: ${jobId}`);
    if (response.metrics) {
      for (const metric of response.metrics) {
        const metricName = metric.name ? metric.name.name : 'Unnamed metric';
        console.log(`Metric: ${metricName}`);
      }
    }
    return response;
  } catch (err) {
    if (err.code === status.NOT_FOUND) {
      console.error(`Job ${jobId} not found in project ${projectId} and location ${locationId}.`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied accessing metrics for job ${jobId}.`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid arguments provided for job ${jobId}: ${err.message}`);
    } else {
      console.error(`Failed to retrieve job metrics: ${err.message}`);
    }
    throw err;
  }
}

module.exports = { getJobMetrics };
// [END dataflow_v1beta3_metricsv1beta3_jobmetrics_get]
