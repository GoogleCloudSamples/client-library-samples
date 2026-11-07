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

# [START recommender_v1beta1_recommender_insighttypeconfig_get]
import google.api_core.exceptions
from google.cloud import recommender_v1beta1

client = recommender_v1beta1.RecommenderClient()


def get_insight_type_config(insight_type_id: str, location_id: str, project_id: str) -> None:
    """Use the get_insight_type_config method

    Args:
        insight_type_id: The ID of the InsightType (for example, 'google.compute.firewall.Insight').
        location_id: The GCP location ID (for example, 'global').
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/insightTypes/{insight_type_id}/config"

    try:
        response = client.get_insight_type_config(name=name)
        print(f"Insight type config name: {response.name}")
        print(f"Revision ID: {response.revision_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve insight type configuration: {error}")
# [END recommender_v1beta1_recommender_insighttypeconfig_get]
