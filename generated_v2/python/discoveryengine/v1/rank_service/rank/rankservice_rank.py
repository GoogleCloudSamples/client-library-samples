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

# [START discoveryengine_v1_rankservice_rank]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1

client = discoveryengine_v1.RankServiceClient()


def rank(project_id: str, location_id: str) -> None:
    """Ranks a set of records against a search query using Discovery Engine.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location where the ranking config resides (typically 'global').
    """
    ranking_config = (
        f"projects/{project_id}/locations/{location_id}/rankingConfigs/default_ranking_config"
    )
    records = [
        discoveryengine_v1.RankingRecord(
            id="record-1",
            title="Google Cloud Overview",
            content="Google Cloud offers infrastructure, analytics, and machine learning services.",
        ),
        discoveryengine_v1.RankingRecord(
            id="record-2",
            title="Meteorological Forecasting",
            content="Atmospheric models project temperature, precipitation, and storm trajectories.",
        ),
    ]
    query = "What is Google Cloud?"

    request = discoveryengine_v1.RankRequest(
        ranking_config=ranking_config,
        records=records,
        query=query,
    )

    try:
        response = client.rank(request=request)
        for record in response.records:
            print(f"Record ID: {record.id}, Score: {record.score}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Rank request failed: {err}")
# [END discoveryengine_v1_rankservice_rank]
