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

# [START migrationcenter_v1_migrationcenter_importjob_update]
import google.api_core.exceptions
from google.cloud import migrationcenter_v1
from google.protobuf import field_mask_pb2

client = migrationcenter_v1.MigrationCenterClient()


def update_import_job(project_id: str, location_id: str, import_job_id: str) -> None:
    """Updates an import job in Google Cloud Migration Center.

    Args:
        project_id: The ID of the Google Cloud project.
        location_id: The Google Cloud location ID (for example, 'us-central1').
        import_job_id: The ID of the import job to update.
    """
    import_job = migrationcenter_v1.ImportJob(
        name=f"projects/{project_id}/locations/{location_id}/importJobs/{import_job_id}",
        display_name="Updated Import Job",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        operation = client.update_import_job(
            import_job=import_job,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated import job: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update import job: {e}")
# [END migrationcenter_v1_migrationcenter_importjob_update]
