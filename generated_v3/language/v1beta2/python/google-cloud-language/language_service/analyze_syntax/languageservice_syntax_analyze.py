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

# [START language_v1beta2_languageservice_analyze_syntax]
import google.api_core.exceptions
from google.cloud import language_v1beta2

client = language_v1beta2.LanguageServiceClient()


def analyze_syntax() -> None:
    """Analyzes the syntax of a text string."""
    document = language_v1beta2.Document(
        content=(
            "Google, headquartered in Mountain View, unveiled the new Android"
            " phone at the Consumer Electronics Show."
        ),
        type_=language_v1beta2.Document.Type.PLAIN_TEXT,
    )
    encoding_type = language_v1beta2.EncodingType.UTF8

    try:
        response = client.analyze_syntax(
            document=document,
            encoding_type=encoding_type,
        )

        for sentence in response.sentences:
            print(f"Sentence text: {sentence.text.content}")
            print(f"Sentence offset: {sentence.text.begin_offset}")

        for token in response.tokens:
            print(f"Token text: {token.text.content}")
            print(f"Part of speech: {token.part_of_speech.tag.name}")
            print(f"Lemma: {token.lemma}")

    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")


# [END language_v1beta2_languageservice_analyze_syntax]
