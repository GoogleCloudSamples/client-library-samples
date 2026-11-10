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

# [START bigtable_v2_bigtableinstanceadmin_appprofile_delete]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def delete_app_profile(
    project_id: str, instance_id: str, app_profile_id: str
) -> None:
    """Deletes an app profile from a Cloud Bigtable instance.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        instance_id: The ID of the instance (for example,
          'example-instance-id').
        app_profile_id: The ID of the app profile to delete (for example,
          'example-app-profile-id').
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()

    ignore_warnings = True
    name = f"projects/{project_id}/instances/{instance_id}/appProfiles/{app_profile_id}"

    try:
        client.delete_app_profile(name=name, ignore_warnings=ignore_warnings)
        print(f"Deleted app profile: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete app profile: {error}")
# [END bigtable_v2_bigtableinstanceadmin_appprofile_delete]
