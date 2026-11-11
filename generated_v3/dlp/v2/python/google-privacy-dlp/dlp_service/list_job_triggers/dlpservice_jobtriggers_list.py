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

# [START dlp_list_job_triggers]
import google.api_core.exceptions
from google.cloud import dlp_v2


def list_job_triggers(project_id: str) -> None:
    """Lists job triggers in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    # Set the quota project to ensure service usage and quota evaluate against the target project.
    client = dlp_v2.DlpServiceClient(
        client_options={"quota_project_id": project_id}
    )
    parent = f"projects/{project_id}"

    request = dlp_v2.ListJobTriggersRequest(
        parent=parent,
    )

    try:
        response = client.list_job_triggers(request=request)
        found = False
        for trigger in response:
            found = True
            print(f"Trigger Name: {trigger.name}")
            print(f"Display Name: {trigger.display_name}")
            print(f"Status: {trigger.status}")
        if not found:
            print("No job triggers found.")
    except google.api_core.exceptions.PermissionDenied as e:
        print(f"Permission denied: {e}")
    except google.api_core.exceptions.NotFound as e:
        print(f"Resource not found: {e}")
# [END dlp_list_job_triggers]
