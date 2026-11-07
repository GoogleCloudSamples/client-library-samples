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

# [START discoveryengine_v1alpha_samplequeryservice_samplequery_create]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha


def create_sample_query(
    project_id: str,
    location_id: str,
    sample_query_set_id: str,
    sample_query_id: str,
) -> None:
    """Creates a sample query in a sample query set.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location (for example, 'global').
        sample_query_set_id: ID of the sample query set (for example, 'example-sample-query-set-id').
        sample_query_id: ID of the sample query (for example, 'example-sample-query-id').
    """
    client_options = (
        ClientOptions(api_endpoint=f"{location_id}-discoveryengine.googleapis.com")
        if location_id != "global"
        else None
    )
    client = discoveryengine_v1alpha.SampleQueryServiceClient(
        client_options=client_options
    )

    parent = (
        f"projects/{project_id}/locations/{location_id}"
        f"/sampleQuerySets/{sample_query_set_id}"
    )
    sample_query = discoveryengine_v1alpha.SampleQuery(
        query_entry=discoveryengine_v1alpha.SampleQuery.QueryEntry(
            query="example query text"
        )
    )

    try:
        response = client.create_sample_query(
            parent=parent,
            sample_query=sample_query,
            sample_query_id=sample_query_id,
        )
        print(f"Created sample query: {response.name}")
    except google.api_core.exceptions.GoogleAPIError as exc:
        print(f"Request failed with error: {exc}")
# [END discoveryengine_v1alpha_samplequeryservice_samplequery_create]
