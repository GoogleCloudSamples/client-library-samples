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

# [START eventarc_v1_eventarc_enrollments_list]
import os

import google.api_core.exceptions
from google.cloud import eventarc_v1


def list_enrollments() -> None:
    """List Eventarc enrollments in a location."""
    client = eventarc_v1.EventarcClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project")
    location = os.environ.get("GOOGLE_CLOUD_REGION", "us-central1")
    parent = f"projects/{project_id}/locations/{location}"

    request = eventarc_v1.ListEnrollmentsRequest(
        parent=parent,
    )

    try:
        response = client.list_enrollments(request=request)
        count = 0
        for enrollment in response:
            print(f"Enrollment: {enrollment.name}")
            count += 1
        if count == 0:
            print(f"No enrollments found in {parent}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list enrollments: {e}")
# [END eventarc_v1_eventarc_enrollments_list]
