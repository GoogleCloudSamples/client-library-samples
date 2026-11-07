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

# [START discoveryengine_v1beta_samplequerysetservice_samplequeryset_get]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.SampleQuerySetServiceClient()


def get_sample_query_set(
    project_id: str, location_id: str, sample_query_set_id: str
) -> None:
    """Retrieves a sample query set resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location where the service is located (for example, 'global' or 'us-central1').
        sample_query_set_id: The identifier of the SampleQuerySet (for example, 'example-sample-query-set'). Must conform to RFC-1034 standard with a length limit of 63 characters.
    """
    name = f"projects/{project_id}/locations/{location_id}/sampleQuerySets/{sample_query_set_id}"

    request = discoveryengine_v1beta.GetSampleQuerySetRequest(
        name=name,
    )

    try:
        response = client.get_sample_query_set(request=request)
        print(f"Sample query set name: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Request failed: {error.message}")
# [END discoveryengine_v1beta_samplequerysetservice_samplequeryset_get]
