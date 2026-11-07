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

# [START discoveryengine_v1alpha_rankservice_rank]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha


def rank(project_num_id: str, location_id: str) -> None:
    """Ranks records based on a query using the RankService.

    Args:
        project_num_id: ID of the ProjectNum (for example, 'example-projectnum-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
    """
    client = discoveryengine_v1alpha.RankServiceClient()

    ranking_config = (
        f"projects/{project_num_id}/locations/{location_id}/rankingConfigs/"
        "default_ranking_config"
    )
    records = [
        discoveryengine_v1alpha.RankingRecord(
            id="record_1",
            title="Introduction to Machine Learning",
            content="Machine learning is a field of study focused on algorithms that learn from data.",
        ),
        discoveryengine_v1alpha.RankingRecord(
            id="record_2",
            title="Advanced Deep Learning",
            content="Deep learning uses artificial neural networks with representation learning.",
        ),
    ]

    request = discoveryengine_v1alpha.RankRequest(
        ranking_config=ranking_config,
        query="machine learning algorithms",
        records=records,
    )

    try:
        response = client.rank(request=request)
        print(f"Rank completed successfully with {len(response.records)} records.")
        for record in response.records:
            print(f"Record ID: {record.id}, Score: {record.score}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Rank request failed: {error}")
# [END discoveryengine_v1alpha_rankservice_rank]
