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

# [START redis_v1beta1_cloudredis_instance_delete]
import google.api_core.exceptions
from google.cloud import redis_v1beta1

client = redis_v1beta1.CloudRedisClient()


def delete_instance(project_id: str, location_id: str, instance_id: str) -> None:
    """Delete a Cloud Redis instance.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        instance_id: ID of the Instance (for example, 'example-instance-id')
    """
    name = client.instance_path(project_id, location_id, instance_id)

    try:
        request = redis_v1beta1.DeleteInstanceRequest(name=name)
        operation = client.delete_instance(request=request)
        operation.result()
        print(f"Deleted Redis instance: {name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete instance: {error}")
# [END redis_v1beta1_cloudredis_instance_delete]
