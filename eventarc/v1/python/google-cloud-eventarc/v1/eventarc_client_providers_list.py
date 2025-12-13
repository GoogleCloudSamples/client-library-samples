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

# [START eventarc_v1_eventarc_providers_list]
from google.api_core import exceptions
from google.cloud import eventarc_v1


def list_eventarc_providers(
    project_id: str,
    location: str,
) -> None:
    """
    Lists all Eventarc providers available in a given project and location.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud region (e.g., "us-central1").
    """
    client = eventarc_v1.EventarcClient()

    parent = f"projects/{project_id}/locations/{location}"

    try:
        request = eventarc_v1.ListProvidersRequest(parent=parent)

        page_result = client.list_providers(request=request)

        for provider in page_result:
            print(f"- Provider Name: {provider.name}")
            print(f"  Display Name: {provider.display_name}")
            print(f"  Event Types Count: {len(provider.event_types)}")
            for i, event_type in enumerate(provider.event_types):
                if i >= 2:  # Limit to 2 event types for brevity
                    print(
                        f"  ... (and {len(provider.event_types) - i} more event types)\n"
                    )
                    break
                print(f"  - Event Type Code: {event_type.type}")
                print(f"    Description: {event_type.description}")

    except exceptions.NotFound:
        print(
            f"No providers found or location '{location}' does not exist for project '{project_id}'."
        )
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END eventarc_v1_eventarc_providers_list]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists Eventarc providers in a specified project and location."
    )
    parser.add_argument(
        "--project_id",
        help="Your Google Cloud project ID.",
        required=True,
    )
    parser.add_argument(
        "--location",
        help="The Google Cloud region (e.g., 'us-central1').",
        required=True,
    )
    args = parser.parse_args()

    list_eventarc_providers(args.project_id, args.location)
