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

# [START monitoring_v1_dashboardsservice_dashboard_update]
import google.api_core.exceptions
from google.cloud import monitoring_dashboard_v1


def update_dashboard(project_id: str, dashboard_id: str) -> None:
    """Updates an existing Cloud Monitoring dashboard.

    Args:
        project_id: The Google Cloud project ID.
        dashboard_id: The identifier of the dashboard to update.
    """
    client = monitoring_dashboard_v1.DashboardsServiceClient()
    dashboard_name = f"projects/{project_id}/dashboards/{dashboard_id}"

    try:
        # DashboardsService.UpdateDashboard replaces the entire resource.
        # Fetch the existing dashboard to retain the layout and etag.
        dashboard = client.get_dashboard(name=dashboard_name)
        dashboard.display_name = "Updated Operational Dashboard"

        request = monitoring_dashboard_v1.UpdateDashboardRequest(dashboard=dashboard)
        response = client.update_dashboard(request=request)
        print(f"Updated dashboard: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to update dashboard: {exc}")
# [END monitoring_v1_dashboardsservice_dashboard_update]
