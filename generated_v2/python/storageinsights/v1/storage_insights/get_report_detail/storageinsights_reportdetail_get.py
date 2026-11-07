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

# [START storageinsights_v1_storageinsights_reportdetail_get]
from google.api_core import exceptions
from google.cloud import storageinsights_v1

client = storageinsights_v1.StorageInsightsClient()


def get_report_detail(
    project_id: str,
    location_id: str,
    report_config_id: str,
    report_detail_id: str,
) -> None:
    """Retrieves details of an existing Storage Insights report.

    Args:
        project_id: The Google Cloud project ID hosting the ReportDetail.
        location_id: The Google Cloud location/region of the parent ReportConfig
          (for example, 'us-central1').
        report_config_id: The server-generated ID of the parent ReportConfig.
        report_detail_id: The server-generated ID of the ReportDetail.
    """
    name = client.report_detail_path(
        project_id, location_id, report_config_id, report_detail_id
    )

    try:
        response = client.get_report_detail(name=name)
        print(f"Report detail name: {response.name}")
        print(f"Snapshot time: {response.snapshot_time}")
        print(f"Report status: {response.status.code}")
    except exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END storageinsights_v1_storageinsights_reportdetail_get]
