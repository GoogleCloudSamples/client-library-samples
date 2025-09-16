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

# [START retail_v2alpha_projectservice_enrolledsolutions_list]
from google.api_core.exceptions import GoogleAPICallError, NotFound
from google.cloud import retail_v2alpha


def list_enrolled_solutions(
    project_id: str,
) -> None:
    """
    Lists all the retail API solutions the project has enrolled.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = retail_v2alpha.ProjectServiceClient()

    # Construct the full resource name of the parent project.
    parent_name = client.common_project_path(project=project_id)

    # Initialize the request object.
    # The `ListEnrolledSolutionsRequest` requires the parent project name.
    request = retail_v2alpha.ListEnrolledSolutionsRequest(parent=parent_name)

    print(f"Listing enrolled solutions for project: {parent_name}")

    try:
        response = client.list_enrolled_solutions(request=request)

        if response.enrolled_solutions:
            print("Enrolled solutions:")
            for solution in response.enrolled_solutions:
                print(f"- {retail_v2alpha.SolutionType(solution).name}")
        else:
            print("No solutions enrolled for this project.")

    except NotFound as e:
        print(
            f"Error: Project '{project_id}' not found or Retail API not initialized. "
            f"Please ensure the project exists and the Retail API is enabled. Details: {e}"
        )
    except GoogleAPICallError as e:
        print(f"An API error occurred: {e}")


# [END retail_v2alpha_projectservice_enrolledsolutions_list]


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Lists all the retail API solutions the project has enrolled."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )

    args = parser.parse_args()

    list_enrolled_solutions(args.project_id)
