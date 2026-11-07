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

# [START language_v1_languageservice_analyze_entities]
import google.api_core.exceptions
from google.cloud import language_v1

client = language_v1.LanguageServiceClient()


def analyze_entities() -> None:
    """Analyze entities in a document using the Cloud Natural Language API."""
    document = language_v1.Document(
        content=(
            "Google, headquartered in Mountain View, was founded by Larry Page"
            " and Sergey Brin."
        ),
        type_=language_v1.Document.Type.PLAIN_TEXT,
    )
    encoding_type = language_v1.EncodingType.UTF8

    try:
        response = client.analyze_entities(
            document=document,
            encoding_type=encoding_type,
        )

        for entity in response.entities:
            print(f"Representative name for the entity: {entity.name}")
            print(f"Entity type: {language_v1.Entity.Type(entity.type_).name}")
            print(f"Salience score: {entity.salience:.2f}")

            for metadata_name, metadata_value in entity.metadata.items():
                print(f"Metadata: {metadata_name} = {metadata_value}")

            for mention in entity.mentions:
                print(f"Mention text: {mention.text.content}")
                print(
                    "Mention type:"
                    f" {language_v1.EntityMention.Type(mention.type_).name}"
                )

    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Service call failed: {e}")


# [END language_v1_languageservice_analyze_entities]
