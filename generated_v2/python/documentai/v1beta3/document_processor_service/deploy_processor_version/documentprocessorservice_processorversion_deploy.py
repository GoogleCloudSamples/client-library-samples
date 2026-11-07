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

# [START documentai_v1beta3_documentprocessorservice_deploy_processor_version]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import documentai_v1beta3


def deploy_processor_version(
    project_id: str,
    location_id: str,
    processor_id: str,
    processor_version_id: str,
) -> None:
    """Deploys a processor version.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the processor (for example, 'us' or 'eu').
        processor_id: The server-generated ID of the processor.
        processor_version_id: The server-generated ID of the processor version to deploy.
    """
    client_options = ClientOptions(
        api_endpoint=f"{location_id}-documentai.googleapis.com"
    )
    client = documentai_v1beta3.DocumentProcessorServiceClient(
        client_options=client_options
    )

    name = client.processor_version_path(
        project_id, location_id, processor_id, processor_version_id
    )

    request = documentai_v1beta3.DeployProcessorVersionRequest(name=name)

    try:
        operation = client.deploy_processor_version(request=request)
        operation.result()
        print(f"Processor version deployed successfully: {name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
    ) as error:
        if "DEPLOYED" in str(error) or "DEPLOYING" in str(error):
            print(f"Processor version deployed successfully: {name}")
        else:
            raise
# [END documentai_v1beta3_documentprocessorservice_deploy_processor_version]
