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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_retrieve_legacy_secret_key]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1

client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()


def retrieve_legacy_secret_key(project_id: str, key_id: str) -> None:
    """Retrieves the legacy secret key associated with an existing reCAPTCHA key.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        key_id: The server-generated ID of the reCAPTCHA key (for example, '6Le-wvkSAAAAAPBMRTvw0Q4Muexq9bi0DJwx_mJ-'). Sourced from an existing Key or ListKeys response.
    """
    key = f"projects/{project_id}/keys/{key_id}"

    request = recaptchaenterprise_v1.RetrieveLegacySecretKeyRequest(
        key=key,
    )

    try:
        response = client.retrieve_legacy_secret_key(request=request)
        print(f"Legacy secret key: {response.legacy_secret_key}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to retrieve legacy secret key: {e.message}")
# [END recaptchaenterprise_v1_recaptchaenterpriseservice_retrieve_legacy_secret_key]
