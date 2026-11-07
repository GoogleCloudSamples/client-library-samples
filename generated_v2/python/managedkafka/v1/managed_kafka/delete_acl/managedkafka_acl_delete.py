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

# [START managedkafka_v1_managedkafka_acl_delete]
import google.api_core.exceptions
from google.cloud import managedkafka_v1


def delete_acl(
    project_id: str, location_id: str, cluster_id: str, acl_id: str
) -> None:
    """Deletes an ACL entry in a Managed Service for Apache Kafka cluster.

    Args:
        project_id: Google Cloud project ID (for example, 'example-project-id').
        location_id: Google Cloud region (for example, 'us-central1').
        cluster_id: Target Kafka cluster ID (for example, 'example-cluster-id').
        acl_id: Target ACL resource pattern ID (for example, 'cluster' or 'topic/example-topic').
    """
    client = managedkafka_v1.ManagedKafkaClient()

    name = f"projects/{project_id}/locations/{location_id}/clusters/{cluster_id}/acls/{acl_id}"

    request = managedkafka_v1.DeleteAclRequest(
        name=name,
    )

    try:
        client.delete_acl(request=request)
        print(f"Deleted ACL: {name}")
    except google.api_core.exceptions.NotFound:
        print(f"Deleted ACL: {name}")
# [END managedkafka_v1_managedkafka_acl_delete]
