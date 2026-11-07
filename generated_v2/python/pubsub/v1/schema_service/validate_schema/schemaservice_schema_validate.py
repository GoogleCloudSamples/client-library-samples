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

# [START pubsub_v1_schemaservice_validate_schema]
import google.api_core.exceptions
from google.cloud import pubsub_v1
from google.pubsub_v1 import Schema

client = pubsub_v1.SchemaServiceClient()


def validate_schema(project_id: str) -> None:
    """Validates a schema definition for a project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id')
    """
    parent = f"projects/{project_id}"
    schema = Schema(
        type_=Schema.Type.AVRO,
        definition=(
            '{"type": "record", "name": "Avro", "fields": '
            '[{"name": "name", "type": "string"}]}'
        ),
    )

    try:
        response = client.validate_schema(parent=parent, schema=schema)
        print(f"Validated schema: {response}")
    except google.api_core.exceptions.InvalidArgument as exc:
        print(f"Schema definition is invalid: {exc}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc}")
# [END pubsub_v1_schemaservice_validate_schema]
