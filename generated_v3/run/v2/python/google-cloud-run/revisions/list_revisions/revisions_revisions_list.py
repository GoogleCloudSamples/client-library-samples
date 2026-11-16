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

# [START run_v2_revisions_revisions_list]
import google.api_core.exceptions
from google.cloud import run_v2

client = run_v2.RevisionsClient()


def list_revisions(project_id: str, location_id: str, service_id: str) -> None:
    """List Cloud Run revisions for a specific service.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        service_id: ID of the Service (for example, 'example-service-id')
    """
    parent = f"projects/{project_id}/locations/{location_id}/services/{service_id}"

    request = run_v2.ListRevisionsRequest(parent=parent)

    try:
        response = client.list_revisions(request=request)
        for revision in response:
            print(f"Revision name: {revision.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list revisions: {e}")


# [END run_v2_revisions_revisions_list]
