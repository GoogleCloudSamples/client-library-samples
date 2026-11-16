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

# [START migrationcenter_v1_migrationcenter_importdatafile_create]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1

client = migrationcenter_v1.MigrationCenterClient()


def create_import_data_file(
    import_data_file_id: str,
    project_id: str,
    location_id: str,
    import_job_id: str,
) -> None:
    """Creates an import data file in an existing Migration Center import job.

    Args:
        import_data_file_id: Caller-specified identifier for the new import data file.
        project_id: The Google Cloud project ID.
        location_id: The Google Cloud region for Migration Center (for example, 'us-central1').
        import_job_id: The ID of the existing import job to attach this data file to.
    """
    parent = (
        f"projects/{project_id}/locations/{location_id}/importJobs/{import_job_id}"
    )
    import_data_file = migrationcenter_v1.ImportDataFile(
        display_name="Example Import Data File",
        format_=migrationcenter_v1.ImportJobFormat.IMPORT_JOB_FORMAT_RVTOOLS_XLSX,
    )

    try:
        operation = client.create_import_data_file(
            parent=parent,
            import_data_file_id=import_data_file_id,
            import_data_file=import_data_file,
        )
        response = operation.result()
        print(f"Created import data file: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Failed to create import data file: {exc.message}")


# [END migrationcenter_v1_migrationcenter_importdatafile_create]
