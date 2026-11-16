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

# [START metastore_v1beta_dataprocmetastore_service_get]
import google.api_core.exceptions
from google.cloud import metastore_v1beta

client = metastore_v1beta.DataprocMetastoreClient()


def get_service(location_id: str, service_id: str, project_id: str) -> None:
    """Retrieves metadata for an existing Dataproc Metastore service.

    Args:
        location_id: The Google Cloud region where the metastore service is located (for example, 'us-central1').
        service_id: The ID of the Dataproc Metastore service (for example, 'example-service').
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/services/{service_id}"
    request = metastore_v1beta.GetServiceRequest(name=name)

    try:
        response = client.get_service(request=request)
        print(f"Service retrieved: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Endpoint URI: {response.endpoint_uri}")
    except google.api_core.exceptions.NotFound:
        print(f"Service not found: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END metastore_v1beta_dataprocmetastore_service_get]
