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

# [START bigtable_v2_bigtableinstanceadmin_instance_create]
import google.api_core.exceptions
from google.cloud import bigtable_admin_v2


def create_instance(project_id: str, instance_id: str) -> None:
    """Creates a Cloud Bigtable instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        instance_id: The caller-chosen ID to be used when referring to the new
          instance within its project (for example, 'example-instance').
    """
    client = bigtable_admin_v2.BigtableInstanceAdminClient()

    parent = f"projects/{project_id}"
    instance = bigtable_admin_v2.Instance(
        display_name="Example Bigtable Instance",
        type_=bigtable_admin_v2.Instance.Type.PRODUCTION,
    )
    clusters = {
        "example-cluster": bigtable_admin_v2.Cluster(
            location=f"projects/{project_id}/locations/us-central1-b",
            serve_nodes=1,
            default_storage_type=bigtable_admin_v2.StorageType.SSD,
        )
    }

    try:
        operation = client.create_instance(
            parent=parent,
            instance_id=instance_id,
            instance=instance,
            clusters=clusters,
        )
        response = operation.result()
        print(f"Created instance: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
    except google.api_core.exceptions.RetryError as e:
        print(f"Retry failed: {e}")
# [END bigtable_v2_bigtableinstanceadmin_instance_create]
