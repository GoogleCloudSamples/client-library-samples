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

# [START dlp_v2_dlpservice_inspecttemplate_delete]
from google.cloud import dlp_v2
from google.api_core.exceptions import NotFound


def delete_inspect_template(
    project_id: str, location: str, template_id: str
) -> None:
    """Deletes an InspectTemplate.

    Args:
        project_id: The Google Cloud project ID.
        location: The Google Cloud location (e.g. 'us-central1').
        template_id: The ID of the inspect template to delete.
    """
    client = dlp_v2.DlpServiceClient()

    template_name = (
        f"projects/{project_id}/locations/{location}/inspectTemplates/{template_id}"
    )

    try:
        client.delete_inspect_template(name=template_name)
        print(f"Successfully deleted inspect template: {template_name}")
    except NotFound:
        print(
            f"Inspect template '{template_name}' not found. It may have already been deleted."
        )
    except Exception as e:
        print(f"Error deleting inspect template {template_name}: {e}")


# [END dlp_v2_dlpservice_inspecttemplate_delete]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deletes an InspectTemplate.")
    parser.add_argument(
        "--project_id", required=True, type=str, help="The Google Cloud project ID."
    )
    parser.add_argument(
        "--location", required=True, type=str, help="The Google Cloud  location."
    )
    parser.add_argument(
        "--template_id",
        required=True,
        type=str,
        help="The ID of the inspect template to delete.",
    )
    args = parser.parse_args()

    delete_inspect_template(args.project_id, args.location, args.template_id)
