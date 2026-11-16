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

# [START metastore_v1beta_dataprocmetastore_metadataimports_list]
import google.api_core.exceptions
from google.cloud import metastore_v1beta

client = metastore_v1beta.DataprocMetastoreClient()


def list_metadata_imports(location_id: str, service_id: str, project_id: str) -> None:
    """Use the list_metadata_imports method

    Args:
        location_id: The Google Cloud region where the Dataproc Metastore service is located (for example, 'us-central1').
        service_id: The ID of the Dataproc Metastore service.
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}/services/{service_id}"

    try:
        page_result = client.list_metadata_imports(parent=parent)
        for metadata_import in page_result:
            print(f"Metadata import name: {metadata_import.name}")
            print(f"State: {metadata_import.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END metastore_v1beta_dataprocmetastore_metadataimports_list]
