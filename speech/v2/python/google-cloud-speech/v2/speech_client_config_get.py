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

# [START speech_v2_speech_config_get]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import speech_v2


def get_speech_config(project_id: str) -> None:
    """
    Retrieves the Speech-to-Text API configuration for a given project.

    This sample demonstrates how to fetch the global configuration, which includes
    settings like the KMS key used for encryption.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = speech_v2.SpeechClient()

    # Construct the full resource name for the config.
    # For Speech-to-Text V2, the config is a global resource within a project.
    name = client.config_path(project=project_id, location="global")

    try:
        config = client.get_config(name=name)

        print(f"Config Name: {config.name}")
        if config.kms_key_name:
            print(f"KMS Key Name: {config.kms_key_name}")
        if config.update_time:
            print(f"Last Updated: {config.update_time.isoformat()}")

    except NotFound:
        print(
            f"Error: The Speech-to-Text configuration for '{name}' was not found. "
            "Please ensure the project ID is correct and that the Speech-to-Text API is enabled."
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
        print(
            "Please check your project ID,  and ensure your account has the necessary permissions."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        print(
            "Please review the error message and consult the documentation for further troubleshooting."
        )


# [END speech_v2_speech_config_get]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieves the Speech-to-Text API configuration."
    )
    parser.add_argument(
        "--project_id", type=str, required=True, help="The Google Cloud project ID."
    )

    args = parser.parse_args()

    get_speech_config(args.project_id)
