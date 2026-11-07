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

# [START discoveryengine_v1beta_samplequeryservice_samplequery_delete]
import google.api_core.exceptions
from google.cloud import discoveryengine_v1beta

client = discoveryengine_v1beta.SampleQueryServiceClient()


def delete_sample_query(
    project_id: str,
    location_id: str,
    sample_query_set_id: str,
    sample_query_id: str,
) -> None:
    """Deletes a sample query from a sample query set.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location for the resource, such as 'global' or a supported region.
        sample_query_set_id: The ID of the parent SampleQuerySet.
        sample_query_id: The ID of the SampleQuery to delete.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"sampleQuerySets/{sample_query_set_id}/sampleQueries/{sample_query_id}"
    )

    request = discoveryengine_v1beta.DeleteSampleQueryRequest(name=name)

    try:
        client.delete_sample_query(request=request)
        print(f"Deleted sample query: {name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Request failed: {exc}")
# [END discoveryengine_v1beta_samplequeryservice_samplequery_delete]
