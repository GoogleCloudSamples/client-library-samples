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

# [START recommender_v1beta1_recommender_insighttypeconfig_update]
import google.api_core.exceptions
from google.cloud import recommender_v1beta1
from google.protobuf import field_mask_pb2

client = recommender_v1beta1.RecommenderClient()


def update_insight_type_config(
    project_id: str, location_id: str, insight_type_id: str
) -> None:
    """Updates the configuration for a specified insight type.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        insight_type_id: The identifier of the insight type (for example,
          'google.compute.firewall.Insight').
    """
    try:
        config_name = (
            f"projects/{project_id}/locations/{location_id}/"
            f"insightTypes/{insight_type_id}/config"
        )

        # Retrieve the current configuration to obtain the ETag for concurrency control
        current_config = client.get_insight_type_config(name=config_name)

        insight_type_config = recommender_v1beta1.InsightTypeConfig(
            name=config_name,
            display_name="Updated Insight Configuration",
            etag=current_config.etag,
        )
        update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

        response = client.update_insight_type_config(
            insight_type_config=insight_type_config,
            update_mask=update_mask,
        )

        print(f"Updated configuration name: {response.name}")
        print(f"Updated display name: {response.display_name}")
        print(f"ETag: {response.etag}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to update insight type configuration: {error}")
# [END recommender_v1beta1_recommender_insighttypeconfig_update]
