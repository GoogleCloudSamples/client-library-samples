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

# [START workloadmanager_v1_workloadmanager_evaluations_list]
import os

import google.api_core.exceptions
import google.auth
import google.auth.exceptions
from google.cloud import workloadmanager_v1


def list_evaluations() -> None:
    """Lists evaluations in a location."""
    client = workloadmanager_v1.WorkloadManagerClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
    if not project_id:
        try:
            _, project_id = google.auth.default()
        except google.auth.exceptions.DefaultCredentialsError:
            project_id = "example-project-id"
    if not project_id:
        project_id = "example-project-id"

    location = os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")
    parent = f"projects/{project_id}/locations/{location}"

    request = workloadmanager_v1.ListEvaluationsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_evaluations(request=request)
        for evaluation in page_result:
            print(f"Evaluation name: {evaluation.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END workloadmanager_v1_workloadmanager_evaluations_list]
