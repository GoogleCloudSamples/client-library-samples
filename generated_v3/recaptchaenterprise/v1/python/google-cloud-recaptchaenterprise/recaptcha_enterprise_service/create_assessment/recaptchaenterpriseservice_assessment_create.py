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

# [START recaptchaenterprise_v1_recaptchaenterpriseservice_assessment_create]
import google.api_core.exceptions
from google.cloud import recaptchaenterprise_v1


def create_assessment(project_id: str) -> None:
    """Creates an assessment to analyze the risk of an event.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()
    parent = f"projects/{project_id}"

    try:
        # Obtain a valid site key from the project or create one if none exists.
        site_key = "example-site-key"
        for key in client.list_keys(parent=parent):
            site_key = key.name.rsplit("/", 1)[-1]
            break
        else:
            created_key = client.create_key(
                parent=parent,
                key=recaptchaenterprise_v1.Key(
                    display_name="example-key",
                    web_settings=recaptchaenterprise_v1.WebSettings(
                        integration_type=recaptchaenterprise_v1.WebSettings.IntegrationType.SCORE,
                        allowed_domains=["localhost"],
                    ),
                ),
            )
            site_key = created_key.name.rsplit("/", 1)[-1]

        assessment = recaptchaenterprise_v1.Assessment(
            event=recaptchaenterprise_v1.Event(
                site_key=site_key,
                token="example-token",
            )
        )

        response = client.create_assessment(
            parent=parent,
            assessment=assessment,
        )
        print(f"Assessment created: {response.name}")
        print(f"Risk score: {response.risk_analysis.score}")
        print(f"Token valid: {response.token_properties.valid}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create assessment: {error}")


# [END recaptchaenterprise_v1_recaptchaenterpriseservice_assessment_create]
