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

# [START iap_v1_identityawareproxyoauthservice_brands_list]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyOAuthServiceClient()


def list_brands(project_id: str) -> None:
    """List OAuth brands for a Google Cloud project.

    Args:
        project_id: Google Cloud project ID.
    """
    parent = f"projects/{project_id}"

    request = iap_v1.ListBrandsRequest(parent=parent)

    try:
        response = client.list_brands(request=request)
        for brand in response.brands:
            print(f"Brand name: {brand.name}")
            print(f"Application title: {brand.application_title}")
            print(f"Support email: {brand.support_email}")
            print(f"Internal only: {brand.org_internal_only}")
    except google.api_core.exceptions.GoogleAPICallError as err:
        print(f"API call failed: {err}")
# [END iap_v1_identityawareproxyoauthservice_brands_list]
