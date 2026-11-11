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

# [START datamigration_v1_datamigrationservice_conversionworkspace_create]
from google.api_core import exceptions
from google.cloud import clouddms_v1


def create_conversion_workspace(
    conversion_workspace_id: str, project_id: str, location_id: str
) -> None:
    """Creates a Database Migration Service conversion workspace.

    Args:
        conversion_workspace_id: Caller-chosen identifier for the conversion workspace.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID.
    """
    client = clouddms_v1.DataMigrationServiceClient()

    parent = f"projects/{project_id}/locations/{location_id}"
    conversion_workspace = clouddms_v1.ConversionWorkspace(
        display_name="Example Conversion Workspace",
        source=clouddms_v1.DatabaseEngineInfo(
            engine=clouddms_v1.DatabaseEngine.ORACLE,
            version="12.c.1",
        ),
        destination=clouddms_v1.DatabaseEngineInfo(
            engine=clouddms_v1.DatabaseEngine.POSTGRESQL,
            version="14",
        ),
    )

    try:
        operation = client.create_conversion_workspace(
            parent=parent,
            conversion_workspace_id=conversion_workspace_id,
            conversion_workspace=conversion_workspace,
        )
        response = operation.result()
        print(f"Created conversion workspace: {response.name}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to create conversion workspace: {error}")


# [END datamigration_v1_datamigrationservice_conversionworkspace_create]
