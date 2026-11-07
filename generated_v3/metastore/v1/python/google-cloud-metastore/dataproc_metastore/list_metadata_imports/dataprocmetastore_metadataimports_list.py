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

# [START metastore_v1_dataprocmetastore_metadataimports_list]
import google.api_core.exceptions
from google.cloud import metastore_v1

client = metastore_v1.DataprocMetastoreClient()


def list_metadata_imports(location_id: str, service_id: str, project_id: str) -> None:
    """Lists metadata imports for a Dataproc Metastore service.

    Args:
        location_id: The Google Cloud region where the Dataproc Metastore service is hosted (for example, 'us-central1').
        service_id: The ID of the Dataproc Metastore service whose metadata imports are being listed.
        project_id: The Google Cloud project ID.
    """
    parent = f"projects/{project_id}/locations/{location_id}/services/{service_id}"

    request = metastore_v1.ListMetadataImportsRequest(
        parent=parent,
    )

    try:
        response = client.list_metadata_imports(request=request)
        for metadata_import in response:
            print(f"Name: {metadata_import.name}")
            print(f"State: {metadata_import.state.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to list metadata imports: {exc}")
# [END metastore_v1_dataprocmetastore_metadataimports_list]
