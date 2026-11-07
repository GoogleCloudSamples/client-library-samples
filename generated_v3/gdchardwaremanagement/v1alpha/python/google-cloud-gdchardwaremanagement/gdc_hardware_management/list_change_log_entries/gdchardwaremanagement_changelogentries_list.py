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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_changelogentries_list]
from google.api_core import exceptions
from google.cloud import gdchardwaremanagement_v1alpha


def list_change_log_entries(project_id: str, location_id: str, order_id: str) -> None:
    """Lists change log entries for a Google Distributed Cloud hardware order.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        order_id: ID of the Order (for example, 'example-order-id').
    """
    client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()

    parent = f"projects/{project_id}/locations/{location_id}/orders/{order_id}"

    request = gdchardwaremanagement_v1alpha.ListChangeLogEntriesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_change_log_entries(request=request)
        count = 0
        for entry in page_result:
            print(f"Change log entry: {entry.name}")
            count += 1

        if count == 0:
            print("No change log entries found.")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list change log entries: {error}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_changelogentries_list]
