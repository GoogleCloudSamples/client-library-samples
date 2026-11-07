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

# [START servicemanagement_v1_servicemanager_submit_config_source]
import google.api_core.exceptions
from google.cloud import servicemanagement_v1

client = servicemanagement_v1.ServiceManagerClient()


def submit_config_source(service_name: str) -> None:
    """Use the submit_config_source method

    Args:
        service_name: The name of the service (for example, `example.googleapis.com`).
    """
    service_config_yaml = (
        f"type: google.api.Service\n"
        f"config_version: 3\n"
        f"name: {service_name}\n"
        f"title: Example Service\n"
    )

    config_source = servicemanagement_v1.ConfigSource(
        files=[
            servicemanagement_v1.ConfigFile(
                file_path="service.yaml",
                file_contents=service_config_yaml.encode("utf-8"),
                file_type=servicemanagement_v1.ConfigFile.FileType.SERVICE_CONFIG_YAML,
            )
        ]
    )

    request = servicemanagement_v1.SubmitConfigSourceRequest(
        service_name=service_name,
        config_source=config_source,
    )

    try:
        operation = client.submit_config_source(request=request)
        response = operation.result()
        print(f"Submitted service config ID: {response.service_config.id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Request failed: {e}")
# [END servicemanagement_v1_servicemanager_submit_config_source]
