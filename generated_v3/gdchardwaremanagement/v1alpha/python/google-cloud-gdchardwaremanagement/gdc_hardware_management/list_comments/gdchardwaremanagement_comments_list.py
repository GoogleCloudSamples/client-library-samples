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

# [START gdchardwaremanagement_v1alpha_gdchardwaremanagement_comments_list]
import google.api_core.exceptions
from google.cloud import gdchardwaremanagement_v1alpha

client = gdchardwaremanagement_v1alpha.GDCHardwareManagementClient()


def list_comments(project_id: str, location_id: str, order_id: str) -> None:
    """Lists comments associated with a specific hardware order.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        order_id: The resource ID of the order to list comments on (for example, 'example-order-id').
    """
    parent = f"projects/{project_id}/locations/{location_id}/orders/{order_id}"

    request = gdchardwaremanagement_v1alpha.ListCommentsRequest(
        parent=parent,
    )

    try:
        response = client.list_comments(request=request)
        for comment in response:
            print(f"Comment Name: {comment.name}")
            print(f"Author: {comment.author}")
            print(f"Text: {comment.text}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Error listing comments: {exc}")
# [END gdchardwaremanagement_v1alpha_gdchardwaremanagement_comments_list]
