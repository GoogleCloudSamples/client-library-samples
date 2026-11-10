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

# [START bigtable_v2_bigtableinstanceadmin_materializedviews_list]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def list_materialized_views(project_id: str, instance_id: str) -> None:
    """Lists materialized views for a Cloud Bigtable instance.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        instance_id: Cloud Bigtable instance ID (for example,
          'example-instance-id').
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()
    parent = f"projects/{project_id}/instances/{instance_id}"

    try:
        response = client.list_materialized_views(parent=parent)
        found = False
        for materialized_view in response:
            print(f"Materialized view: {materialized_view.name}")
            found = True
        if not found:
            print(f"No materialized views found for instance: {instance_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list materialized views: {error}")
# [END bigtable_v2_bigtableinstanceadmin_materializedviews_list]
