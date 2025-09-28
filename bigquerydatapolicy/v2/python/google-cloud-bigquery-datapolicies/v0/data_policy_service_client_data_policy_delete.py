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
from google.api_core import exceptions as core_exceptions

# [START bigquerydatapolicy_v2_datapolicyservice_datapolicy_delete]
from google.cloud import bigquery_datapolicies_v2


def delete_data_policy_sample(
    project_id: str, location: str, data_policy_id: str
) -> None:
    """Deletes a data policy by its resource name.

    Args:
        project_id: The ID of the Google Cloud project.
        location: The location of the data policy (e.g., "us").
        data_policy_id: The ID of the data policy to delete.
    """
    client = bigquery_datapolicies_v2.DataPolicyServiceClient()

    name = client.data_policy_path(
        project=project_id, location=location, data_policy=data_policy_id
    )

    try:
        client.delete_data_policy(name=name)
        print(f"Successfully deleted data policy: {name}")
    except core_exceptions.NotFound:
        print(f"Data policy '{name}' not found. It may have already been deleted.")
    except Exception as e:
        print(f"Error deleting data policy '{name}': {e}")


# [END bigquerydatapolicy_v2_datapolicyservice_datapolicy_delete]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Deletes a BigQuery data policy by its resource name."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        default="your-project-id",  # Replace with your Google Cloud Project ID
        help="The ID of the Google Cloud project.",
    )
    parser.add_argument(
        "--location",
        type=str,
        default="us",  # Replace with the location of your data policy
        help="The location of the data policy (e.g., 'us').",
    )
    parser.add_argument(
        "--data_policy_id",
        type=str,
        default="your-data-policy-id",  # Replace with the ID of the data policy to delete
        help="The ID of the data policy to delete.",
    )
    args = parser.parse_args()

    delete_data_policy_sample(args.project_id, args.location, args.data_policy_id)
