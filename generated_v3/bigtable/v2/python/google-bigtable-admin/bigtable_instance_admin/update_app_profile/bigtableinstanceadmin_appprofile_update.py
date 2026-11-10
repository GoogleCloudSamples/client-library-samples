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

# [START bigtable_v2_bigtableinstanceadmin_appprofile_update]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2 as bigtable_v2
from google.protobuf import field_mask_pb2

client = bigtable_v2.BigtableInstanceAdminClient()


def update_app_profile(
    project_id: str, instance_id: str, app_profile_id: str
) -> None:
    """Use the update_app_profile method to update an existing app profile.

    Args:
        project_id: The Google Cloud project ID containing the Bigtable instance.
        instance_id: The ID of the existing Bigtable instance.
        app_profile_id: The ID of the Bigtable app profile to update.
    """
    app_profile = bigtable_v2.AppProfile(
        name=f"projects/{project_id}/instances/{instance_id}/appProfiles/{app_profile_id}",
        description="Updated description for the application profile",
    )
    update_mask = field_mask_pb2.FieldMask(paths=["description"])

    try:
        operation = client.update_app_profile(
            app_profile=app_profile,
            update_mask=update_mask,
        )
        response = operation.result()
        print(f"Updated app profile: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to update app profile: {e}")
# [END bigtable_v2_bigtableinstanceadmin_appprofile_update]
