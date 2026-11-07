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

# [START cloudbilling_v1_cloudbilling_billingaccounts_list]
import google.api_core.exceptions
from google.cloud import billing_v1


def list_billing_accounts() -> None:
    """Lists billing accounts accessible to the authenticated identity."""
    client = billing_v1.CloudBillingClient()
    request = billing_v1.ListBillingAccountsRequest()

    try:
        billing_accounts = client.list_billing_accounts(request=request)
        account_count = 0
        for account in billing_accounts:
            account_count += 1
            print(f"Account Name: {account.name}")
            print(f"Display Name: {account.display_name}")
            print(f"Account Open: {account.open_}")
        if account_count == 0:
            print("No billing accounts found.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to list billing accounts: {error}")
# [END cloudbilling_v1_cloudbilling_billingaccounts_list]
