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

# [START dataproc_v1_batchcontroller_batch_delete]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def delete_dataproc_batch(
    project_id: str,
    location: str,
    batch_id: str,
) -> None:
    """
    Deletes a Dataproc batch workload.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The Google Cloud region where the batch is located
                  (e.g., 'us-central1').
        batch_id: The ID of the batch workload to delete.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.BatchControllerClient(client_options=options)

    batch_name = client.batch_path(project_id, location, batch_id)

    try:
        client.delete_batch(name=batch_name)
        print(f"Batch workload '{batch_name}' deleted successfully.")

    except exceptions.NotFound:
        print(
            f"Batch workload '{batch_name}' not found. It may have already been deleted."
        )
    except exceptions.FailedPrecondition as e:
        print(f"Failed to delete batch workload '{batch_name}': {e}")
        print(
            "This usually means the batch is not in a terminal state (e.g., SUCCEEDED, FAILED, CANCELLED)."
        )
        print(
            "Please ensure the batch has completed or been cancelled before attempting to delete it."
        )
    except Exception as e:
        print(
            f"An unexpected error occurred while deleting batch workload '{batch_name}': {e}"
        )


# [END dataproc_v1_batchcontroller_batch_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes a Dataproc batch workload.")
    parser.add_argument(
        "--project_id",
        type=str,
        help="The ID of the Google Cloud project.",
        required=True,
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Google Cloud region where the batch is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--batch_id",
        type=str,
        help="The ID of the batch workload to delete.",
        required=True,
    )

    args = parser.parse_args()

    delete_dataproc_batch(args.project_id, args.location, args.batch_id)
