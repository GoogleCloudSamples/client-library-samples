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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_ipoverrides_list]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1


def list_ip_overrides(project_id: str, key_id: str) -> None:
    """Lists IP overrides for a reCAPTCHA Enterprise key.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        key_id: The server-generated ID of the reCAPTCHA key (for example,
            'example-key-id'). Read this ID from an existing Key resource (for
            example, via ListKeys).
    """
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()
    parent = f"projects/{project_id}/keys/{key_id}"

    try:
        request = recaptchaenterprise_v1.ListIpOverridesRequest(parent=parent)
        page_result = client.list_ip_overrides(request=request)

        count = 0
        for ip_override in page_result:
            print(f"IP: {ip_override.ip}, Override type: {ip_override.override_type}")
            count += 1

        if count == 0:
            print(f"No IP overrides found for key: {key_id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to list IP overrides: {e}")
# [END recaptchaenterprise_v1_recaptchaenterpriseservice_ipoverrides_list]
