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

// [START bigquerymigration_v2alpha_sqltranslationservice_translate_query]
'use strict';

const {SqlTranslationServiceClient} =
  require('@google-cloud/bigquery-migration').v2alpha;
const {status} = require('@grpc/grpc-js');

const client = new SqlTranslationServiceClient();

/**
 * Translates a SQL query to GoogleSQL.
 *
 * @param {string} projectId - The Google Cloud project ID.
 * @param {string} locationId - The location ID for the translation job (for example, 'us').
 */
async function translateQuery(projectId, locationId) {
  try {
    const query = 'SELECT top 100 * FROM sample_table;';
    const parent = `projects/${projectId}/locations/${locationId}`;
    const sourceDialect = 'TERADATA';

    const request = {
      parent,
      sourceDialect,
      query,
    };

    const [response] = await client.translateQuery(request);

    console.log(`Translated query: ${response.translatedQuery}`);
  } catch (err) {
    if (err.code && Object.values(status).includes(err.code)) {
      console.error(
        `Google Cloud API error [code ${err.code}]: ${err.details || err.message}`
      );
    } else {
      throw err;
    }
  }
}

module.exports = {translateQuery};
// [END bigquerymigration_v2alpha_sqltranslationservice_translate_query]
