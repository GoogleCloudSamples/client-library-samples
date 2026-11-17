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

# [START monitoring_v1_dashboardsservice_dashboards_list]
from google.api_core import exceptions
from google.cloud import monitoring_dashboard_v1


def list_dashboards(project_id: str) -> None:
    """Lists dashboards for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_dashboard_v1.DashboardsServiceClient()

    parent = f"projects/{project_id}"
    request = monitoring_dashboard_v1.ListDashboardsRequest(parent=parent)

    try:
        dashboards = client.list_dashboards(request=request)
        for dashboard in dashboards:
            print(f"Name: {dashboard.name}")
            print(f"Display Name: {dashboard.display_name}")
    except exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END monitoring_v1_dashboardsservice_dashboards_list]
