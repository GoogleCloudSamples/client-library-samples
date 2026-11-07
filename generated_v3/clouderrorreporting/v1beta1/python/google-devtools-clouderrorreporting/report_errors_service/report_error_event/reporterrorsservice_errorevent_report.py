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

# [START clouderrorreporting_v1beta1_reporterrorsservice_report_error_event]
import google.api_core.exceptions
from google.cloud import errorreporting_v1beta1


def report_error_event(project_id: str) -> None:
    """Reports an error event to Cloud Error Reporting.

    Args:
        project_id: The Google Cloud project ID.
    """
    client = errorreporting_v1beta1.ReportErrorsServiceClient()

    project_name = f"projects/{project_id}"
    event = errorreporting_v1beta1.ReportedErrorEvent(
        service_context=errorreporting_v1beta1.ServiceContext(
            service="example-service",
            version="1.0.0",
        ),
        message=(
            "Traceback (most recent call last):\n"
            '  File "main.py", line 42, in process_event\n'
            "ZeroDivisionError: division by zero"
        ),
    )

    try:
        client.report_error_event(
            project_name=project_name,
            event=event,
        )
        print(f"Error event successfully reported to {project_name}.")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to report error event: {e}")
# [END clouderrorreporting_v1beta1_reporterrorsservice_report_error_event]
