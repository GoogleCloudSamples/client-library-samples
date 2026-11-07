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

# [START discoveryengine_v1alpha_samplequerysetservice_samplequeryset_create]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1alpha

client = discoveryengine_v1alpha.SampleQuerySetServiceClient()


def create_sample_query_set(
    project_id: str, location_id: str, sample_query_set_id: str
) -> None:
    """Creates a sample query set in Google Cloud Discovery Engine.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud location ID (for example, 'global').
        sample_query_set_id: Unique resource identifier conforming to RFC-1034 (for example, 'example-sample-query-set-id').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    sample_query_set = discoveryengine_v1alpha.SampleQuerySet(
        display_name="Example Sample Query Set",
        description="A sample query set for search evaluation.",
    )

    request = discoveryengine_v1alpha.CreateSampleQuerySetRequest(
        parent=parent,
        sample_query_set=sample_query_set,
        sample_query_set_id=sample_query_set_id,
    )

    try:
        response = client.create_sample_query_set(request=request)
        print(f"Created sample query set: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Sample query set already exists: {sample_query_set_id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")


# [END discoveryengine_v1alpha_samplequerysetservice_samplequeryset_create]
