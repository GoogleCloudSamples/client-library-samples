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

# [START redis_v1beta1_cloudredis_instanceauthstring_get]
import google.api_core.exceptions
from google.cloud import redis_v1beta1

client = redis_v1beta1.CloudRedisClient()


def get_instance_auth_string(
    project_id: str, location_id: str, instance_id: str
) -> None:
    """Use the get_instance_auth_string method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        location_id: The Google Cloud region where the service is located (for example, 'us-central1')
        instance_id: ID of the Instance (for example, 'example-instance-id')
    """
    name = client.instance_path(project_id, location_id, instance_id)

    request = redis_v1beta1.GetInstanceAuthStringRequest(
        name=name,
    )

    try:
        response = client.get_instance_auth_string(request=request)
        print(f"AUTH String: {response.auth_string}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve AUTH string: {e}")


# [END redis_v1beta1_cloudredis_instanceauthstring_get]
