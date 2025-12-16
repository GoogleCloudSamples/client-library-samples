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

# [START eventarc_v1_eventarc_trigger_delete]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def delete_trigger(
    project_id: str,
    location: str,
    trigger_id: str,
) -> None:
    """Deletes an Eventarc trigger.

    Args:
        project_id: The Google Cloud project ID.
        location: The region where the trigger is located (e.g., "us-central1").
        trigger_id: The ID of the trigger to delete.
    """
    client = eventarc_v1.EventarcClient()
    trigger_name = client.trigger_path(project_id, location, trigger_id)

    try:
        operation = client.delete_trigger(name=trigger_name)
        print(f"Waiting for operation to complete for trigger: {trigger_name}...")
        response = operation.result()
        print(f"Successfully deleted trigger: {response.name}")

    except exceptions.NotFound:
        print(
            f"Trigger '{trigger_name}' not found. "
            "It might have already been deleted or the name is incorrect."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"Error deleting trigger '{trigger_name}': {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_trigger_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes an Eventarc trigger.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The region where the trigger is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--trigger_id",
        type=str,
        required=True,
        help="The ID of the trigger to delete.",
    )

    args = parser.parse_args()

    delete_trigger(args.project_id, args.location, args.trigger_id)
