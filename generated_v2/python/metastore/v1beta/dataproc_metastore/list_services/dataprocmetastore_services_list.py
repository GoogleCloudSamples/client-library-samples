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

# [START metastore_v1beta_dataprocmetastore_services_list]
import os

import google.api_core.exceptions
from google.cloud import metastore_v1beta


def list_services(location_id: str) -> None:
    """Lists Dataproc Metastore services in a specific location.

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1').
    """
    project_number = os.getenv("GOOGLE_CLOUD_PROJECT", "example-project-number")
    parent = f"projects/{project_number}/locations/{location_id}"

    client = metastore_v1beta.DataprocMetastoreClient()

    request = metastore_v1beta.ListServicesRequest(
        parent=parent,
    )

    try:
        page_result = client.list_services(request=request)
        count = 0
        for service in page_result:
            count += 1
            print(f"Service name: {service.name}")
            print(f"Service state: {service.state.name}")
        print(f"Total services listed: {count}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list services: {e.message}")
# [END metastore_v1beta_dataprocmetastore_services_list]
