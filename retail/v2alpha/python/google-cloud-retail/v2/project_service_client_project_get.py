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

# [START retail_v2alpha_get_project]
from google.api_core import exceptions
from google.cloud import retail_v2alpha


def get_retail_project(project_id: str) -> None:
    """
    Gets the project-level configuration for the Retail API.

    This method retrieves metadata that describes a Cloud Retail Project, including
    which Retail API solutions (e.g., Search, Recommendations) are currently
    enrolled for the given project.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = retail_v2alpha.ProjectServiceClient()

    # The resource name of the project.
    name = client.retail_project_path(project=project_id)

    request = retail_v2alpha.GetProjectRequest(name=name)

    try:
        response = client.get_project(request=request)
        print(f"Retrieved Retail Project: {response.name}")
        print("Enrolled Solutions:")
        for solution in response.enrolled_solutions:
            print(f"- {retail_v2alpha.SolutionType(solution).name}")
    except exceptions.NotFound as e:
        print(
            f"Error: Retail project '{name}' not found or not initialized for Retail API.\n"
            "Please ensure the Retail API is enabled for your project and that the project "
            "has been initialized for Retail services (e.g., by enrolling a solution)."
        )
        print(f"Details: {e}")
    except exceptions.GoogleAPICallError as e:
        print(f"An API error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


# [END retail_v2alpha_get_project]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Get the Retail project configuration."
    )
    parser.add_argument(
        "--project_id",
        type=str,
        required=True,
        help="The Google Cloud project ID.",
    )

    args = parser.parse_args()

    get_retail_project(args.project_id)
