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

# [START webrisk_v1_webriskservice_submission_create]
import google.api_core.exceptions
from google.cloud import webrisk_v1

client = webrisk_v1.WebRiskServiceClient()


def create_submission(project_id: str) -> None:
    """Submits a URI suspected of containing malicious content to Web Risk.

    Args:
        project_id: The Google Cloud project identifier.
    """
    parent = f"projects/{project_id}"
    submission = webrisk_v1.Submission(
        uri="http://testsafebrowsing.appspot.com/s/phishing.html"
    )

    try:
        response = client.create_submission(
            parent=parent,
            submission=submission,
        )
        print(f"Created submission for URI: {response.uri}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Submission failed: {error.message}")
# [END webrisk_v1_webriskservice_submission_create]
