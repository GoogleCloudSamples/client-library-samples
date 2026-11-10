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

// [START storageinsights_v1_storageinsights_reportconfig_create]
'use strict';

const {StorageInsightsClient} = require('@google-cloud/storageinsights');
const {status} = require('@grpc/grpc-js');

const client = new StorageInsightsClient();

/**
 * Creates a report configuration in Google Cloud Storage Insights.
 */
async function createReportConfig() {
  try {
    const projectId = await client.getProjectId();
    const parent = client.locationPath(projectId, 'us-central1');

    const sourceBucket =
      process.env.SOURCE_BUCKET ||
      process.env.BUCKET_NAME ||
      `${projectId}-source-bucket`;
    const destinationBucket =
      process.env.DESTINATION_BUCKET ||
      process.env.BUCKET_NAME ||
      `${projectId}-destination-bucket`;

    const csvOptions = {
      recordSeparator: '\n',
      delimiter: ',',
      headerRequired: true,
    };

    const frequencyOptions = {
      frequency: 'DAILY',
      startDate: {
        year: 2025,
        month: 1,
        day: 1,
      },
      endDate: {
        year: 2026,
        month: 1,
        day: 1,
      },
    };

    const objectMetadataReportOptions = {
      metadataFields: ['project', 'bucket', 'name', 'size'],
      storageFilters: {
        bucket: sourceBucket,
      },
      storageDestinationOptions: {
        bucket: destinationBucket,
        destinationPath: 'reports/',
      },
    };

    const reportConfig = {
      reportFormat: 'FORMAT_CSV',
      frequencyOptions,
      csvOptions,
      objectMetadataReportOptions,
    };

    const request = {
      parent,
      reportConfig,
    };

    const [response] = await client.createReportConfig(request);
    console.log(`Created report config: ${response.name}`);
  } catch (err) {
    if (err.code === status.ALREADY_EXISTS) {
      console.error(`Report configuration already exists: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied while creating report configuration: ${err.message}`);
    } else if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid report configuration argument: ${err.message}`);
    } else {
      console.error(`API error creating report configuration: ${err.message}`);
    }
  }
}

module.exports = { createReportConfig };
// [END storageinsights_v1_storageinsights_reportconfig_create]
