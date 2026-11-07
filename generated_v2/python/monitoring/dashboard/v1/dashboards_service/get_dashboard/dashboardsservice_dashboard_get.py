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

# [START monitoring_v1_dashboardsservice_dashboard_get]
import google.api_core.exceptions
from google.cloud import monitoring_dashboard_v1


def get_dashboard(dashboard_id: str, project_id: str) -> None:
    """Retrieves a Cloud Monitoring dashboard.

    Args:
        dashboard_id: The server-generated ID of the dashboard.
        project_id: The ID of the Google Cloud project.
    """
    client = monitoring_dashboard_v1.DashboardsServiceClient()

    name = f"projects/{project_id}/dashboards/{dashboard_id}"

    request = monitoring_dashboard_v1.GetDashboardRequest(
        name=name,
    )

    try:
        response = client.get_dashboard(request=request)
        print(f"Retrieved dashboard: {response.display_name}")
        print(f"Dashboard resource name: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve dashboard: {error}")
# [END monitoring_v1_dashboardsservice_dashboard_get]
