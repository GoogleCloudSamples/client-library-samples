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

# [START migrationcenter_v1_migrationcenter_importdatafile_delete]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def delete_import_data_file(
    project_id: str,
    location_id: str,
    import_job_id: str,
    import_data_file_id: str,
) -> None:
    """Delete an import data file from Migration Center.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region or location ID (for example, 'us-central1').
        import_job_id: The ID of the parent import job.
        import_data_file_id: The ID of the import data file to delete.
    """
    name = client.import_data_file_path(
        project_id, location_id, import_job_id, import_data_file_id
    )

    request = migrationcenter_v1.DeleteImportDataFileRequest(
        name=name,
    )

    try:
        operation = client.delete_import_data_file(request=request)
        print(f"Waiting for operation to complete: {operation.operation.name}")

        operation.result()
        print(f"Deleted import data file: {name}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"Failed to delete import data file: {err}")
# [END migrationcenter_v1_migrationcenter_importdatafile_delete]
