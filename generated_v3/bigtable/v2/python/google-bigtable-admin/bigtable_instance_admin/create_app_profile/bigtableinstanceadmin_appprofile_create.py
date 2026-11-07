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

# [START bigtable_v2_bigtableinstanceadmin_appprofile_create]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def create_app_profile(
    project_id: str, instance_id: str, app_profile_id: str
) -> None:
    """Creates an app profile for a Cloud Bigtable instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The identifier of the Cloud Bigtable instance (for example, 'example-instance-id').
        app_profile_id: The identifier for the app profile (for example, 'example-appprofile-id').
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()

    parent = f"projects/{project_id}/instances/{instance_id}"
    app_profile = bigtable_admin_v2.AppProfile(
        description="Application profile for client routing",
        multi_cluster_routing_use_any=bigtable_admin_v2.AppProfile.MultiClusterRoutingUseAny(),
    )

    try:
        response = client.create_app_profile(
            parent=parent,
            app_profile_id=app_profile_id,
            app_profile=app_profile,
        )
        print(f"Created app profile: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to create app profile: {e}")
# [END bigtable_v2_bigtableinstanceadmin_appprofile_create]
