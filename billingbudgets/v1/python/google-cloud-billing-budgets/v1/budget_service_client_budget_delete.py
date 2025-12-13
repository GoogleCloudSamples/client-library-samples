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

# [START billingbudgets_v1_budgetservice_budget_delete]
from google.api_core import exceptions
from google.cloud.billing import budgets_v1


def delete_budget(
    billing_account_id: str,
    budget_id: str,
) -> None:
    """Deletes a specified budget.

    Args:
        billing_account_id: The ID of the billing account, for example, '012345-567890-ABCDEF'.
        budget_id: The ID of the budget to delete.
    """
    client = budgets_v1.BudgetServiceClient()

    budget_name = client.budget_path(
        billing_account=billing_account_id,
        budget=budget_id,
    )

    try:
        client.delete_budget(name=budget_name)
        print(f"Successfully deleted budget: {budget_name}")
    except exceptions.NotFound:
        print(
            f"Budget '{budget_name}' not found. It may have already been deleted or never existed."
        )
        print("Please verify the billing account ID and budget ID are correct.")
    except exceptions.PermissionDenied:
        print(f"Permission denied to delete budget '{budget_name}'.")
        print("Please ensure your account has the 'Billing Account Budget Administrator' role or equivalent.")
    except exceptions.GoogleAPICallError as e:
        print(
            f"An API error occurred while deleting budget '{budget_name}'. Error: {e}"
        )
        print(
            "Please check the provided IDs and your network connection, and ensure you have the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print("This might indicate an issue with your environment or client setup.")

# [END billingbudgets_v1_budgetservice_budget_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a specified Google Cloud Billing budget."
    )
    parser.add_argument(
        "--billing_account_id",
        required=True,
        type=str,
        help="The ID of the billing account, for example, '012345-567890-ABCDEF'.",
    )
    parser.add_argument(
        "--budget_id",
        required=True,
        type=str,
        help="The ID of the budget to delete.",
    )

    args = parser.parse_args()

    delete_budget(
        billing_account_id=args.billing_account_id,
        budget_id=args.budget_id,
    )
