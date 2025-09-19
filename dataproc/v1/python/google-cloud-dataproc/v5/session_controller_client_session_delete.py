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

# [START dataproc_v1_sessioncontroller_session_delete]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def delete_dataproc_session(
    project_id: str,
    location: str,
    session_id: str,
) -> None:
    """
    Deletes an interactive Dataproc session.

    This function demonstrates how to delete a Dataproc session using the
    `delete_session` method. If the session is not in a terminal state (e.g.,
    ACTIVE, CREATING), it will first be terminated and then deleted.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the session is located
                  (e.g., 'us-central1').
        session_id: The ID of the session to delete. This is the last
                    component of the session's resource name.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    session_controller_client = dataproc_v1.SessionControllerClient(
        client_options=options
    )

    session_name = session_controller_client.session_path(
        project=project_id,
        location=location,
        session=session_id,
    )

    request = dataproc_v1.DeleteSessionRequest(name=session_name)

    print(f"Attempting to delete session: {session_name}")

    try:
        operation = session_controller_client.delete_session(request=request)

        response = operation.result()

        print(f"Session deleted successfully: {response.name}")

    except exceptions.NotFound:
        print(f"Error: Session '{session_name}' not found.")
        print("Please ensure the session ID and location are correct.")
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
        print("Please check your project ID, location, and permissions.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_sessioncontroller_session_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Delete a Dataproc session.")
    parser.add_argument(
        "--project_id", type=str, help="Your Google Cloud project ID.", required=True
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us-central1",
        help="The Google Cloud region where the session is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--session_id", type=str, help="The ID of the session to delete.", required=True
    )

    args = parser.parse_args()

    delete_dataproc_session(
        project_id=args.project_id,
        location=args.location,
        session_id=args.session_id,
    )
