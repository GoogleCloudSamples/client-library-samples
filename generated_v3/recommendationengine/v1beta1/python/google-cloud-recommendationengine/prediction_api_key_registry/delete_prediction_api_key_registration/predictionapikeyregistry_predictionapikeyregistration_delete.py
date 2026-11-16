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

# [START recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistration_delete]
import google.api_core.exceptions
from google.cloud import recommendationengine_v1beta1

client = recommendationengine_v1beta1.PredictionApiKeyRegistryClient()


def delete_prediction_api_key_registration(project_id: str) -> None:
    """Use the delete_prediction_api_key_registration method.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
    """
    your_api_key = "example-api-key"
    name = (
        f"projects/{project_id}/locations/global/catalogs/default_catalog/"
        f"eventStores/default_event_store/predictionApiKeyRegistrations/{your_api_key}"
    )

    try:
        client.delete_prediction_api_key_registration(name=name)
        print(f"Deleted prediction API key registration: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete prediction API key registration: {e}")


# [END recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistration_delete]
