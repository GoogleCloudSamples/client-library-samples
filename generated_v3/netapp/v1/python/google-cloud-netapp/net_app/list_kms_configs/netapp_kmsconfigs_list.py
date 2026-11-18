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

# [START netapp_v1_netapp_kmsconfigs_list]
import os

import google.api_core.exceptions
from google.cloud import netapp_v1


def list_kms_configs() -> None:
    """Lists KMS configurations in a Google Cloud project and location."""
    client = netapp_v1.NetAppClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    location = os.environ.get(
        "GOOGLE_CLOUD_LOCATION",
        os.environ.get("GOOGLE_CLOUD_REGION", "us-central1"),
    )
    parent = f"projects/{project_id}/locations/{location}"

    request = netapp_v1.ListKmsConfigsRequest(
        parent=parent,
    )

    try:
        page_result = client.list_kms_configs(request=request)
        count = 0
        for kms_config in page_result:
            count += 1
            print(f"KMS Config name: {kms_config.name}")
            print(f"Crypto key name: {kms_config.crypto_key_name}")
        if count == 0:
            print("No KMS configurations found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END netapp_v1_netapp_kmsconfigs_list]
