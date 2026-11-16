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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_key_create]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1


def create_key(project_id: str) -> None:
    """Creates a reCAPTCHA key for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

    parent = f"projects/{project_id}"
    key = recaptchaenterprise_v1.Key(
        display_name="Example Key",
        web_settings=recaptchaenterprise_v1.WebKeySettings(
            integration_type=recaptchaenterprise_v1.WebKeySettings.IntegrationType.SCORE,
            allowed_domains=["example.com"],
        ),
    )

    try:
        request = recaptchaenterprise_v1.CreateKeyRequest(
            parent=parent,
            key=key,
        )
        response = client.create_key(request=request)
        print(f"Created key: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error creating reCAPTCHA key: {e.message}")


# [END recaptchaenterprise_v1_recaptchaenterpriseservice_key_create]
