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

# [START dlp_v2_dlpservice_inspect_content]
import google.api_core.exceptions
from google.cloud import dlp_v2

client = dlp_v2.DlpServiceClient()


def inspect_content(project_id: str) -> None:
    """Inspects content for sensitive data.

    Args:
        project_id: The Google Cloud project ID to run the inspection request under.
    """
    parent = f"projects/{project_id}"
    item = dlp_v2.ContentItem(
        value="My phone number is 206-555-0123 and email is user@example.com"
    )
    inspect_config = dlp_v2.InspectConfig(
        info_types=[
            dlp_v2.InfoType(name="PHONE_NUMBER"),
            dlp_v2.InfoType(name="EMAIL_ADDRESS"),
        ],
        min_likelihood=dlp_v2.Likelihood.POSSIBLE,
        include_quote=True,
    )

    try:
        response = client.inspect_content(
            request={
                "parent": parent,
                "inspect_config": inspect_config,
                "item": item,
            }
        )

        findings = response.result.findings
        if not findings:
            print("No findings identified.")
        for finding in findings:
            print(f"Quote: {finding.quote}")
            print(f"Info type: {finding.info_type.name}")
            print(f"Likelihood: {finding.likelihood.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to inspect content: {error}")


# [END dlp_v2_dlpservice_inspect_content]
