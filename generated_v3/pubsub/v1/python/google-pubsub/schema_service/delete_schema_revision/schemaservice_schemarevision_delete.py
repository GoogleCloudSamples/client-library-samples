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

# [START pubsub_v1_schemaservice_schemarevision_delete]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SchemaServiceClient()


def delete_schema_revision(project_id: str, schema_id: str, revision_id: str) -> None:
    """Use the delete_schema_revision method

    Args:
        project_id: The Google Cloud project ID.
        schema_id: The ID of the Pub/Sub schema whose revision is to be deleted.
        revision_id: The server-generated revision ID of the schema revision to delete.
    """
    name = f"projects/{project_id}/schemas/{schema_id}@{revision_id}"

    try:
        response = client.delete_schema_revision(name=name)
        print(f"Deleted schema revision: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to delete schema revision: {error}")
# [END pubsub_v1_schemaservice_schemarevision_delete]
