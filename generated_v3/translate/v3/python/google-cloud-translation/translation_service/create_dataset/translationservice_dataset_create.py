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

# [START translate_v3_translationservice_dataset_create]
import os

import google.api_core.exceptions
from google.cloud import translate_v3


def create_dataset() -> None:
    """Creates a dataset for translation models."""
    client = translate_v3.TranslationServiceClient()

    project_id = os.environ.get("GOOGLE_CLOUD_PROJECT", "example-project-id")
    location = "us-central1"
    parent = f"projects/{project_id}/locations/{location}"

    dataset = translate_v3.Dataset(
        display_name="example_dataset",
        source_language_code="en",
        target_language_code="es",
    )

    try:
        operation = client.create_dataset(parent=parent, dataset=dataset)
        response = operation.result()
        print(f"Created dataset: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create dataset: {error}")
# [END translate_v3_translationservice_dataset_create]
