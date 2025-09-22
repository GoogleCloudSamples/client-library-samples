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

# [START billingbudgets_v1beta1_budgetservice_budget_delete]
from google.api_core import exceptions
from google.cloud.billing import budgets_v1beta1


def delete_budget(
    billing_account_id: str,
    budget_id: str,
) -> None:
    """
    Deletes a specified budget.

    Args:
        billing_account_id: The ID of the billing account, e.g., '012345-678901-ABCDEF'.
        budget_id: The ID of the budget to delete.
    """
    client = budgets_v1beta1.BudgetServiceClient()

    budget_name = client.budget_path(billing_account_id, budget_id)

    request = budgets_v1beta1.DeleteBudgetRequest(
        name=budget_name,
    )
    try:
        client.delete_budget(request=request)
        print(f"Budget '{budget_name}' deleted successfully.")

    except exceptions.NotFound:
        print(
            f"Error: Budget '{budget_name}' not found. "
            "Please ensure the billing account ID and budget ID are correct."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print("Please check your permissions and the validity of the budget name.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print("Please review the error details and try again.")


# [END billingbudgets_v1beta1_budgetservice_budget_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a budget for a Google Cloud Billing Account."
    )
    parser.add_argument(
        "--billing_account_id",
        type=str,
        required=True,
        help="The ID of the billing account (e.g., '012345-678901-ABCDEF').",
    )
    parser.add_argument(
        "--budget_id",
        type=str,
        required=True,
        help="The ID of the budget to delete.",
    )

    args = parser.parse_args()

    delete_budget(
        billing_account_id=args.billing_account_id,
        budget_id=args.budget_id,
    )
