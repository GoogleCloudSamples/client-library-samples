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

# [START eventarc_v1_eventarc_googlechannelconfig_get]
from google.api_core import exceptions as core_exceptions
from google.cloud import eventarc_v1


def get_google_channel_config(
    project_id: str,
    location: str,
) -> None:
    """
    Retrieves the GoogleChannelConfig for a given project and location.

    The GoogleChannelConfig stores custom settings respected by Eventarc first-party
    triggers in the matching region. Once configured, first-party event data will
    be protected using the specified custom managed encryption key instead of
    Google-managed encryption keys.

    Args:
        project_id: The Google Cloud project ID.
        location: The location of the GoogleChannelConfig (e.g., "us-central1").
    """
    client = eventarc_v1.EventarcClient()

    name = client.google_channel_config_path(project_id, location)

    request = eventarc_v1.GetGoogleChannelConfigRequest(name=name)

    try:
        response = client.get_google_channel_config(request=request)
        print(f"Retrieved GoogleChannelConfig: {response.name}")
        print(f"  Update time: {response.update_time}")
        if response.crypto_key_name:
            print(f"  Crypto Key Name: {response.crypto_key_name}")
        else:
            print("  No custom crypto key configured.")

    except core_exceptions.NotFound:
        print(f"GoogleChannelConfig for {name} not found.")
        print("Please ensure that Eventarc is enabled in this project and location.")
    except Exception as e:
        print(f"Error getting GoogleChannelConfig: {e}")


# [END eventarc_v1_eventarc_googlechannelconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves the GoogleChannelConfig for a given project and location."
    )
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
        help="The location of the GoogleChannelConfig (e.g., 'us-central1').",
    )
    args = parser.parse_args()
    get_google_channel_config(args.project_id, args.location)
