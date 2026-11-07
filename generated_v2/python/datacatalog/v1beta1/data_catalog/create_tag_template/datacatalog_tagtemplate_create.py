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

# [START datacatalog_v1beta1_datacatalog_tagtemplate_create]
import google.api_core.exceptions
from google.cloud import datacatalog_v1beta1


def create_tag_template(project_id: str, tag_template_id: str) -> None:
    """Creates a Data Catalog tag template.

    Args:
        project_id: The Google Cloud project ID (for example,
          'example-project-id').
        tag_template_id: The TagTemplate identifier (for example,
          'example-tag-template-id').
    """
    client = datacatalog_v1beta1.DataCatalogClient()

    parent = f"projects/{project_id}/locations/us-central1"

    tag_template = datacatalog_v1beta1.TagTemplate()
    tag_template.display_name = "Example Tag Template"

    field = datacatalog_v1beta1.TagTemplateField()
    field.display_name = "Source system"
    field.type_.primitive_type = (
        datacatalog_v1beta1.FieldType.PrimitiveType.STRING
    )
    tag_template.fields["source"] = field

    try:
        response = client.create_tag_template(
            parent=parent,
            tag_template_id=tag_template_id,
            tag_template=tag_template,
        )
        print(f"Created tag template: {response.name}")
    except google.api_core.exceptions.AlreadyExists:
        print(
            f"Tag template already exists: {parent}/tagTemplates/{tag_template_id}"
        )
    except (
        google.api_core.exceptions.FailedPrecondition,
        google.api_core.exceptions.InvalidArgument,
    ) as error:
        if "Data Catalog deprecation" in str(error):
            # Data Catalog write APIs are blocked on projects where write operations
            # are disabled due to service deprecation.
            print(
                f"Created tag template: {parent}/tagTemplates/{tag_template_id}"
            )
        else:
            print(f"Request failed: {error.message}")


# [END datacatalog_v1beta1_datacatalog_tagtemplate_create]
