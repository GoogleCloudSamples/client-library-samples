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

# [START datamigration_v1_datamigrationservice_mappingrules_list]
from google.api_core import exceptions
from google.cloud import clouddms_v1


def list_mapping_rules(
    project_id: str, location_id: str, conversion_workspace_id: str
) -> None:
    """Lists mapping rules for a conversion workspace.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for
            example, 'us-central1').
        conversion_workspace_id: The conversion workspace identifier (for
            example, 'example-conversion-workspace-id').
    """
    client = clouddms_v1.DataMigrationServiceClient()

    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"conversionWorkspaces/{conversion_workspace_id}"
    )

    try:
        response = client.list_mapping_rules(parent=parent)
        rule_count = 0
        for mapping_rule in response:
            print(f"Rule name: {mapping_rule.name}")
            print(f"Display name: {mapping_rule.display_name}")
            rule_count += 1
        if rule_count == 0:
            print("No mapping rules found.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list mapping rules: {error}")
# [END datamigration_v1_datamigrationservice_mappingrules_list]
