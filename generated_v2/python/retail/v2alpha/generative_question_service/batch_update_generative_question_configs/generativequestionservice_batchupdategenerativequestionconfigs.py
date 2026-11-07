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

# [START retail_v2alpha_generativequestionservice_generativequestionconfigs_batchupdate]
from google.api_core.client_options import ClientOptions
from google.api_core.exceptions import FailedPrecondition, GoogleAPICallError
from google.cloud import retail_v2alpha
from google.protobuf import field_mask_pb2


def batch_update_generative_question_configs(
    project_id: str, location_id: str, catalog_id: str
) -> None:
    """Updates generative question configurations in batch.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The geographic location for the catalog, typically 'global'.
        catalog_id: The Retail catalog ID, such as 'default_catalog'.
    """
    client_options = (
        ClientOptions(api_endpoint=f"{location_id}-retail.googleapis.com")
        if location_id != "global"
        else None
    )
    client = retail_v2alpha.GenerativeQuestionServiceClient(
        client_options=client_options
    )

    parent = f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"

    config = retail_v2alpha.GenerativeQuestionConfig(
        catalog=parent,
        facet="brand",
        allowed_in_conversation=True,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["allowed_in_conversation"])

    requests = [
        retail_v2alpha.UpdateGenerativeQuestionConfigRequest(
            generative_question_config=config,
            update_mask=update_mask,
        )
    ]

    try:
        response = client.batch_update_generative_question_configs(
            parent=parent,
            requests=requests,
        )
        print(
            f"Updated {len(response.generative_question_configs)} generative question configurations."
        )
        for updated_config in response.generative_question_configs:
            print(
                f"Facet: {updated_config.facet}, Allowed in conversation: {updated_config.allowed_in_conversation}"
            )
    except FailedPrecondition as exc:
        print(
            f"Retail activation required to update generative question configs: {exc.message}"
        )
    except GoogleAPICallError as exc:
        print(
            f"API call issue during generative question configs update: {exc.message}"
        )


# [END retail_v2alpha_generativequestionservice_generativequestionconfigs_batchupdate]
