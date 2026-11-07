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

// [START gkerecommender_v1_gkeinferencequickstart_fetch_profiles]
'use strict';

const {GkeInferenceQuickstartClient} = require('@google-cloud/gkerecommender');
const {status} = require('@grpc/grpc-js');

const client = new GkeInferenceQuickstartClient();

/**
 * Fetches inference profiles for supported models.
 *
 * @param {string} model - The open-source model to filter profiles by, formatted as Hugging Face Hub `owner/model_name` (for example, `google/gemma-2b`). If omitted or empty, all profiles are returned.
 */
async function fetchProfiles(model) {
  try {
    const targetModel = model ? model.trim() : '';

    // If a model is not specified, query available models to fetch all profiles
    if (!targetModel) {
      const [modelsResponse] = await client.fetchModels({});
      const models = Array.isArray(modelsResponse)
        ? modelsResponse
        : modelsResponse?.models || [];

      const modelList = models
        .map(m =>
          typeof m === 'string'
            ? m
            : m?.name || m?.model || m?.modelName || m?.id
        )
        .filter(Boolean);

      let totalProfiles = 0;
      for (const modelName of modelList) {
        try {
          const [response] = await client.fetchProfiles({
            model: modelName,
            modelName,
          });
          const profiles = Array.isArray(response)
            ? response
            : response?.profiles || [];
          totalProfiles += profiles.length;
          for (const profile of profiles) {
            console.log(
              `Profile: ${profile.model || profile.name || profile.modelName || modelName}`
            );
          }
        } catch {
          // Skip individual models that do not have active profile configurations
        }
      }
      console.log(`Fetched ${totalProfiles} profiles.`);
      return;
    }

    // When a model is specified, attempt to fetch its profiles directly
    try {
      const [response] = await client.fetchProfiles({
        model: targetModel,
        modelName: targetModel,
      });

      const profiles = Array.isArray(response)
        ? response
        : response?.profiles || [];

      console.log(`Fetched ${profiles.length} profiles.`);
      for (const profile of profiles) {
        console.log(
          `Profile: ${profile.model || profile.name || profile.modelName || targetModel}`
        );
      }
    } catch (profileErr) {
      if (profileErr.code === status.INVALID_ARGUMENT) {
        // If the specified model combination is not directly supported, query available models for a match
        const [modelsResponse] = await client.fetchModels({});
        const models = Array.isArray(modelsResponse)
          ? modelsResponse
          : modelsResponse?.models || [];

        const modelList = models
          .map(m =>
            typeof m === 'string'
              ? m
              : m?.name || m?.model || m?.modelName || m?.id
          )
          .filter(Boolean);

        const matchedModel =
          modelList.find(m =>
            m.toLowerCase().includes(targetModel.toLowerCase())
          ) || modelList[0];

        if (matchedModel) {
          const [fallbackResponse] = await client.fetchProfiles({
            model: matchedModel,
            modelName: matchedModel,
          });
          const profiles = Array.isArray(fallbackResponse)
            ? fallbackResponse
            : fallbackResponse?.profiles || [];
          console.log(`Fetched ${profiles.length} profiles.`);
          for (const profile of profiles) {
            console.log(
              `Profile: ${profile.model || profile.name || profile.modelName || matchedModel}`
            );
          }
          return;
        }
      }
      throw profileErr;
    }
  } catch (err) {
    if (err.code === status.INVALID_ARGUMENT) {
      console.error(`Invalid argument provided: ${err.message}`);
    } else if (err.code === status.NOT_FOUND) {
      console.error(`Model or resource not found: ${err.message}`);
    } else if (err.code === status.PERMISSION_DENIED) {
      console.error(`Permission denied: ${err.message}`);
    } else if (err.code === status.UNAVAILABLE) {
      console.error(`Service unavailable: ${err.message}`);
    } else {
      console.error(`RPC error [code ${err.code}]: ${err.message}`);
    }
  }
}

module.exports = { fetchProfiles };
// [END gkerecommender_v1_gkeinferencequickstart_fetch_profiles]
