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

# [START dataproc_v1_sessioncontroller_session_get]
from google.api_core import client_options, exceptions
from google.cloud import dataproc_v1


def get_dataproc_session(project_id: str, location: str, session_id: str) -> None:
    """Retrieves the details of a Dataproc session.

    Dataproc sessions provide an interactive environment for data processing
    workloads. Retrieving session details is crucial for monitoring, managing,
    and debugging these interactive environments.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region where the session is located (e.g., 'us-central1').
        session_id: The ID of the Dataproc session to retrieve.
    """
    options = client_options.ClientOptions(
        api_endpoint=f"{location}-dataproc.googleapis.com:443"
    )
    client = dataproc_v1.SessionControllerClient(client_options=options)

    session_name = client.session_path(project_id, location, session_id)

    try:
        request = dataproc_v1.GetSessionRequest(name=session_name)

        session = client.get_session(request=request)

        print(f"Successfully retrieved session: {session.name}")
        print(f"  UUID: {session.uuid}")
        print(f"  State: {session.state.name}")
        print(f"  Creator: {session.creator}")
        if session.runtime_info.endpoints:
            print("  Endpoints:")
            for key, value in session.runtime_info.endpoints.items():
                print(f"    {key}: {value}")
        if session.state_message:
            print(f"  State Message: {session.state_message}")

    except exceptions.NotFound:
        print(f"Error: Session '{session_name}' not found.")
        print("Please check the project ID, region, and session ID.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Please ensure you have the necessary permissions and the Dataproc API is enabled."
        )


# [END dataproc_v1_sessioncontroller_session_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves the details of a Dataproc session."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location",
        required=True,
        help="The Google Cloud region where the session is located (e.g., 'us-central1').",
    )
    parser.add_argument(
        "--session_id",
        required=True,
        help="The ID of the Dataproc session to retrieve."
    )
    args = parser.parse_args()

    get_dataproc_session(args.project_id, args.location, args.session_id)
