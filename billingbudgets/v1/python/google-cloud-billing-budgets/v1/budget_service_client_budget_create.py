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

# [START billingbudgets_v1_budgetservice_create_budget]
from google.cloud.billing import budgets_v1
from google.cloud.billing.budgets_v1 import types
from google.api_core import exceptions
from google.type import money_pb2


def create_budget(
    billing_account_id: str,
) -> None:
    """Creates a new budget for a Google Cloud billing account.

    This sample demonstrates how to create a budget that tracks the total spend
    for the entire billing account, with a specified amount and alerts at 50%
    and 90% of the budget.

    Args:
        billing_account_id: The ID of the Google Cloud billing account
                            (e.g., '012345-678901-ABCDEF').
    """
    client = budgets_v1.BudgetServiceClient()

    budget_display_name = "My Example Budget"

    # This budget is for a fixed amount of 1000 USD.
    budget_amount = types.BudgetAmount(
        specified_amount=money_pb2.Money(
            currency_code="USD",
            units=1000,
        )
    )

    # This budget will send alerts when 50% and 90% of the budget is spent.
    threshold_rules = [
        types.ThresholdRule(
            threshold_percent=0.5,
            spend_basis=types.ThresholdRule.Basis.CURRENT_SPEND,
        ),
        types.ThresholdRule(
            threshold_percent=0.9,
            spend_basis=types.ThresholdRule.Basis.CURRENT_SPEND,
        ),
    ]

    budget = types.Budget(
        display_name=budget_display_name,
        amount=budget_amount,
        threshold_rules=threshold_rules,
    )

    parent_path = f"billingAccounts/{billing_account_id}"

    request = types.CreateBudgetRequest(
        parent=parent_path,
        budget=budget,
    )

    try:
        response = client.create_budget(request=request)
        print(f"Successfully created budget: {response.name}")
        print(f"Display Name: {response.display_name}")
        print(
            f"Amount: {response.amount.specified_amount.units} {response.amount.specified_amount.currency_code}"
        )
        print(f"Threshold Rules: {len(response.threshold_rules)}")
    except exceptions.AlreadyExists as e:
        print(
            f"Error: A budget with display name '{budget_display_name}' might already exist for billing account '{billing_account_id}'."
        )
        print(f"Please try a different display name or verify existing budgets.")
        print(f"Details: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            f"Please check your billing account ID, permissions, and request parameters."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            f"This might indicate a problem with the client library setup or network connectivity."
        )


# [END billingbudgets_v1_budgetservice_create_budget]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Creates a new budget for a Google Cloud billing account."
    )
    parser.add_argument(
        "--billing_account_id",
        help="The ID of the Google Cloud billing account (e.g., '012345-678901-ABCDEF').",
        required=True,
        type=str,
    )
    args = parser.parse_args()

    create_budget(args.billing_account_id)
