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

# [START cloudbilling_v1_cloudbilling_projectbillinginfo_get]
from google.api_core import exceptions
from google.cloud import billing_v1


def get_project_billing_info(project_id: str) -> None:
    """Retrieve billing information for a Google Cloud project.

    Args:
        project_id: The ID of the Google Cloud project for which billing
          information is retrieved.
    """
    client = billing_v1.CloudBillingClient()
    name = f"projects/{project_id}"

    try:
        request = billing_v1.GetProjectBillingInfoRequest(name=name)
        response = client.get_project_billing_info(request=request)

        print(f"Project ID: {response.project_id}")
        print(f"Billing account name: {response.billing_account_name}")
        print(f"Billing enabled: {response.billing_enabled}")
    except exceptions.GoogleAPICallError as e:
        print(f"Error retrieving project billing info: {e}")
# [END cloudbilling_v1_cloudbilling_projectbillinginfo_get]
