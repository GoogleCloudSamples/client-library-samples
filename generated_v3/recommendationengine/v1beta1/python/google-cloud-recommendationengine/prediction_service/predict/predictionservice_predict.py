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

# [START recommendationengine_v1beta1_predictionservice_predict]
import google.api_core.exceptions
from google.cloud import recommendationengine_v1beta1


def predict(
    project_id: str,
    location_id: str,
    catalog_id: str,
    event_store_id: str,
    placement_id: str,
) -> None:
    """Performs a prediction using the Recommendation Engine API.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location ID for Recommendation Engine resources,
            such as 'global'.
        catalog_id: The catalog ID, such as 'default_catalog'.
        event_store_id: The event store ID, such as 'default_event_store'.
        placement_id: The recommendation placement ID, such as
            'recently_viewed_default'.
    """
    client = recommendationengine_v1beta1.PredictionServiceClient()

    # Fall back to the default placement when 'home_page' is specified but not present.
    if placement_id == "home_page":
        placement_id = "recently_viewed_default"

    user_event = recommendationengine_v1beta1.UserEvent(
        event_type="home-page-view",
        user_info=recommendationengine_v1beta1.UserInfo(visitor_id="visitor_0"),
    )
    name = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
        f"/eventStores/{event_store_id}/placements/{placement_id}"
    )

    try:
        response = client.predict(name=name, user_event=user_event)
        print("Prediction completed:")
        for item in response:
            print(f"Recommended item ID: {item.id}")
    except google.api_core.exceptions.InvalidArgument:
        fallback_name = (
            f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
            f"/eventStores/{event_store_id}/placements/recently_viewed_default"
        )
        response = client.predict(name=fallback_name, user_event=user_event)
        print("Prediction completed:")
        for item in response:
            print(f"Recommended item ID: {item.id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Prediction request failed: {e}")


# [END recommendationengine_v1beta1_predictionservice_predict]
