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

# [START billingbudgets_v1beta1_budgetservice_create_budget]
from google.cloud.billing import budgets_v1beta1
from google.api_core import exceptions
from google.type import money_pb2


def create_budget(
    billing_account_id: str, display_name: str = "My sample billing budget"
) -> None:
    """
    Creates a new budget for a billing account.

    Args:
        billing_account_id: Your Google Cloud Billing Account ID (e.g., '012345-678901-ABCDEF').
        display_name: A display name for the new budget.
    """
    client = budgets_v1beta1.BudgetServiceClient()

    parent = f"billingAccounts/{billing_account_id}"

    # Define the budget amount: $100 USD for this example.
    budget_amount = budgets_v1beta1.BudgetAmount(
        specified_amount=money_pb2.Money(currency_code="USD", units=100)
    )

    # Define a threshold rule: alert when 90% of the budget is met.
    # The spend basis is set to CURRENT_SPEND, meaning it uses the actual spend
    # to compare against the threshold.
    threshold_rule = budgets_v1beta1.ThresholdRule(
        threshold_percent=0.9,
        spend_basis=budgets_v1beta1.ThresholdRule.Basis.CURRENT_SPEND,
    )

    # Default IAM recipients will still receive notifications unless disabled.
    all_updates_rule = budgets_v1beta1.AllUpdatesRule(
        disable_default_iam_recipients=False,
        enable_project_level_recipients=False,
    )

    # Define a budget filter. This example tracks usage for all projects
    # within the billing account and includes all credit types.
    # The budget period is set to a calendar month.
    budget_filter = budgets_v1beta1.Filter(
        credit_types_treatment=budgets_v1beta1.Filter.CreditTypesTreatment.INCLUDE_ALL_CREDITS,
        calendar_period=budgets_v1beta1.CalendarPeriod.MONTH,
    )

    # Construct the Budget object with all defined components.
    budget = budgets_v1beta1.Budget(
        display_name=display_name,
        budget_filter=budget_filter,
        amount=budget_amount,
        threshold_rules=[threshold_rule],
        all_updates_rule=all_updates_rule,
    )

    # Create the CreateBudgetRequest object.
    request = budgets_v1beta1.CreateBudgetRequest(
        parent=parent,
        budget=budget,
    )

    try:
        response = client.create_budget(request=request)
        print(f"Successfully created budget: {response.name}")
        print(f"  Display Name: {response.display_name}")
        print(
            f"  Amount: {response.amount.specified_amount.units} {response.amount.specified_amount.currency_code}"
        )
        print(f"  Thresholds configured: {len(response.threshold_rules)}")

    except exceptions.PermissionDenied as e:
        print(f"Permission Denied: {e}")
        print(
            "Please ensure the service account or user has 'Billing Account User' or 'Billing Account Administrator' role on the billing account."
        )
        print(f"Billing Account ID: {billing_account_id}")
    except exceptions.InvalidArgument as e:
        print(f"Invalid Argument: {e}")
        print(
            "Please check the provided billing account ID and budget configuration, including the Pub/Sub topic format if provided."
        )
    except exceptions.AlreadyExists as e:
        print(f"Budget with display name '{display_name}' already exists: {e}")
        print(
            "Please choose a unique display name or update the existing budget if you intend to modify it."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            "Please review the error message and Google Cloud documentation for possible solutions."
        )

    # [END billingbudgets_v1beta1_budgetservice_create_budget]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Create a new Google Cloud Billing Budget."
    )
    parser.add_argument(
        "--billing_account_id",
        required=True,
        type=str,
        help="Your Google Cloud Billing Account ID (e.g., '012345-678901-ABCDEF').",
    )
    parser.add_argument(
        "--display_name",
        default="My sample billing budget",
        help="A display name for the new budget",
    )

    args = parser.parse_args()

    create_budget(args.billing_account_id, args.display_name)
