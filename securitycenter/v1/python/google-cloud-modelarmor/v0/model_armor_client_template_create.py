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

# [START securitycenter_v1_modelarmor_template_create]
from google.api_core import exceptions
from google.api_core.client_options import ClientOptions
from google.cloud import modelarmor_v1 as modelarmor


def create_template(
    project_id: str,
    location: str,
    template_id: str,
) -> None:
    """
    Creates a new ModelArmor template in a given project and location.

    A ModelArmor template defines a set of content filters (e.g., Responsible AI,
    Sensitive Data Protection) that can be applied to user prompts or model responses.
    This sample demonstrates creating a template with basic Responsible AI filters.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g., "us-central1").
        template_id: The unique ID for the template to create.
            The template_id must be unique within the project and location, and
            must comply with RFC 1035 (lowercase letters, numbers, and hyphens,
            starting with a letter, and 63 characters max).
    """
    # Create the client, pointing to the location's API endpoint
    client = modelarmor.ModelArmorClient(
        transport="rest",
        client_options=ClientOptions(
            api_endpoint=f"modelarmor.{location}.rep.googleapis.com"
        ),
    )
    parent = f"projects/{project_id}/locations/{location}"

    # Configure a simple Responsible AI (RAI) filter for the template.
    rai_filter = modelarmor.types.RaiFilterSettings.RaiFilter(
        filter_type=modelarmor.types.RaiFilterType.SEXUALLY_EXPLICIT,
        confidence_level=modelarmor.types.DetectionConfidenceLevel.LOW_AND_ABOVE,
    )

    template = modelarmor.types.Template(
        filter_config=modelarmor.types.FilterConfig(
            rai_settings=modelarmor.types.RaiFilterSettings(rai_filters=[rai_filter])
        )
    )

    try:
        request = modelarmor.types.CreateTemplateRequest(
            parent=parent,
            template_id=template_id,
            template=template,
        )

        response = client.create_template(request=request)

        print(f"Successfully created ModelArmor template: {response.name}")
        print(f"Template filter config: {response.filter_config}")

    except exceptions.AlreadyExists as e:
        print(f"Error: Template '{template_id}' already exists under '{parent}'.")
        print(
            f"Please use a different template_id or consider updating the existing template."
        )
        print(f"Details: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END securitycenter_v1_modelarmor_template_create]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Creates a new ModelArmor template.")

    parser.add_argument(
        "--project_id",
        required=True,
        type=str,
        help="Your Google Cloud project ID.",
    )
    parser.add_argument(
        "--location",
        required=True,
        type=str,
        help="The Google Cloud location for the template (e.g.,  'us-central1').",
    )
    parser.add_argument(
        "--template_id",
        required=True,
        type=str,
        help="A unique ID for the template to create.",
    )

    args = parser.parse_args()

    create_template(
        project_id=args.project_id,
        location=args.location,
        template_id=args.template_id,
    )
