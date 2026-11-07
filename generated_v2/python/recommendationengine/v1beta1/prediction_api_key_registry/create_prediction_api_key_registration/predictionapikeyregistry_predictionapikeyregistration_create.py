# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistration_create]
import google.api_core.exceptions
from google.cloud import recommendationengine_v1beta1

client = recommendationengine_v1beta1.PredictionApiKeyRegistryClient()


def create_prediction_api_key_registration(project_id: str) -> None:
    """Registers an API key for prediction calls.

    Args:
        project_id: The Google Cloud project ID.
    """
    parent = (
        f"projects/{project_id}/locations/global/catalogs/default_catalog/"
        "eventStores/default_event_store"
    )
    prediction_api_key_registration = (
        recommendationengine_v1beta1.PredictionApiKeyRegistration(
            api_key="AIzaSyExampleApiKey12345"
        )
    )

    try:
        response = client.create_prediction_api_key_registration(
            parent=parent,
            prediction_api_key_registration=prediction_api_key_registration,
        )
        print(f"Registered prediction API key: {response.api_key}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistration_create]
