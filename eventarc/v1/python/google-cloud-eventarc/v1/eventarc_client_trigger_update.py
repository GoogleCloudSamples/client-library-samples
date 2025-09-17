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

# [START eventarc_v1_eventarc_trigger_update]
from google.api_core import exceptions
from google.cloud import eventarc_v1
from google.protobuf import field_mask_pb2


def update_eventarc_trigger(
    project_id: str,
    location: str,
    trigger_id: str,
    new_service_account: str,
) -> None:
    """
    Updates an existing Eventarc trigger's service account.

    This sample demonstrates how to modify an existing Eventarc trigger
    by updating its associated service account. The update operation targets
    a specific field using a field mask.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the trigger is located (e.g., "us-central1").
        trigger_id: The ID of the trigger to update.
        new_service_account: The email of the new service account to associate
            with the trigger. This service account must exist in the same project.
            Example: "my-service-account@your-project-id.iam.gserviceaccount.com"
    """
    client = eventarc_v1.EventarcClient()

    trigger_name = client.trigger_path(project_id, location, trigger_id)

    # Prepare the updated trigger object with the new service account.
    # Only the fields specified in the update_mask will be modified.
    updated_trigger = eventarc_v1.Trigger(
        name=trigger_name,
        service_account=new_service_account,
    )

    # Create a field mask to specify that only the 'service_account' field should be updated.
    update_mask = field_mask_pb2.FieldMask(paths=["service_account"])

    try:
        print(
            f"Updating trigger {trigger_name} with new service account: {new_service_account}..."
        )
        operation = client.update_trigger(
            trigger=updated_trigger,
            update_mask=update_mask,
        )

        # Wait for the operation to complete.
        response = operation.result()

        print("Trigger updated successfully:")
        print(f"Trigger Name: {response.name}")
        print(f"Service Account: {response.service_account}")
        print(f"Update Time: {response.update_time.isoformat()}")

    except exceptions.NotFound:
        print(
            f"Error: Trigger '{trigger_name}' not found. Please ensure the trigger_id and location are correct."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_trigger_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates an existing Eventarc trigger's service account."
    )
    parser.add_argument(
        "--project_id",
        help="The Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The region where the trigger is located (e.g., 'us-central1').",
        required=True,
    )
    parser.add_argument(
        "--trigger_id",
        help="The ID of the trigger to update.",
        required=True,
    )
    parser.add_argument(
        "--new_service_account",
        help=(
            "The email of the new service account to associate with the trigger. "
            "Example: 'my-service-account@your-project-id.iam.gserviceaccount.com'"
        ),
        required=True,
    )

    args = parser.parse_args()

    update_eventarc_trigger(
        args.project_id,
        args.location,
        args.trigger_id,
        args.new_service_account,
    )
