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

# [START billingbudgets_v1_budgetservice_budgets_list]
from google.api_core import exceptions
from google.cloud.billing import budgets_v1


def list_budgets(billing_account_id: str) -> None:
    """Lists all budgets for a given billing account.

    Args:
        billing_account_id: The ID of the billing account (e.g., '012345-678901-ABCDEF').
    """
    client = budgets_v1.BudgetServiceClient()

    parent_path = f"billingAccounts/{billing_account_id}"

    try:
        print(f"Listing budgets for billing account: {billing_account_id}")
        page_result = client.list_budgets(parent=parent_path)

        found_budgets = False
        for budget in page_result:
            found_budgets = True
            print(f"  Found budget: {budget.name}")
            print(f"    Display Name: {budget.display_name}")
            if budget.amount.specified_amount:
                print(f"    Specified Amount: {budget.amount.specified_amount.units} {budget.amount.specified_amount.currency_code}")
            if budget.budget_filter.projects:
                print(f"    Projects: {', '.join(budget.budget_filter.projects)}")
            if budget.budget_filter.services:
                print(f"    Services: {', '.join(budget.budget_filter.services)}")

            if budget.threshold_rules:
                print("    Thresholds:")
                for threshold in budget.threshold_rules:
                    print(
                        f"      - Percent: {threshold.threshold_percent * 100:.2f}% ({threshold.spend_basis.name})"
                    )

        if not found_budgets:
            print(f"No budgets found for billing account: {billing_account_id}")

    except exceptions.NotFound:
        print(
            f"Error: Billing account '{billing_account_id}' not found. "
            "Please ensure the billing account ID is correct and you have "
            "permission to access it."
        )
    except exceptions.PermissionDenied:
        print(
            f"Error: Permission denied for billing account '{billing_account_id}'. "
            "Ensure the authenticated principal has the 'Billing Account User' "
            "or 'Billing Account Viewer' role on the billing account."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END billingbudgets_v1_budgetservice_budgets_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists budgets for a Google Cloud billing account."
    )
    parser.add_argument(
        "--billing_account_id",
        required=True,
        type=str,
        help="The ID of the billing account (e.g., '012345-678901-ABCDEF').",
    )

    args = parser.parse_args()
    list_budgets(args.billing_account_id)
