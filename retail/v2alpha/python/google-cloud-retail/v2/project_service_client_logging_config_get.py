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

# [START retail_v2alpha_projectservice_loggingconfig_get]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def get_project_logging_config(
    project_id: str,
) -> None:
    """
    Gets the LoggingConfig of the specified project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = retail_v2alpha.ProjectServiceClient()

    # The full resource name of the LoggingConfig.
    name = client.logging_config_path(project=project_id)

    request = retail_v2alpha.GetLoggingConfigRequest(name=name)

    try:
        response = client.get_logging_config(request=request)
        print("Retrieved LoggingConfig:")
        print(f"  Name: {response.name}")
        print(
            f"  Default Log Generation Rule Level: {response.default_log_generation_rule.logging_level.name}"
        )
        if response.default_log_generation_rule.info_log_sample_rate:
            print(
                f"  Default Log Generation Rule Info Sample Rate: {response.default_log_generation_rule.info_log_sample_rate}"
            )
        if response.service_log_generation_rules:
            print("  Service Log Generation Rules:")
            for rule in response.service_log_generation_rules:
                print(f"    Service Name: {rule.service_name}")
                print(
                    f"      Log Generation Rule Level: {rule.log_generation_rule.logging_level.name}"
                )
                if rule.log_generation_rule.info_log_sample_rate:
                    print(
                        f"      Log Generation Rule Info Sample Rate: {rule.log_generation_rule.info_log_sample_rate}"
                    )

    except exceptions.NotFound as e:
        print(
            f"The LoggingConfig for project {project_id} was not found. "
            "Please ensure the project number is correct and the Retail API is enabled. "
            f"Error: {e}"
        )
    except Exception as e:
        print(
            f"An unexpected error occurred while retrieving LoggingConfig for project {project_id}: {e}"
        )


# [END retail_v2alpha_projectservice_loggingconfig_get]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the LoggingConfig for a Google Cloud Retail project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )

    args = parser.parse_args()

    get_project_logging_config(args.project_id)
