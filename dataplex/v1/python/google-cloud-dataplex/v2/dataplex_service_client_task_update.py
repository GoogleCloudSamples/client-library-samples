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
from google.cloud import dataplex_v1
from google.api_core import exceptions
from google.protobuf import field_mask_pb2

# [START dataplex_v1_dataplexservice_task_update]
def update_dataplex_task(
    project_id: str,
    location_id: str,
    lake_id: str,
    task_id: str,
    new_description: str,
    new_schedule: str,
) -> None:
    """Updates a Dataplex task's description and schedule.

    This function demonstrates how to update specific fields of an existing
    Dataplex task, such as its description and recurring schedule. It first
    retrieves the existing task to ensure consistency with required fields
    like the trigger type, then applies the updates.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The ID of the Google Cloud location (e.g., 'us-central1').
        lake_id: The ID of the lake where the task is located.
        task_id: The ID of the task to update.
        new_description: The new description for the task.
        new_schedule: The new cron schedule for the task (e.g., '0 3 * * *').
                      This only applies to RECURRING tasks.
    """
    # Create a Dataplex service client.
    client = dataplex_v1.DataplexServiceClient()

    # Construct the full resource name for the task.
    task_name = client.task_path(project_id, location_id, lake_id, task_id)

    # First, get the existing task to ensure we have its current configuration,
    # especially for required fields like trigger_spec.type_ that are not being updated.
    try:
        existing_task = client.get_task(name=task_name)
        print(f"Found existing task: {existing_task.name}")
        print(f"Current Description: {existing_task.description}")
        print(f"Current Schedule: {existing_task.trigger_spec.schedule if existing_task.trigger_spec else 'N/A'}")
    except exceptions.NotFound:
        print(f"Error: Task '{task_name}' not found. Please check the task ID.")
        return
    except exceptions.GoogleAPICallError as e:
        print(f"Error fetching existing task: {e}")
        return
    except Exception as e:
        print(f"An unexpected error occurred while fetching task: {e}")
        return

    # Create a FieldMask to specify which fields to update.
    # We are updating the 'description' and the 'schedule' within 'trigger_spec'.
    update_mask = field_mask_pb2.FieldMask(
        paths=["description", "trigger_spec.schedule"]
    )

    # Create a Task object with the updated fields.
    # The 'name' field is required to identify the task to update.
    # We use the existing trigger_spec.type_ to maintain consistency,
    # as it's a required field within TriggerSpec.
    updated_task = dataplex_v1.Task(
        name=task_name,
        description=new_description,
        trigger_spec=dataplex_v1.Task.TriggerSpec(
            type_=existing_task.trigger_spec.type_, # Use existing type
            schedule=new_schedule,
        ),
    )

    print(f"Attempting to update task: {task_name}...")

    try:
        # Send the update request.
        # The update_mask ensures only specified fields are modified.
        operation = client.update_task(task=updated_task, update_mask=update_mask)
        result = operation.result() # Wait for the LRO to complete

        print(f"Task {result.name} updated successfully.")
        print(f"Updated Description: {result.description}")
        if result.trigger_spec:
            print(f"Updated Schedule: {result.trigger_spec.schedule}")
        else:
            print("Task trigger_spec is not available after update.")

    except exceptions.NotFound:
        # This case should ideally be caught by the initial get_task call,
        # but included for robustness.
        print(f"Error: Task '{task_name}' not found during update. This should not happen if get_task succeeded.")
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for task update. Details: {e}")
        print("Please ensure the new schedule is valid and the task type supports scheduling.")
    except exceptions.FailedPrecondition as e:
        print(f"Error: Failed precondition for task update. Details: {e}")
        print("This might happen if the task is in a state that prevents updates.")
    except exceptions.GoogleAPICallError as e:
        print(f"Error updating task: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
# [END dataplex_v1_dataplexservice_task_update]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates a Dataplex task's description and schedule."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="cloud-llm-apis",  # Replace with your project ID
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location_id",
        type=str,
        default="us-central1",
        help="The ID of the Google Cloud location (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--lake_id",
        type=str,
        default="my-lake",  # Replace with your lake ID
        help="The ID of the lake where the task is located.",
    )
    parser.add_argument(
        "--task_id",
        type=str,
        default="my-task-to-update",  # Replace with the task ID to update
        help="The ID of the task to update.",
    )
    parser.add_argument(
        "--new_description",
        type=str,
        default="Updated description for my Dataplex task.",
        help="The new description for the task.",
    )
    parser.add_argument(
        "--new_schedule",
        type=str,
        default="0 3 * * *",  # New cron schedule (e.g., daily at 3 AM UTC)
        help="The new cron schedule for the task (e.g., '0 3 * * *').",
    )
    args = parser.parse_args()

    update_dataplex_task(
        args.project_id,
        args.location_id,
        args.lake_id,
        args.task_id,
        args.new_description,
        args.new_schedule,
    )
