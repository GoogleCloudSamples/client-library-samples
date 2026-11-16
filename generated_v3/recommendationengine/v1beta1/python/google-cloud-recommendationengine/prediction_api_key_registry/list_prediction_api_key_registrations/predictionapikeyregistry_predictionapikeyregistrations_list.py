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

# [START recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistrations_list]
import os

from google.api_core import exceptions
from google.cloud import recommendationengine_v1beta1


def list_prediction_api_key_registrations() -> None:
    """Lists prediction API key registrations in an event store."""
    client = recommendationengine_v1beta1.PredictionApiKeyRegistryClient()

    project_id = os.getenv("GOOGLE_CLOUD_PROJECT") or os.getenv(
        "PROJECT_ID", "example-project-id"
    )
    location = "global"
    catalog_id = "default_catalog"
    event_store_id = "default_event_store"

    parent = (
        f"projects/{project_id}/locations/{location}/catalogs/{catalog_id}"
        f"/eventStores/{event_store_id}"
    )

    request = recommendationengine_v1beta1.ListPredictionApiKeyRegistrationsRequest(
        parent=parent,
    )

    try:
        response = client.list_prediction_api_key_registrations(request=request)
        count = 0
        for registration in response:
            print(f"API Key: {registration.prediction_api_key}")
            print(f"Container Tag: {registration.container_tag}")
            count += 1
        if count == 0:
            print("No prediction API key registrations found.")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END recommendationengine_v1beta1_predictionapikeyregistry_predictionapikeyregistrations_list]
