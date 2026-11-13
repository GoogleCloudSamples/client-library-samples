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

# [START pubsub_v1_schemaservice_schemarevisions_list]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SchemaServiceClient()


def list_schema_revisions(project_id: str, schema_id: str) -> None:
    """Use the list_schema_revisions method

    Args:
        project_id: The Google Cloud project ID.
        schema_id: The caller-chosen identifier of the schema whose revisions are being listed.
    """
    name = f"projects/{project_id}/schemas/{schema_id}"

    try:
        response = client.list_schema_revisions(request={"name": name})
        for schema in response:
            print(f"Revision Name: {schema.name}")
            print(f"Revision ID: {schema.revision_id}")
            print(f"Revision Type: {schema.type_}")
            print(f"Revision Create Time: {schema.revision_create_time}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Error listing schema revisions: {error}")
# [END pubsub_v1_schemaservice_schemarevisions_list]
