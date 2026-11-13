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

# [START pubsub_v1_schemaservice_schema_get]
import google.api_core.exceptions
from google.cloud import pubsub_v1

client = pubsub_v1.SchemaServiceClient()


def get_schema(project_id: str, schema_id: str) -> None:
    """Use the get_schema method

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
        schema_id: ID of the Schema (for example, 'example-schema-id')
    """
    name = client.schema_path(project_id, schema_id)

    try:
        response = client.get_schema(request={"name": name})
        print(f"Retrieved schema: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to retrieve schema: {error}")
# [END pubsub_v1_schemaservice_schema_get]
