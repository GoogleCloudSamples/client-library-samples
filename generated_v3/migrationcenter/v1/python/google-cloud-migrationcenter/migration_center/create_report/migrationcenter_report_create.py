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

# [START migrationcenter_v1_migrationcenter_report_create]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def create_report(
    report_id: str,
    project_id: str,
    location_id: str,
    report_config_id: str,
) -> None:
    """Creates a report under a report configuration.

    Args:
        report_id: The caller-specified ID for the report.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
        report_config_id: The ID of the parent ReportConfig resource.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/"
        f"reportConfigs/{report_config_id}"
    )
    report = migrationcenter_v1.Report(
        display_name="Example TCO Report",
        description="Total cost of ownership report",
        type_=migrationcenter_v1.Report.Type.TOTAL_COST_OF_OWNERSHIP,
    )

    try:
        # CreateReport initiates a long-running operation.
        operation = client.create_report(
            parent=parent,
            report_id=report_id,
            report=report,
        )
        response = operation.result()
        print(f"Created report: {response.name}")
        print(f"State: {response.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create report: {error}")


# [END migrationcenter_v1_migrationcenter_report_create]
