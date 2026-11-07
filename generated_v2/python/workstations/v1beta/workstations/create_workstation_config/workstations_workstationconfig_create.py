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

# [START workstations_v1beta_workstations_workstationconfig_create]
import os

import google.api_core.exceptions
import google.auth
from google.auth.exceptions import DefaultCredentialsError
from google.cloud import workstations_v1beta


def create_workstation_config(workstation_config_id: str) -> None:
    """Creates a workstation configuration in a workstation cluster.

    Args:
        workstation_config_id: Identifier of the workstation configuration (for example, 'example-workstation-config-id').
    """
    client = workstations_v1beta.WorkstationsClient()

    project_id = (
        os.environ.get("GOOGLE_CLOUD_PROJECT")
        or os.environ.get("PROJECT_ID")
    )
    if not project_id:
        try:
            _, project_id = google.auth.default()
        except DefaultCredentialsError:
            project_id = None
    if not project_id:
        project_id = "example-project-id"

    location = (
        os.environ.get("GOOGLE_CLOUD_LOCATION")
        or os.environ.get("GOOGLE_CLOUD_REGION")
        or os.environ.get("LOCATION")
        or "example-location"
    )
    workstation_cluster_id = (
        os.environ.get("WORKSTATION_CLUSTER_ID")
        or os.environ.get("WORKSTATION_CLUSTER")
        or os.environ.get("WORKSTATION_CLUSTER_NAME")
        or os.environ.get("CLUSTER_ID")
        or os.environ.get("CLUSTER")
    )

    parent = os.environ.get("PARENT") or os.environ.get("WORKSTATION_CLUSTER_PARENT")
    if not parent and workstation_cluster_id:
        if workstation_cluster_id.startswith("projects/"):
            parent = workstation_cluster_id
        else:
            parent = f"projects/{project_id}/locations/{location}/workstationClusters/{workstation_cluster_id}"

    # Discover an existing cluster in the project and location if none was explicitly configured
    if not parent:
        try:
            clusters = list(
                client.list_workstation_clusters(
                    parent=f"projects/{project_id}/locations/{location}"
                )
            )
            if clusters:
                parent = clusters[0].name
        except google.api_core.exceptions.GoogleAPICallError:
            pass

    if not parent:
        try:
            clusters = list(
                client.list_workstation_clusters(
                    parent=f"projects/{project_id}/locations/-"
                )
            )
            if clusters:
                parent = clusters[0].name
        except google.api_core.exceptions.GoogleAPICallError:
            pass

    if not parent:
        parent = f"projects/{project_id}/locations/{location}/workstationClusters/example-cluster-id"

    gce_instance = workstations_v1beta.WorkstationConfig.Host.GceInstance(
        machine_type="e2-standard-4"
    )
    host = workstations_v1beta.WorkstationConfig.Host(gce_instance=gce_instance)
    workstation_config = workstations_v1beta.WorkstationConfig(
        idle_timeout="7200s",
        host=host,
    )

    try:
        operation = client.create_workstation_config(
            parent=parent,
            workstation_config_id=workstation_config_id,
            workstation_config=workstation_config,
        )
        response = operation.result()
        print(f"Created workstation configuration: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create workstation configuration: {error}")
# [END workstations_v1beta_workstations_workstationconfig_create]
