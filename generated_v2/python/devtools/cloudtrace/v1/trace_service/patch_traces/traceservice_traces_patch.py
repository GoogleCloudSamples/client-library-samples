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

# [START cloudtrace_v1_traceservice_traces_patch]
import datetime

import google.api_core.exceptions
from google.cloud import trace_v1


def patch_traces(project_id: str) -> None:
    """Updates existing traces with new span data.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = trace_v1.TraceServiceClient()

    start_time = datetime.datetime.now(datetime.timezone.utc)
    end_time = start_time + datetime.timedelta(seconds=1)

    span = trace_v1.TraceSpan(
        span_id=1,
        name="example-span",
        start_time=start_time,
        end_time=end_time,
    )
    trace = trace_v1.Trace(
        project_id=project_id,
        trace_id="0123456789abcdef0123456789abcdef",
        spans=[span],
    )
    traces = trace_v1.Traces(traces=[trace])

    try:
        client.patch_traces(project_id=project_id, traces=traces)
        print("Traces patched successfully.")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"API call failed: {error}")
# [END cloudtrace_v1_traceservice_traces_patch]
