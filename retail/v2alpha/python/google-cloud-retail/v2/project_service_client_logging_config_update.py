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

# [START retail_v2alpha_projectservice_loggingconfig_update]
from google.api_core import exceptions
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def update_logging_config(
    project_id: str,
) -> None:
    """
    Updates the LoggingConfig of the requested project.

    Args:
        project_number: The Google Cloud project number.
    """
    client = retail_v2alpha.ProjectServiceClient()

    # The LoggingConfig resource name.
    name = f"projects/{project_id}/loggingConfig"

    # Construct the LoggingConfig object with the desired updates.
    # Here, we update the default_log_generation_rule to LOG_ALL.
    logging_config = retail_v2alpha.LoggingConfig(
        name=name,
        default_log_generation_rule=retail_v2alpha.LoggingConfig.LogGenerationRule(
            logging_level=retail_v2alpha.LoggingConfig.LoggingLevel.LOG_ALL
        ),
    )

    # Create a FieldMask to specify which fields to update.
    # Only 'default_log_generation_rule' is supported for this example.
    update_mask = field_mask_pb2.FieldMask(paths=["default_log_generation_rule"])

    request = retail_v2alpha.UpdateLoggingConfigRequest(
        logging_config=logging_config,
        update_mask=update_mask,
    )

    print(f"Updating logging config for project {project_id}...")

    try:
        response = client.update_logging_config(request=request)
        print("Updated logging config:")
        print(f"  Name: {response.name}")
        print(
            "  Default Log Generation Rule Level: "
            f"{retail_v2alpha.LoggingConfig.LoggingLevel(response.default_log_generation_rule.logging_level).name}"
        )
    except exceptions.NotFound as e:
        print(f"Error: Logging config not found for project {project_id}. {e}")
        print("Please ensure the project number is correct and Retail API is enabled.")
    except exceptions.InvalidArgument as e:
        print(f"Error: Invalid argument provided for logging config update. {e}")
        print("Please check the provided logging_config and update_mask.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_projectservice_loggingconfig_update]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Updates the LoggingConfig for a Retail project."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )

    args = parser.parse_args()

    update_logging_config(args.project_id)
