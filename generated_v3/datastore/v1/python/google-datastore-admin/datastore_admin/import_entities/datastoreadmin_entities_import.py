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

# [START datastore_v1_datastoreadmin_import_entities]
import google.api_core.exceptions
from google.cloud import datastore_admin_v1


def import_entities(project_id: str, input_url: str) -> None:
    """Imports entities into Google Cloud Datastore from Cloud Storage.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        input_url: The full Google Cloud Storage URL of the export metadata
          file (for example,
          'gs://example-bucket/2023-01-01T00:00:00_12345/2023-01-01T00:00:00_12345.overall_export_metadata').
    """
    client = datastore_admin_v1.DatastoreAdminClient()

    request = datastore_admin_v1.ImportEntitiesRequest(
        project_id=project_id,
        input_url=input_url,
    )

    try:
        operation = client.import_entities(request=request)
        operation.result()
        print(f"Successfully imported entities from {input_url}.")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to import entities: {exc}")
# [END datastore_v1_datastoreadmin_import_entities]
