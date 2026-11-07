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

# [START storagetransfer_v1_storagetransferservice_googleserviceaccount_get]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import storage_transfer_v1


def get_google_service_account(project_id: str) -> None:
    """Retrieves the Google-managed service account for Storage Transfer Service.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
    """
    client_options = ClientOptions(quota_project_id=project_id)
    client = storage_transfer_v1.StorageTransferServiceClient(
        client_options=client_options
    )
    request = storage_transfer_v1.GetGoogleServiceAccountRequest(
        project_id=project_id,
    )

    try:
        response = client.get_google_service_account(request=request)
        print(f"Service account email: {response.account_email}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to get Google service account: {exc}")
# [END storagetransfer_v1_storagetransferservice_googleserviceaccount_get]
