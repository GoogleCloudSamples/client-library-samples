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

# [START datastore_v1_datastoreadmin_export_entities]
import google.api_core.exceptions
from google.cloud import datastore_admin_v1


def export_entities(project_id: str, output_url_prefix: str) -> None:
    """Exports entities from Cloud Datastore to Cloud Storage.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        output_url_prefix: The Cloud Storage URI prefix to export entities to,
          formatted as 'gs://bucket_name' or 'gs://bucket_name/path'.
    """
    client = datastore_admin_v1.DatastoreAdminClient()

    request = datastore_admin_v1.ExportEntitiesRequest(
        project_id=project_id,
        output_url_prefix=output_url_prefix,
    )

    try:
        # Start the long-running export operation
        operation = client.export_entities(request=request)
        print(f"Waiting for operation {operation.operation.name} to complete...")

        response = operation.result()
        print(f"Export completed successfully. Metadata file: {response.output_url}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Export operation failed: {error}")
# [END datastore_v1_datastoreadmin_export_entities]
