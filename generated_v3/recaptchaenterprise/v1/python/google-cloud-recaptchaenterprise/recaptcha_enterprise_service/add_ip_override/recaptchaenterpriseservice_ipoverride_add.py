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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_add_ip_override]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1


def add_ip_override(project_id: str, key_id: str) -> None:
    """Adds an IP override to a reCAPTCHA Enterprise key.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        key_id: ID of the Key (for example, 'example-key-id').
    """
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

    name = f"projects/{project_id}/keys/{key_id}"
    ip_override_data = recaptchaenterprise_v1.IpOverrideData(
        ip="198.51.100.1",
        override_type=recaptchaenterprise_v1.IpOverrideData.OverrideType.ALLOW,
    )

    request = recaptchaenterprise_v1.AddIpOverrideRequest(
        name=name,
        ip_override_data=ip_override_data,
    )

    try:
        response = client.add_ip_override(request=request)
        print(f"Successfully added IP override for key: {name}")
        print(f"Response: {response}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to add IP override: {e.message}")
# [END recaptchaenterprise_v1_recaptchaenterpriseservice_add_ip_override]
