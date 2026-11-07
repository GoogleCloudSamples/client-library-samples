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

# [START metastore_v1beta_dataprocmetastore_metadataimport_get]
import google.api_core.exceptions
from google.cloud import metastore_v1beta

client = metastore_v1beta.DataprocMetastoreClient()


def get_metadata_import(
    location_id: str, service_id: str, metadata_import_id: str, project_id: str
) -> None:
    """Use the get_metadata_import method.

    Args:
        location_id: The Google Cloud region where the Dataproc Metastore service is located (for example, 'us-central1').
        service_id: The ID of the Dataproc Metastore service (for example, 'example-metastore-service').
        metadata_import_id: The ID of the metadata import (for example, 'example-metadata-import').
        project_id: The Google Cloud project ID.
    """
    name = f"projects/{project_id}/locations/{location_id}/services/{service_id}/metadataImports/{metadata_import_id}"

    request = metastore_v1beta.GetMetadataImportRequest(
        name=name,
    )

    try:
        response = client.get_metadata_import(request=request)
        print(f"Retrieved metadata import: {response.name}")
        print(f"State: {response.state.name}")
        print(f"Database dump type: {response.database_dump.database_type.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e.message}")
# [END metastore_v1beta_dataprocmetastore_metadataimport_get]
