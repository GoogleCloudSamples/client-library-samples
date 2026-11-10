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

# [START clouddeploy_v1_clouddeploy_target_create]
import google.api_core.exceptions
from google.cloud import deploy_v1


def create_target(project_id: str, target_id: str, location_id: str) -> None:
    """Creates a Cloud Deploy target for Cloud Run.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        target_id: Identifier for the target (for example, 'example-run-target').
        location_id: Google Cloud region where the target is created (for example, 'us-central1').
    """
    client = deploy_v1.CloudDeployClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    target = deploy_v1.Target(
        description="Sample Cloud Run target",
        run=deploy_v1.CloudRunLocation(
            location=f"projects/{project_id}/locations/{location_id}"
        ),
    )

    try:
        operation = client.create_target(
            parent=parent,
            target_id=target_id,
            target=target,
        )
        response = operation.result()
        print(f"Target created: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Target creation failed: {e}")
# [END clouddeploy_v1_clouddeploy_target_create]
