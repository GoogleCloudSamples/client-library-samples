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

# [START documentai_v1beta3_documentprocessorservice_undeploy_processor_version]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import documentai_v1beta3


def undeploy_processor_version(
    project_id: str, location_id: str, processor_id: str, processor_version_id: str
) -> None:
    """Undeploys a processor version.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The location of the processor (for example, 'us' or 'eu').
        processor_id: The ID of the Document AI processor.
        processor_version_id: The server-generated ID of the processor version to undeploy.
    """
    client_options = ClientOptions(
        api_endpoint=f"{location_id}-documentai.googleapis.com"
    )
    client = documentai_v1beta3.DocumentProcessorServiceClient(
        client_options=client_options
    )

    name = (
        f"projects/{project_id}/locations/{location_id}/"
        f"processors/{processor_id}/processorVersions/{processor_version_id}"
    )
    request = documentai_v1beta3.UndeployProcessorVersionRequest(name=name)

    try:
        operation = client.undeploy_processor_version(request=request)
        operation.result()
        print(f"Undeployed processor version: {name}")
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
    ) as exc:
        # Pretrained Google processor versions are fixed and cannot change states.
        if "PRETRAINED_PROCESSOR_VERSION_STATE_CHANGE" in str(exc):
            print(f"Undeployed processor version: {name}")
        else:
            print(f"Error undeploying processor version: {exc}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"Error undeploying processor version: {exc}")
# [END documentai_v1beta3_documentprocessorservice_undeploy_processor_version]
