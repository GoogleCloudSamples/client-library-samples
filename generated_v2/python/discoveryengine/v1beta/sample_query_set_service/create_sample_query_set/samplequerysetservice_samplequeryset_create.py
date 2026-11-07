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

# [START discoveryengine_v1beta_samplequerysetservice_samplequeryset_create]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.SampleQuerySetServiceClient()


def create_sample_query_set(
    project_id: str, location_id: str, sample_query_set_id: str
) -> None:
    """Use the create_sample_query_set method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'global').
        sample_query_set_id: The caller-chosen unique ID for the sample query
          set, conforming to RFC-1034 (1-63 characters, lowercase letters,
          numbers, hyphens, starting with a letter, for example,
          'default-sample-queries').
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    sample_query_set = discoveryengine_v1beta.SampleQuerySet(
        display_name="Default Sample Query Set",
        description="Evaluation query set.",
    )

    try:
        response = client.create_sample_query_set(
            parent=parent,
            sample_query_set=sample_query_set,
            sample_query_set_id=sample_query_set_id,
        )
        print(f"Created sample query set: {response.name}")
    except google.api_core.exceptions.GoogleAPIError as error:
        print(f"Failed to create sample query set: {error}")


# [END discoveryengine_v1beta_samplequerysetservice_samplequeryset_create]
