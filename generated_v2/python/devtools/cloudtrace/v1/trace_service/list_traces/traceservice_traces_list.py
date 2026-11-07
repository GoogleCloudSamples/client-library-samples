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

# [START cloudtrace_v1_traceservice_traces_list]
from google.api_core import exceptions
from google.cloud import trace_v1


def list_traces(project_id: str) -> None:
    """Lists traces in a Google Cloud project.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = trace_v1.TraceServiceClient()

    request = trace_v1.ListTracesRequest(
        project_id=project_id,
    )

    try:
        response = client.list_traces(request=request)
        trace_count = 0
        for trace in response:
            trace_count += 1
            print(f"Trace ID: {trace.trace_id}")
            print(f"Span count: {len(trace.spans)}")

        if trace_count == 0:
            print(f"No traces found in project: {project_id}")
    except exceptions.GoogleAPICallError as error:
        print(f"Failed to list traces: {error}")
# [END cloudtrace_v1_traceservice_traces_list]
