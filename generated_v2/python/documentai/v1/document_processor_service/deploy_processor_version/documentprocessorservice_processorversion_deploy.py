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

# [START documentai_v1_documentprocessorservice_deploy_processor_version]
import google.api_core.exceptions
from google.cloud import documentai_v1


def deploy_processor_version(
    project_id: str,
    location_id: str,
    processor_id: str,
    processor_version_id: str,
) -> None:
    """Deploys a Document AI processor version.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The processor location (for example, 'us' or 'eu').
        processor_id: The ID of an existing processor.
        processor_version_id: The ID of the processor version to deploy.
    """
    client = documentai_v1.DocumentProcessorServiceClient(
        client_options={"api_endpoint": f"{location_id}-documentai.googleapis.com"}
    )

    name = client.processor_version_path(
        project_id, location_id, processor_id, processor_version_id
    )

    request = documentai_v1.DeployProcessorVersionRequest(
        name=name,
    )

    try:
        operation = client.deploy_processor_version(request=request)
        operation.result()
        print(f"Deployed processor version: {name}")
    except google.api_core.exceptions.FailedPrecondition as error:
        if "DEPLOYED" in str(error):
            print(f"Deployed processor version: {name}")
        else:
            print(f"Deployment operation failed: {error.message}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Deployment operation failed: {error.message}")
# [END documentai_v1_documentprocessorservice_deploy_processor_version]
