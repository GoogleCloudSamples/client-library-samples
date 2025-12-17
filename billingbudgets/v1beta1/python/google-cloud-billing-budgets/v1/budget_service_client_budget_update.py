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

# [START billingbudgets_v1beta1_budgetservice_budget_update]
from google.cloud.billing import budgets_v1beta1
from google.api_core import exceptions
from google.protobuf import field_mask_pb2


def update_budget(
    billing_account_id: str,
    budget_id: str,
) -> None:
    """
    Updates an existing budget for a Cloud Billing account.

    This function demonstrates how to modify an existing budget's display name
    and potentially add a new threshold rule. It first retrieves the budget,
    modifies the desired fields, and then sends an update request with a
    field mask to ensure only specified fields are changed.

    Args:
        billing_account_id: The ID of the billing account, e.g., '012345-567890-ABCDEF'.
        budget_id: The ID of the budget to update, e.g., 'custom-budget-123'.
                   This is the last segment of the budget's resource name.
    """
    client = budgets_v1beta1.BudgetServiceClient()

    budget_name = client.budget_path(billing_account_id, budget_id)

    try:
        existing_budget = client.get_budget(name=budget_name)
        print(f"Retrieved existing budget: {existing_budget.name}")
        print(f"Current display name: {existing_budget.display_name}")

        new_display_name = f"Updated Budget for {billing_account_id} - {budget_id}"
        existing_budget.display_name = new_display_name

        # Optionally, add a new threshold rule if it doesn't already exist.
        # For example, add a 95% threshold based on current spend.
        update_paths = ["display_name"]
        ninety_five_percent_threshold_exists = False
        for rule in existing_budget.threshold_rules:
            if abs(rule.threshold_percent - 0.95) < 0.001:  # Compare floats carefully
                ninety_five_percent_threshold_exists = True
                break

        if not ninety_five_percent_threshold_exists:
            new_threshold_rule = budgets_v1beta1.Budget.ThresholdRule(
                threshold_percent=0.95,
                spend_basis=budgets_v1beta1.Budget.ThresholdRule.Basis.CURRENT_SPEND,
            )
            existing_budget.threshold_rules.append(new_threshold_rule)
            update_paths.append("threshold_rules")
            print("Adding a new 95% threshold rule.")
        else:
            print("95% threshold rule already exists, not adding a duplicate.")

        # Create a FieldMask to specify which fields are being updated.
        # This prevents unintended changes to other fields not explicitly set.
        field_mask = field_mask_pb2.FieldMask(paths=update_paths)

        # Create the UpdateBudgetRequest.
        request = budgets_v1beta1.UpdateBudgetRequest(
            budget=existing_budget,
            update_mask=field_mask,
        )

        updated_budget = client.update_budget(request=request)

        print(f"\nSuccessfully updated budget: {updated_budget.name}")
        print(f"New display name: {updated_budget.display_name}")
        print("Updated threshold rules:")
        if updated_budget.threshold_rules:
            for rule in updated_budget.threshold_rules:
                print(
                    f"  - {rule.threshold_percent * 100:.0f}% "
                    f"(Spend Basis: {rule.spend_basis.name})"
                )
        else:
            print("  No threshold rules defined.")

    except exceptions.NotFound:
        print(
            f"Error: Budget '{budget_name}' not found. "
            "Please ensure the budget ID and billing account ID are correct."
        )
        print("Corrective action: Verify the budget ID and billing account ID.")
    except exceptions.FailedPrecondition as e:
        print(f"Error: Failed to update budget due to a precondition violation: {e}")
        print("Corrective action: Check if the budget is in a valid state for update.")
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for budget update: {e}")
        print(
            "Corrective action: Review the budget fields and ensure they meet API requirements."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Corrective action: Check your network connection, permissions, or the API request format."
        )


# [END billingbudgets_v1beta1_budgetservice_budget_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Update an existing Google Cloud Billing budget."
    )
    parser.add_argument(
        "billing_account_id",
        help="The ID of your Google Cloud Billing Account (e.g., '012345-567890-ABCDEF').",
    )
    parser.add_argument(
        "budget_id",
        help="The ID of the budget to update (e.g., 'custom-budget-123').",
    )

    args = parser.parse_args()

    update_budget(args.billing_account_id, args.budget_id)
