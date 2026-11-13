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

# [START migrationcenter_v1_migrationcenter_reportconfig_delete]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def delete_report_config(
    project_id: str, location_id: str, report_config_id: str
) -> None:
    """Use the delete_report_config method

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region ID (for example, 'us-central1').
        report_config_id: The ID of the report configuration to delete.
    """
    name = (
        f"projects/{project_id}/locations/{location_id}"
        f"/reportConfigs/{report_config_id}"
    )

    request = migrationcenter_v1.DeleteReportConfigRequest(
        name=name,
    )

    try:
        operation = client.delete_report_config(request=request)
        operation.result()
        print(f"Deleted report config: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete report configuration: {error}")


# [END migrationcenter_v1_migrationcenter_reportconfig_delete]
