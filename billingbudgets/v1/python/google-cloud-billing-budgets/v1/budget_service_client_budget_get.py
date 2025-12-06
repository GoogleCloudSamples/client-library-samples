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

from google.api_core import exceptions

# [START billingbudgets_v1_budgetservice_budget_get]
from google.cloud.billing import budgets_v1

def get_budget(
    billing_account_id: str,
    budget_id: str,
) -> None:
    """
    Retrieves a specific budget for a billing account.

    Args:
        billing_account_id: The ID of the billing account.
        budget_id: The ID of the budget to retrieve.
    """
    client = budgets_v1.BudgetServiceClient()

    budget_name = client.budget_path(billing_account_id, budget_id)

    try:
        budget = client.get_budget(name=budget_name)

        print(f"Successfully retrieved budget: {budget.display_name}")
        print(f"Budget Name: {budget.name}")
        print(f"Amount: {budget.amount.specified_amount.units} {budget.amount.specified_amount.currency_code}")
        print(f"Threshold Rules Count: {len(budget.threshold_rules)}")

    except exceptions.NotFound:
        print(f"Error: Budget '{budget_name}' not found.")
        print("Please ensure the billing account ID and budget ID are correct and the budget exists.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END billingbudgets_v1_budgetservice_budget_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves a specific budget for a billing account."
    )
    parser.add_argument(
        "--billing_account_id",
        type=str,
        required=True,
        help="The ID of the billing account.",
    )
    parser.add_argument(
        "--budget_id",
        type=str,
        required=True,
        help="The ID of the budget to retrieve.",
    )

    args = parser.parse_args()

    get_budget(args.billing_account_id, args.budget_id)
