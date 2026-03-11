# Copyright 2026 Google LLC
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

# [START bigquerydatapolicy_v2_datapolicyservice_grantees_remove]
from google.api_core import exceptions
from google.cloud import bigquery_datapolicies_v2

client = bigquery_datapolicies_v2.DataPolicyServiceClient()


def remove_grantees(
    project_id: str,
    location: str,
    data_policy_id: str,
    grantees: list[str],
) -> None:
    """Remove grantees from a data policy.
    Removes IAM principals (grantees) from an existing data policy, revoking
    their fine-grained access to the governed data.

    Args:
        project_id: The Google Cloud project ID.
        location: The geographic location of the data policy (for example, 'us').
        data_policy_id: The ID of the data policy from which grantees will be removed.
        grantees: A list of IAM principals to be removed (for example, ['user:example@gmail.com']).
    """

    data_policy_name = client.data_policy_path(
        project=project_id,
        location=location,
        data_policy=data_policy_id,
    )

    try:
        response = client.remove_grantees(
            data_policy=data_policy_name,
            grantees=grantees,
        )

        print(f"Successfully removed grantees from data policy: {response.name}")
        print(f"Updated Grantees List: {', '.join(response.grantees)}")

    except exceptions.NotFound:
        print(f"Error: Data policy '{data_policy_name}' not found.")
    except exceptions.GoogleAPIError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END bigquerydatapolicy_v2_datapolicyservice_grantees_remove]
