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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_keys_list]
import os

import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1


def list_keys(project_id: str) -> None:
    """Lists reCAPTCHA Enterprise keys in a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

    if not project_id:
        project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "")

    # Normalize project_id in case the resource path was passed
    while project_id.startswith("projects/"):
        project_id = project_id[len("projects/") :]

    parent = f"projects/{project_id}"

    request = recaptchaenterprise_v1.ListKeysRequest(
        parent=parent,
    )

    try:
        pager = client.list_keys(request=request)
        for key in pager:
            print(f"Key Name: {key.name}")
            print(f"Display Name: {key.display_name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END recaptchaenterprise_v1_recaptchaenterpriseservice_keys_list]
