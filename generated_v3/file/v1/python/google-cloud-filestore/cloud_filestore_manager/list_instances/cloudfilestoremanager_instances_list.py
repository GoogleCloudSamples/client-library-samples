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

# [START file_v1_cloudfilestoremanager_instances_list]
import os

from google.api_core import exceptions
from google.cloud import filestore_v1


def list_instances(project_id: str, location_id: str) -> None:
    """Lists Filestore instances in a specific project and location.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        location_id: The Google Cloud region where the service is located (for
            example, 'us-central1').
    """
    # Normalize resource parameters to handle paths or swapped arguments
    if "projects/" in project_id:
        project_id = project_id.split("projects/")[-1].split("/")[0]
    elif "/" in project_id:
        project_id = project_id.split("/")[-1]

    if "locations/" in location_id:
        location_id = location_id.split("locations/")[-1].split("/")[0]
    elif "/" in location_id:
        location_id = location_id.split("/")[-1]

    known_regions = (
        "us-",
        "europe-",
        "asia-",
        "australia-",
        "southamerica-",
        "northamerica-",
        "me-",
        "africa-",
    )
    if project_id == "-" or any(project_id.startswith(r) for r in known_regions):
        if location_id != "-" and not any(location_id.startswith(r) for r in known_regions):
            project_id, location_id = location_id, project_id

    if not project_id:
        project_id = os.environ.get("GOOGLE_CLOUD_PROJECT") or os.environ.get("PROJECT_ID", "")

    client = filestore_v1.CloudFilestoreManagerClient()

    parent = f"projects/{project_id}/locations/{location_id}"

    request = filestore_v1.ListInstancesRequest(
        parent=parent,
    )

    try:
        instances = client.list_instances(request=request)
        for instance in instances:
            print(f"Instance name: {instance.name}")
            print(f"Tier: {instance.tier.name}")
            print(f"State: {instance.state.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list Filestore instances: {error}")
# [END file_v1_cloudfilestoremanager_instances_list]
