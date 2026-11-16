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

# [START migrationcenter_v1_migrationcenter_report_get]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def get_report(
    project_id: str,
    location_id: str,
    report_config_id: str,
    report_id: str,
) -> None:
    """Retrieves details of a Migration Center report.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud location or region ID (for example, 'us-central1').
        report_config_id: The identifier of the parent report configuration.
        report_id: The identifier of the report to retrieve.
    """
    name = f"projects/{project_id}/locations/{location_id}/reportConfigs/{report_config_id}/reports/{report_id}"
    request = migrationcenter_v1.GetReportRequest(name=name)

    try:
        response = client.get_report(request=request)
        print(f"Retrieved report: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve report: {error}")
# [END migrationcenter_v1_migrationcenter_report_get]
