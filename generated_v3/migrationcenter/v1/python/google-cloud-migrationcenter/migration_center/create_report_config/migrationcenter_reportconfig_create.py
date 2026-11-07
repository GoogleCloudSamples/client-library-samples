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

# [START migrationcenter_v1_migrationcenter_reportconfig_create]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def create_report_config(
    report_config_id: str,
    project_id: str,
    location_id: str,
    group_id: str,
    preference_set_id: str,
) -> None:
    """Use the create_report_config method

    Args:
        report_config_id: Caller-specified ID for the report configuration (for example, 'sample-report-config'). Must match regex [a-z]([a-z0-9-]{0,61}[a-z0-9])?.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location ID (for example, 'us-central1').
        group_id: The ID of an existing Group to associate with the report configuration.
        preference_set_id: The ID of an existing PreferenceSet to associate with the report configuration.
    """
    parent = f"projects/{project_id}/locations/{location_id}"
    report_config = migrationcenter_v1.ReportConfig(
        display_name="Sample Report Config",
        description="Report configuration created for migration assessment",
        group_preferenceset_assignments=[
            migrationcenter_v1.ReportConfig.GroupPreferenceSetAssignment(
                group=f"{parent}/groups/{group_id}",
                preference_set=f"{parent}/preferenceSets/{preference_set_id}",
            )
        ],
    )

    try:
        operation = client.create_report_config(
            parent=parent,
            report_config_id=report_config_id,
            report_config=report_config,
        )
        response = operation.result()
        print(f"Created report config: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create report config: {e}")
# [END migrationcenter_v1_migrationcenter_reportconfig_create]
