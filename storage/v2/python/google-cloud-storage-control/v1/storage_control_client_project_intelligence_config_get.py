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

# [START storage_v2_storagecontrol_projectintelligenceconfig_get]
from google.api_core.exceptions import NotFound
from google.cloud import storage_control_v2


def get_project_intelligence_config(
    project_id: str,
) -> None:
    """
    Retrieves the project-scoped singleton IntelligenceConfig resource.

    This resource provides configuration for Storage Intelligence features
    at the project level.

    Args:
        project_id: The ID of the Google Cloud project.
    """
    client = storage_control_v2.StorageControlClient()

    # Construct the full resource name for the project-scoped IntelligenceConfig.
    name = f"projects/{project_id}/locations/global/intelligenceConfig"

    try:
        intelligence_config = client.get_project_intelligence_config(name=name)

        print(f"Successfully retrieved IntelligenceConfig for project: {project_id}")
        print(f"Name: {intelligence_config.name}")
        print(f"Edition Config: {intelligence_config.edition_config.name}")
        print(f"Update Time: {intelligence_config.update_time}")
        if intelligence_config.effective_intelligence_config:
            print(
                f"Effective Edition: {intelligence_config.effective_intelligence_config.effective_edition.name}"
            )
            print(
                f"Effective Intelligence Config Resource: {intelligence_config.effective_intelligence_config.intelligence_config}"
            )

    except NotFound:
        print(
            f"IntelligenceConfig not found for project: {project_id}. It might not be configured yet."
        )
    except Exception as e:
        print(f"Error retrieving IntelligenceConfig: {e}")


# [END storage_v2_storagecontrol_projectintelligenceconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the project-scoped IntelligenceConfig."
    )
    parser.add_argument("--project_id", required=True, help="The ID of the Google Cloud project.")
    args = parser.parse_args()
    get_project_intelligence_config(args.project_id)
