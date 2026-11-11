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

# [START discoveryengine_v1beta_samplequeryservice_samplequery_create]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta


def create_sample_query(
    project_id: str,
    location_id: str,
    sample_query_set_id: str,
    sample_query_id: str,
) -> None:
    """Creates a sample query in a sample query set.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the service is located (for example, 'global').
        sample_query_set_id: The ID of the sample query set (for example, 'example-samplequeryset-id').
        sample_query_id: The ID of the sample query (for example, 'example-samplequery-id').
    """
    client = discoveryengine_v1beta.SampleQueryServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"sampleQuerySets/{sample_query_set_id}"
    )
    sample_query = discoveryengine_v1beta.SampleQuery(
        query_entry=discoveryengine_v1beta.SampleQuery.QueryEntry(
            query="example query"
        )
    )

    try:
        response = client.create_sample_query(
            parent=parent,
            sample_query=sample_query,
            sample_query_id=sample_query_id,
        )
        print(f"Created sample query: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END discoveryengine_v1beta_samplequeryservice_samplequery_create]
