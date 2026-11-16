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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_get]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1

client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()


def get_key(project_id: str, key_id: str) -> None:
    """Retrieves a reCAPTCHA key resource.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        key_id: The server-generated ID of the reCAPTCHA key. Obtain this value
          from an existing key resource (for example, from CreateKey or ListKeys).
    """
    name = f"projects/{project_id}/keys/{key_id}"

    request = recaptchaenterprise_v1.GetKeyRequest(name=name)

    try:
        response = client.get_key(request=request)
        print(f"Retrieved key: {response.name}")
        print(f"Display name: {response.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve key: {e}")
# [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_get]
