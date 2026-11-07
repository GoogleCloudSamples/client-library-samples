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

# [START iap_v1_identityawareproxyadminservice_validate_iap_attribute_expression]
import google.api_core.exceptions
from google.cloud import iap_v1

client = iap_v1.IdentityAwareProxyAdminServiceClient()


def validate_iap_attribute_expression(name: str, expression: str) -> None:
    """Validate a Common Expression Language (CEL) attribute expression against IAP restrictions.

    Args:
        name: The resource name of the IAP protected resource to validate the expression against.
        expression: The CEL expression string to validate against IAP restrictions.
    """
    request = iap_v1.ValidateIapAttributeExpressionRequest(
        name=name,
        expression=expression,
    )

    try:
        response = client.validate_iap_attribute_expression(request=request)
        print("Attribute expression is valid.")
        print(f"Response: {response}")
    except google.api_core.exceptions.InvalidArgument as error:
        print(f"Expression validation failed: {error.message}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error.message}")
# [END iap_v1_identityawareproxyadminservice_validate_iap_attribute_expression]
