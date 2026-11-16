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

# [START metastore_v1alpha_dataprocmetastore_service_get]
import google.api_core.exceptions
from google.cloud import metastore_v1alpha

client = metastore_v1alpha.DataprocMetastoreClient()


def get_service(location_id: str, service_id: str, project_id: str) -> None:
    """Use the get_service method

    Args:
        location_id: The Google Cloud region where the service is located (for
          example, 'us-central1')
        service_id: ID of the Service (for example, 'example-service-id')
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/services/{service_id}"

    try:
        request = metastore_v1alpha.GetServiceRequest(name=name)
        response = client.get_service(request=request)

        print(f"Retrieved service: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Endpoint URI: {response.endpoint_uri}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END metastore_v1alpha_dataprocmetastore_service_get]
