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

# [START discoveryengine_v1beta_rankservice_rank]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.RankServiceClient()


def rank(project_num_id: str, location_id: str) -> None:
    """Ranks records based on a query.

    Args:
        project_num_id: ID of the project number (for example,
          'example-project-number').
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    ranking_config = client.ranking_config_path(
        project=project_num_id,
        location=location_id,
        ranking_config="default_ranking_config",
    )
    records = [
        discoveryengine_v1beta.RankingRecord(
            id="1",
            title="Tennis Rackets",
            content="Search for tennis rackets and equipment.",
        ),
        discoveryengine_v1beta.RankingRecord(
            id="2",
            title="Tennis Balls",
            content="Search for tennis balls and accessories.",
        ),
    ]

    request = discoveryengine_v1beta.RankRequest(
        ranking_config=ranking_config,
        query="tennis rackets",
        records=records,
    )

    try:
        response = client.rank(request=request)
        for record in response.records:
            print(f"Record ID: {record.id}, Score: {record.score}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Rank request failed: {e}")
# [END discoveryengine_v1beta_rankservice_rank]
