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

// [START cloudsupport_v2beta_caseservice_caseclassifications_search]
'use strict';

const {CaseServiceClient} = require('@google-cloud/support');
const {status} = require('@grpc/grpc-js');

const client = new CaseServiceClient();

/**
 * Searches for case classifications based on a query filter.
 *
 * @param {string} query - An expression used to filter case classifications (for example, 'Compute Engine'). If empty, all classifications are returned.
 */
async function searchCaseClassifications(query) {
  try {
    let formattedQuery = query || '';

    // The Cloud Support API filter syntax uses field comparison expressions (for example, displayName:"Compute Engine").
    if (formattedQuery) {
      const funcMatch = formattedQuery.match(/\w+\(["']?(.*?)["']?\)/);
      if (funcMatch) {
        formattedQuery = `displayName:"${funcMatch[1]}"`;
      } else if (!formattedQuery.includes(':') && !formattedQuery.includes('=')) {
        const trimmed = formattedQuery.replace(/^["']|["']$/g, '');
        formattedQuery = `displayName:"${trimmed}"`;
      }
    }

    const request = {
      query: formattedQuery,
    };

    // Retrieve case classifications matching the query filter
    const [classifications] = await client.searchCaseClassifications(request);

    console.log(`Found ${classifications.length} classification(s).`);
    for (const classification of classifications) {
      console.log(`Classification ID: ${classification.id}`);
      console.log(`Display Name: ${classification.displayName}`);
    }

    return classifications;
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid query filter argument: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error(`Authentication failed: ${err.message}`);
    } else {
      console.error(`Search case classifications error: ${err.message}`);
    }
  }
}

module.exports = { searchCaseClassifications };
// [END cloudsupport_v2beta_caseservice_caseclassifications_search]
