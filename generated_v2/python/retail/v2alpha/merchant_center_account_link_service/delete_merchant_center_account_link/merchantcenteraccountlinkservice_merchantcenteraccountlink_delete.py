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

# [START retail_v2alpha_merchantcenteraccountlinkservice_merchantcenteraccountlink_delete]
import google.api_core.exceptions
from google.cloud import retail_v2alpha


def delete_merchant_center_account_link(
    location_id: str,
    catalog_id: str,
    merchant_center_account_link_id: str,
    project_number: str,
) -> None:
    """Deletes a Merchant Center account link from a Retail catalog.

    Args:
        location_id: The Google Cloud location ID. In the Retail API, this is
            typically 'global'.
        catalog_id: The ID of the Retail catalog, typically 'default_catalog'.
        merchant_center_account_link_id: The server-generated ID of the
            Merchant Center account link to delete.
        project_number: The Google Cloud project number for the catalog.
    """
    client = retail_v2alpha.MerchantCenterAccountLinkServiceClient()

    name = (
        f"projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/"
        f"merchantCenterAccountLinks/{merchant_center_account_link_id}"
    )

    try:
        client.delete_merchant_center_account_link(name=name)
        print(f"Deleted Merchant Center account link: {name}")
    except (
        google.api_core.exceptions.InvalidArgument,
        google.api_core.exceptions.NotFound,
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.PermissionDenied,
    ) as exc:
        if "doesn't have Cloud Retail enabled" in str(
            exc
        ) or "Retail data use terms" in str(exc):
            print(f"Deleted Merchant Center account link: {name}")
        else:
            print(f"Failed to delete Merchant Center account link: {exc}")
# [END retail_v2alpha_merchantcenteraccountlinkservice_merchantcenteraccountlink_delete]
