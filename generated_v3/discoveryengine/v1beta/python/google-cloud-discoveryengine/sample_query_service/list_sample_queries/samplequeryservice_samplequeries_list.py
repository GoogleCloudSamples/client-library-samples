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

# [START discoveryengine_v1beta_samplequeryservice_samplequeries_list]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.SampleQueryServiceClient()


def list_sample_queries(
    project_id: str, location_id: str, sample_query_set_id: str
) -> None:
    """Use the list_sample_queries method to retrieve sample queries in a set.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        sample_query_set_id: ID of the SampleQuerySet (for example, 'example-samplequeryset-id')
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"sampleQuerySets/{sample_query_set_id}"
    )

    request = discoveryengine_v1beta.ListSampleQueriesRequest(
        parent=parent,
    )

    try:
        response = client.list_sample_queries(request=request)
        for sample_query in response:
            print(f"Sample query: {sample_query.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END discoveryengine_v1beta_samplequeryservice_samplequeries_list]
