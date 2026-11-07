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

# [START servicedirectory_v1beta1_registrationservice_namespace_update]
import os

import google.api_core.exceptions
from google.cloud import servicedirectory_v1beta1
from google.protobuf import field_mask_pb2


def update_namespace() -> None:
    """Update a Service Directory namespace."""
    client = servicedirectory_v1beta1.RegistrationServiceClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT") or os.environ.get(
        "PROJECT_ID", "example-project-id"
    )
    location_id = os.environ.get("LOCATION_ID", "us-central1")
    namespace_id = os.environ.get(
        "NAMESPACE_ID"
    ) or os.environ.get("SERVICE_DIRECTORY_NAMESPACE", "example-namespace-id")

    namespace_name = client.namespace_path(project_id, location_id, namespace_id)

    namespace = servicedirectory_v1beta1.Namespace(
        name=namespace_name,
        labels={"environment": "production"},
    )
    update_mask = field_mask_pb2.FieldMask(paths=["labels"])

    try:
        response = client.update_namespace(
            namespace=namespace,
            update_mask=update_mask,
        )
        print(f"Updated namespace: {response.name}")
        print(f"Labels: {response.labels}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API request failed: {error}")
# [END servicedirectory_v1beta1_registrationservice_namespace_update]
