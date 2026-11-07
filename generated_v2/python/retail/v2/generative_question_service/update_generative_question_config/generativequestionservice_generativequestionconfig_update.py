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

# [START retail_update_generative_question_config]
from google.api_core import exceptions
from google.cloud import retail_v2
from google.protobuf import field_mask_pb2


def update_generative_question_config(
    project_id: str, location_id: str, catalog_id: str
) -> None:
    """Updates the generative question configuration for a catalog facet.

    Args:
        project_id: The Google Cloud project ID hosting the Retail catalog.
        location_id: The location ID for the catalog, such as 'global'.
        catalog_id: The Retail catalog ID, such as 'default_catalog'.
    """
    client_options = (
        {"api_endpoint": f"{location_id}-retail.googleapis.com"}
        if location_id != "global"
        else None
    )
    client = retail_v2.GenerativeQuestionServiceClient(
        client_options=client_options
    )

    catalog_path = (
        f"projects/{project_id}/locations/{location_id}/catalogs/{catalog_id}"
    )

    generative_question_config = retail_v2.GenerativeQuestionConfig(
        catalog=catalog_path,
        facet="brand",
        allowed_in_conversation=True,
    )
    update_mask = field_mask_pb2.FieldMask(paths=["allowed_in_conversation"])

    request = retail_v2.UpdateGenerativeQuestionConfigRequest(
        generative_question_config=generative_question_config,
        update_mask=update_mask,
    )

    try:
        response = client.update_generative_question_config(request=request)
        print(f"Updated configuration for facet: {response.facet}")
        print(f"Allowed in conversation: {response.allowed_in_conversation}")
    except exceptions.FailedPrecondition as exc:
        print(
            "Retail data use terms must be accepted in the Google Cloud console: "
            f"{exc.message}"
        )
    except (
        exceptions.InvalidArgument,
        exceptions.NotFound,
        exceptions.PermissionDenied,
    ) as exc:
        print(f"API request could not be completed: {exc.message}")


# [END retail_update_generative_question_config]
