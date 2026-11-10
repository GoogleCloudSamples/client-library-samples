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

# [START bigtable_v2_bigtableinstanceadmin_hottablets_list]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2

client = bigtable_admin_v2.BigtableInstanceAdminClient()


def list_hot_tablets(project_id: str, instance_id: str, cluster_id: str) -> None:
    """Lists hot tablets in a Cloud Bigtable cluster.

    Args:
        project_id: The Google Cloud project ID.
        instance_id: The caller-chosen ID of the existing Bigtable instance.
        cluster_id: The caller-chosen ID of the existing Bigtable cluster within the instance.
    """
    parent = f"projects/{project_id}/instances/{instance_id}/clusters/{cluster_id}"

    try:
        response = client.list_hot_tablets(parent=parent)
        hot_tablets = list(response)
        for hot_tablet in hot_tablets:
            print(f"Hot tablet: {hot_tablet.name}")
        print(f"Listed {len(hot_tablets)} hot tablets.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END bigtable_v2_bigtableinstanceadmin_hottablets_list]
