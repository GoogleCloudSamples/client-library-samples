# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START cloudasset_v1_assetservice_analyze_iam_policy]
import google.api_core.exceptions
from google.cloud import asset_v1


def analyze_iam_policy(project_id: str) -> None:
    """Analyzes IAM policies for a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID to scope the IAM policy analysis.
    """
    client = asset_v1.AssetServiceClient()

    analysis_query = asset_v1.IamPolicyAnalysisQuery(
        scope=f"projects/{project_id}",
        resource_selector=asset_v1.IamPolicyAnalysisQuery.ResourceSelector(
            full_resource_name=f"//cloudresourcemanager.googleapis.com/projects/{project_id}"
        ),
    )

    request = asset_v1.AnalyzeIamPolicyRequest(
        analysis_query=analysis_query,
    )

    try:
        response = client.analyze_iam_policy(request=request)
        print(f"Analysis completed. Fully explored: {response.main_analysis.fully_explored}")
        print(f"Results count: {len(response.main_analysis.analysis_results)}")
        for result in response.main_analysis.analysis_results:
            print(f"Attached resource: {result.attached_resource_full_name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"IAM policy analysis failed: {error}")
# [END cloudasset_v1_assetservice_analyze_iam_policy]
