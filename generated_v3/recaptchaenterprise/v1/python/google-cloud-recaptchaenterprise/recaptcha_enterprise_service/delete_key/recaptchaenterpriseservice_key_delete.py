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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_delete]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1

client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()


def delete_key(project_id: str, key_id: str) -> None:
    """Use the delete_key method

    Args:
        project_id: The Google Cloud project ID.
        key_id: The server-generated ID of the reCAPTCHA Key to delete (for example, '6Le-w...'). Obtain this ID from an existing Key resource or via ListKeys.
    """
    name = f"projects/{project_id}/keys/{key_id}"

    request = recaptchaenterprise_v1.DeleteKeyRequest(name=name)

    try:
        client.delete_key(request=request)
        print(f"Deleted reCAPTCHA key: {name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to delete reCAPTCHA key: {e}")
# [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_delete]
