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

# [START notebooks_v1_managednotebookservice_runtime_create]
import google.api_core.exceptions
from google.cloud import notebooks_v1


def create_runtime(project_id: str, location_id: str, runtime_id: str) -> None:
    """Creates a managed notebook runtime.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        runtime_id: The ID of the runtime (for example, 'example-runtime-id').
    """
    client = notebooks_v1.ManagedNotebookServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    access_config = notebooks_v1.RuntimeAccessConfig(
        access_type=notebooks_v1.RuntimeAccessConfig.RuntimeAccessType.SINGLE_USER,
        runtime_owner="example-user@example.com",
    )
    vm_config = notebooks_v1.VirtualMachineConfig(
        zone=f"{location_id}-a",
        machine_type="n1-standard-4",
    )
    virtual_machine = notebooks_v1.VirtualMachine(
        virtual_machine_config=vm_config,
    )

    runtime = notebooks_v1.Runtime(
        access_config=access_config,
        virtual_machine=virtual_machine,
    )

    try:
        operation = client.create_runtime(
            parent=parent,
            runtime_id=runtime_id,
            runtime=runtime,
        )
        response = operation.result()
        print(f"Created runtime: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Runtime '{runtime_id}' already exists in '{parent}'.")
    except google.api_core.exceptions.FailedPrecondition:
        print(
            "The Notebooks v1 API has reached end-of-life. Migrate to "
            "Vertex AI Workbench Instances."
        )
# [END notebooks_v1_managednotebookservice_runtime_create]
