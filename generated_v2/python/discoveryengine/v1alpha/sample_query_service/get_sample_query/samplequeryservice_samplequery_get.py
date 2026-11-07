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

# [START discoveryengine_v1alpha_samplequeryservice_samplequery_get]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha

client = discoveryengine_v1alpha.SampleQueryServiceClient()


def get_sample_query(
    project_id: str,
    location_id: str,
    sample_query_set_id: str,
    sample_query_id: str,
) -> None:
    """Gets a SampleQuery resource.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        location_id: The Google Cloud region where the service is located (for
          example, 'global').
        sample_query_set_id: ID of the SampleQuerySet (for example,
          'example-samplequeryset-id').
        sample_query_id: ID of the SampleQuery (for example,
          'example-samplequery-id').
    """
    name = client.sample_query_path(
        project_id,
        location_id,
        sample_query_set_id,
        sample_query_id,
    )

    request = discoveryengine_v1alpha.GetSampleQueryRequest(
        name=name,
    )

    try:
        response = client.get_sample_query(request=request)
        print(f"Sample query retrieved: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")


# [END discoveryengine_v1alpha_samplequeryservice_samplequery_get]
