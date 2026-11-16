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

# [START pubsub_v1_schemaservice_schema_create]
import google.api_core.exceptions
from google.cloud import pubsub_v1
from google.pubsub_v1.types import Schema

client = pubsub_v1.SchemaServiceClient()


def create_schema(project_id: str, schema_id: str) -> None:
    """Creates a Pub/Sub schema.

    Args:
        project_id: The Google Cloud project ID (for example,
            'example-project-id').
        schema_id: The identifier for the schema (for example,
            'example-schema').
    """
    parent = f"projects/{project_id}"
    definition = (
        '{\n'
        '  "type": "record",\n'
        '  "name": "AvroRecord",\n'
        '  "fields": [\n'
        '    {\n'
        '      "name": "name",\n'
        '      "type": "string"\n'
        '    }\n'
        '  ]\n'
        '}'
    )
    schema = Schema(
        type_=Schema.Type.AVRO,
        definition=definition,
    )

    try:
        response = client.create_schema(
            parent=parent,
            schema=schema,
            schema_id=schema_id,
        )
        print(f"Created schema: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(f"Schema already exists: {schema_id}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create schema: {error}")
# [END pubsub_v1_schemaservice_schema_create]
