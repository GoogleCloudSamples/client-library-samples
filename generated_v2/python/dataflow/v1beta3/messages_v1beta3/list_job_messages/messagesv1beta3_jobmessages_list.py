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

# [START dataflow_v1beta3_messagesv1beta3_jobmessages_list]
import google.api_core.exceptions
from google.cloud import dataflow_v1beta3

client = dataflow_v1beta3.MessagesV1Beta3Client()


def list_job_messages(project_id: str, location_id: str, job_id: str) -> None:
    """Lists messages associated with a Dataflow job.

    Args:
        project_id: The Google Cloud project ID containing the Dataflow job.
        location_id: The regional endpoint containing the Dataflow job (for example, 'us-central1').
        job_id: The server-generated ID of the Dataflow job to list messages for.
    """
    request = dataflow_v1beta3.ListJobMessagesRequest(
        project_id=project_id,
        location=location_id,
        job_id=job_id,
    )

    try:
        page_result = client.list_job_messages(request=request)
        for message in page_result:
            print(f"Message ID: {message.id}")
            print(f"Time: {message.time}")
            print(f"Importance: {message.message_importance}")
            print(f"Text: {message.message_text}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"API call failed: {e}")
# [END dataflow_v1beta3_messagesv1beta3_jobmessages_list]
