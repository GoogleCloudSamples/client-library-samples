# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import argparse

# [START billingbudgets_v1beta1_budgetservice_budgets_list]
from google.cloud.billing import budgets_v1beta1
from google.api_core import exceptions


def list_budgets(billing_account_id: str) -> None:
    """
    Lists all budgets associated with a specified billing account.

    This function demonstrates how to retrieve a paginated list of budgets
    for a given Google Cloud billing account. It iterates through all available
    pages to ensure all budgets are retrieved and printed.

    Args:
        billing_account_id: The ID of the billing account (e.g., '012345-567890-ABCDEF').
    """
    client = budgets_v1beta1.BudgetServiceClient()

    parent_name = f"billingAccounts/{billing_account_id}"

    try:
        request = budgets_v1beta1.ListBudgetsRequest(
            parent=parent_name,
        )

        page_result = client.list_budgets(request=request)

        budgets_found = False
        print(f"Budgets for billing account '{billing_account_id}':")
        for budget in page_result:
            budgets_found = True
            print(f"- Budget Name: {budget.name}")
            print(f"  Display Name: {budget.display_name}")
            print(
                f"  Amount: {budget.amount.specified_amount.units} {budget.amount.specified_amount.currency_code}"
            )

            if budget.threshold_rules:
                print("  Thresholds:")
                for threshold in budget.threshold_rules:
                    print(f"    {threshold}")
            print("--------------------------------------------------")

        if not budgets_found:
            print("No budgets found for this billing account.")

    except exceptions.PermissionDenied as e:
        print(
            f"Error: Permission denied. Please ensure the service account has "
            f"'Billing Account User' or 'Billing Account Viewer' role on billing account '{billing_account_id}'."
        )
        print(f"Details: {e}")
    except exceptions.NotFound as e:
        print(
            f"Error: Billing account '{billing_account_id}' not found. "
            f"Please verify the billing account ID is correct."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END billingbudgets_v1beta1_budgetservice_budgets_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="List budgets for a Google Cloud billing account."
    )
    parser.add_argument(
        "--billing_account_id",
        required=True,
        type=str,
        help="The ID of the billing account (e.g., '012345-567890-ABCDEF').",
    )

    args = parser.parse_args()
    list_budgets(args.billing_account_id)
