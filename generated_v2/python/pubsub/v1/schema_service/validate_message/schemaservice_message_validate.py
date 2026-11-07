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

# [START pubsub_v1_schemaservice_validate_message]
import google.api_core.exceptions
from google.cloud import pubsub_v1
from google.pubsub_v1.types import Encoding, ValidateMessageRequest

client = pubsub_v1.SchemaServiceClient()


def validate_message(project_id: str, schema_id: str) -> None:
    """Validate a message against a Pub/Sub schema.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        schema_id: The ID of the schema against which to validate the message (for example, 'example-schema-id').
    """
    parent = f"projects/{project_id}"
    name = f"projects/{project_id}/schemas/{schema_id}"
    message = b'{"message": "Hello, world!"}'
    encoding = Encoding.JSON

    request = ValidateMessageRequest(
        parent=parent,
        name=name,
        message=message,
        encoding=encoding,
    )

    try:
        client.validate_message(request=request)
        print(f"Validated message against schema: {name}")
    except google.api_core.exceptions.InvalidArgument as exc:
        print(f"Message failed schema validation: {exc.message}")
    except google.api_core.exceptions.GoogleAPICallError as exc:
        print(f"API call failed: {exc.message}")


# [END pubsub_v1_schemaservice_validate_message]
