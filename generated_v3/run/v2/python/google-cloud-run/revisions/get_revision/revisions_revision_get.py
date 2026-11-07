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

# [START run_v2_revisions_revision_get]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.RevisionsClient()


def get_revision(project_id: str, location_id: str, service_id: str, revision_id: str) -> None:
    """Use the get_revision method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        service_id: ID of the Service (for example, 'example-service-id')
        revision_id: ID of the Revision (for example, 'example-service-00001-abc'). Revisions are server-generated or suffix-specified immutable snapshots created upon Service deployment.
    """
    name = f"projects/{project_id}/locations/{location_id}/services/{service_id}/revisions/{revision_id}"

    request = run_v2.GetRevisionRequest(name=name)

    try:
        response = client.get_revision(request=request)
        print(f"Retrieved revision: {response.name}")
        print(f"Creation time: {response.create_time}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END run_v2_revisions_revision_get]
