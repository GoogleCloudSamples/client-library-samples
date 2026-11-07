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

# [START recommender_v1beta1_recommender_recommenders_list]
import google.api_core.exceptions
from google.cloud import recommender_v1beta1

client = recommender_v1beta1.RecommenderClient()


def list_recommenders() -> None:
    """List available Cloud Recommender types."""
    request = recommender_v1beta1.ListRecommendersRequest()

    try:
        page_result = client.list_recommenders(request=request)
        for recommender in page_result:
            print(f"Recommender name: {recommender.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list recommenders: {error}")
# [END recommender_v1beta1_recommender_recommenders_list]
