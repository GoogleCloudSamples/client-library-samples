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


# [START dataproc_v1_sessioncontroller_sessions_list]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def list_dataproc_sessions(
    project_id: str,
    location: str,
) -> None:
    """
    Lists interactive Dataproc sessions in a given project and region.

    This function demonstrates how to retrieve a paginated list of sessions
    using the Dataproc SessionControllerClient.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the sessions are located
                (e.g., "us-central1").
    """

    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )

    client = dataproc_v1.SessionControllerClient(client_options=options)

    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = dataproc_v1.ListSessionsRequest(parent=parent)

        page_result = client.list_sessions(request=request)

        print(f"Listing sessions in project '{project_id}' and region '{location}':")
        session_count = 0
        for session in page_result:
            print(f"  Session Name: {session.name}")
            print(f"  Session UUID: {session.uuid}")
            print(f"  State: {session.state.name}")
            print(f"  Creator: {session.creator}")
            print("  ---")
            session_count += 1

        if session_count == 0:
            print("No sessions found.")
        else:
            print(f"Successfully listed {session_count} session(s).")

    except exceptions.GoogleAPICallError as e:
        print(f"Error listing sessions: {e}")
        print(
            "Please ensure the project ID and region are correct and that the service account has the necessary permissions (e.g., roles/dataproc.viewer)."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dataproc_v1_sessioncontroller_sessions_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Lists Dataproc interactive sessions.")
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        type=str,
        required=True,
        help="The Google Cloud region (e.g., 'us-central1').",
    )
    args = parser.parse_args()

    list_dataproc_sessions(args.project_id, args.location)
