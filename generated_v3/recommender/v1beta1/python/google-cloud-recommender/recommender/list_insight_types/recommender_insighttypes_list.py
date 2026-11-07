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

# [START recommender_v1beta1_recommender_insighttypes_list]
import google.api_core.exceptions
from google.cloud import recommender_v1beta1

client = recommender_v1beta1.RecommenderClient()


def list_insight_types() -> None:
    """Lists available insight types in Cloud Recommender."""
    request = recommender_v1beta1.ListInsightTypesRequest(
        page_size=50,
    )

    try:
        response = client.list_insight_types(request=request)
        for insight_type in response:
            print(f"Insight type: {insight_type.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list insight types: {error}")


# [END recommender_v1beta1_recommender_insighttypes_list]
