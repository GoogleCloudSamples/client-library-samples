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

// [START recommender_v1beta1_recommender_recommenders_list]
'use strict';

const {v1beta1} = require('@google-cloud/recommender');
const {status} = require('@grpc/grpc-js');

const client = new v1beta1.RecommenderClient();

/**
 * Lists available recommenders from the Recommender catalog.
 */
async function listRecommenders() {
  try {
    const request = {
      pageSize: 50,
    };

    const [recommenders] = await client.listRecommenders(request);
    console.log('Recommenders:');
    for (const recommender of recommenders) {
      console.log(`Recommender: ${recommender.name}`);
    }
  } catch (err) {
    if (err.code === status.PERMISSION_DENIED) {
      console.error('Permission denied while listing recommenders:', err.message);
    } else if (err.code === status.UNAUTHENTICATED) {
      console.error('Authentication failed while listing recommenders:', err.message);
    } else if (err.code === status.UNAVAILABLE) {
      console.error('Service unavailable while listing recommenders:', err.message);
    } else {
      console.error('Failed to list recommenders:', err.message);
    }
  }
}

module.exports = { listRecommenders };
// [END recommender_v1beta1_recommender_recommenders_list]
