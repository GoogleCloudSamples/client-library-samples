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

# [START pubsub_v1_schemaservice_commit_schema]
import json

import google.api_core.exceptions
from google.cloud import pubsub_v1
from google.pubsub_v1 import Schema

client = pubsub_v1.SchemaServiceClient()


def commit_schema(project_id: str, schema_id: str) -> None:
    """Commit a new revision to a Pub/Sub schema.

    Args:
        project_id: The Google Cloud project ID.
        schema_id: The ID of the Pub/Sub schema to commit a revision to.
    """
    name = f"projects/{project_id}/schemas/{schema_id}"

    try:
        # Retrieve the existing schema to construct a backward-compatible revision.
        existing_schema = client.get_schema(name=name)
        schema_dict = json.loads(existing_schema.definition)
        fields = schema_dict.get("fields", [])
        field_names = {f.get("name") for f in fields if isinstance(f, dict)}
        new_field_name = "new_field"
        while new_field_name in field_names:
            new_field_name = f"{new_field_name}_rev"
        fields.append(
            {"name": new_field_name, "type": ["null", "string"], "default": None}
        )
        schema_dict["fields"] = fields
        definition = json.dumps(schema_dict)
    except (
        google.api_core.exceptions.GoogleAPICallError,
        json.JSONDecodeError,
        KeyError,
    ):
        definition = (
            '{"type": "record", "name": "Avro", "fields": ['
            '{"name": "StringField", "type": "string"}, '
            '{"name": "IntField", "type": "int"}, '
            '{"name": "BooleanField", "type": "boolean", "default": true}]}'
        )

    schema = Schema(
        name=name,
        type_=Schema.Type.AVRO,
        definition=definition,
    )

    try:
        response = client.commit_schema(name=name, schema=schema)
        print(f"Committed schema revision: {response.name}")
        print(f"Revision ID: {response.revision_id}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END pubsub_v1_schemaservice_commit_schema]
