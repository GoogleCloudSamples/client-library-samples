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

# [START dlp_v2_dlpservice_inspecttemplate_get]
from google.cloud import dlp_v2
from google.api_core.exceptions import NotFound


def get_inspect_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Gets an existing InspectTemplate.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location (region) of the template.
            Can be "global", "us-central1", etc.
        template_id: The ID of the inspect template to retrieve.
    """
    client = dlp_v2.DlpServiceClient()

    name = f"projects/{project_id}/locations/{location}/inspectTemplates/{template_id}"

    try:
        inspect_template = client.get_inspect_template(name=name)

        print(f"Inspect template: {inspect_template.name}")
        print(f"Display Name: {inspect_template.display_name}")
        print(f"Description: {inspect_template.description}")
        if inspect_template.inspect_config:
            print("Inspect Config:")
            print(
                f"  Min Likelihood: {inspect_template.inspect_config.min_likelihood.name}"
            )
            if inspect_template.inspect_config.info_types:
                info_types = ", ".join(
                    [it.name for it in inspect_template.inspect_config.info_types]
                )
                print(f"  Info Types: {info_types}")

    except NotFound:
        print(f"Error: Inspect template '{template_id}' not found at '{name}'.")
        print(
            "Please ensure the template ID and location are correct and the template exists."
        )
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END dlp_v2_dlpservice_inspecttemplate_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Retrieve an existing DLP Inspect Template."
    )
    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="The Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The geographic location of the template (e.g., 'global', 'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        required=True,
        type=str,
        help="The ID of the inspect template to retrieve.",
    )
    args = parser.parse_args()

    get_inspect_template(
        args.project_id,
        args.location,
        args.template_id,
    )
