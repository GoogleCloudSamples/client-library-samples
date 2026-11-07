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

# [START translate_v3_translationservice_adaptivemtdataset_create]
import google.api_core.exceptions
from google.cloud import translate_v3


def create_adaptive_mt_dataset(project_number_or_id: str, location_id: str) -> None:
    """Creates an Adaptive MT dataset.

    Args:
        project_number_or_id: The Google Cloud project ID or number.
        location_id: The Google Cloud region where the service is located.
    """
    client = translate_v3.TranslationServiceClient()

    parent = f"projects/{project_number_or_id}/locations/{location_id}"
    adaptive_mt_dataset = translate_v3.AdaptiveMtDataset(
        name=f"{parent}/adaptiveMtDatasets/example_adaptive_mt_dataset",
        display_name="example_adaptive_mt_dataset",
        source_language_code="en",
        target_language_code="es",
    )

    try:
        response = client.create_adaptive_mt_dataset(
            parent=parent,
            adaptive_mt_dataset=adaptive_mt_dataset,
        )
        print(f"Created Adaptive MT dataset: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error creating dataset: {error}")
# [END translate_v3_translationservice_adaptivemtdataset_create]
