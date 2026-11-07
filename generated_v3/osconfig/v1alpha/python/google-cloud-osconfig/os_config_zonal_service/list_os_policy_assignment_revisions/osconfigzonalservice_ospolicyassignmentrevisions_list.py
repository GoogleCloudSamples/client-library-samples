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

# [START osconfig_v1alpha_osconfigzonalservice_ospolicyassignmentrevisions_list]
import os

from google.api_core import exceptions
from google.cloud import osconfig_v1alpha


def list_os_policy_assignment_revisions() -> None:
    """Lists revisions for an OS policy assignment."""
    client = osconfig_v1alpha.OsConfigZonalServiceClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1-a")
    os_policy_assignment_id = os.environ.get(
        "OS_POLICY_ASSIGNMENT_ID", "example-assignment-id"
    )

    name = os.environ.get(
        "OS_POLICY_ASSIGNMENT_NAME",
        f"projects/{project_id}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}",
    )

    request = osconfig_v1alpha.ListOSPolicyAssignmentRevisionsRequest(
        name=name,
    )

    try:
        response = client.list_os_policy_assignment_revisions(request=request)
        count = 0
        for revision in response:
            print(f"Revision ID: {revision.revision_id}")
            print(f"Revision create time: {revision.revision_create_time}")
            count += 1

        if count == 0:
            print(f"No revisions found for {name}.")
    except exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END osconfig_v1alpha_osconfigzonalservice_ospolicyassignmentrevisions_list]
