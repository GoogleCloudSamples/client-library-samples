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

# [START monitoring_v1_dashboardsservice_dashboard_create]
import google.api_core.exceptions
from google.cloud import monitoring_dashboard_v1


def create_dashboard(project_id: str) -> None:
    """Creates a custom dashboard in Cloud Monitoring.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = monitoring_dashboard_v1.DashboardsServiceClient()

    parent = f"projects/{project_id}"
    dashboard = monitoring_dashboard_v1.Dashboard(
        display_name="Support Overview Dashboard",
        grid_layout=monitoring_dashboard_v1.GridLayout(),
    )

    try:
        response = client.create_dashboard(parent=parent, dashboard=dashboard)
        print(f"Created dashboard: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create dashboard: {error}")
# [END monitoring_v1_dashboardsservice_dashboard_create]
