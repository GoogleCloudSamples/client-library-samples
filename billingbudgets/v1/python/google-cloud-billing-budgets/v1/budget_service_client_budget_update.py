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

from google.protobuf import field_mask_pb2
from google.api_core import exceptions as core_exceptions

# [START billingbudgets_v1_budgetservice_update_budget]
from google.cloud.billing import budgets_v1


def update_billing_budget(
    billing_account_id: str,
    budget_id: str,
    new_display_name: str = "My updated billing budget name",
) -> None:
    """
    Updates an existing budget's display name.

    This sample demonstrates how to update specific fields of an existing budget.
    The `update_mask` field is crucial here; it tells the API which specific
    fields in the `budget` object should be modified. If `update_mask` is not
    provided, only fields with non-default values from the request are updated.

    Args:
        billing_account_id: Your Google Cloud Billing Account ID.
            (e.g., '012345-678901-234567').
        budget_id: The ID of the budget to update.
        new_display_name: The new display name for the budget.
    """
    client = budgets_v1.BudgetServiceClient()

    budget_name = client.budget_path(billing_account_id, budget_id)

    # Create a Budget object with the updated display name for the budget.
    updated_budget = budgets_v1.Budget(
        name=budget_name,
        display_name=new_display_name,
    )

    # Create a FieldMask to specify that only the 'display_name' field should be updated.
    # This is important to avoid unintentionally resetting other fields.
    update_mask = field_mask_pb2.FieldMask(paths=["display_name"])

    try:
        response = client.update_budget(
            budget=updated_budget,
            update_mask=update_mask,
        )

        print(f"Successfully updated budget: {response.name}")
        print(f"New display name: {response.display_name}")

    except core_exceptions.NotFound:
        print(
            f"Error: Budget '{budget_name}' not found. "
            "Please check the billing account ID and budget ID."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# [END billingbudgets_v1_budgetservice_update_budget]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update a Google Cloud Billing Budget's display name."
    )
    parser.add_argument(
        "--billing_account_id",
        type=str,
        required=True,
        help="Your Google Cloud Billing Account ID (e.g., '012345-567890-ABCDEF').",
    )
    parser.add_argument(
        "--budget_id",
        type=str,
        required=True,
        help="The ID of the budget to update",
    )
    parser.add_argument(
        "--new_display_name",
        type=str,
        default="My updated billing budget name",
        help="The new display name for the budget.",
    )

    args = parser.parse_args()

    update_billing_budget(
        args.billing_account_id,
        args.budget_id,
        args.new_display_name,
    )
