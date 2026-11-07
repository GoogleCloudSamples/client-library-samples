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

# [START dataproc_v1_sessiontemplatecontroller_sessiontemplate_create]
from google.api_core.client_options import ClientOptions
import google.api_core.exceptions
from google.cloud import dataproc_v1


def create_session_template(
    project_id: str, location_id: str, session_template_id: str
) -> None:
    """Creates a Dataproc session template.

    Args:
        project_id: The Google Cloud project ID.
        location_id: The Dataproc region for the session template, for example us-central1.
        session_template_id: The caller-chosen identifier for the session template.
    """
    endpoint = f"{location_id}-dataproc.googleapis.com:443"
    client = dataproc_v1.SessionTemplateControllerClient(
        client_options=ClientOptions(api_endpoint=endpoint)
    )

    parent = f"projects/{project_id}/locations/{location_id}"
    session_template = dataproc_v1.SessionTemplate(
        name=f"projects/{project_id}/locations/{location_id}/sessionTemplates/{session_template_id}",
        jupyter_session=dataproc_v1.JupyterConfig(
            kernel=dataproc_v1.JupyterConfig.Kernel.PYTHON,
            display_name="example-jupyter-session",
        ),
    )

    try:
        response = client.create_session_template(
            parent=parent,
            session_template=session_template,
        )
        print(f"Created session template: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create session template: {error}")
# [END dataproc_v1_sessiontemplatecontroller_sessiontemplate_create]
