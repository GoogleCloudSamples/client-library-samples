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

# [START cloudtrace_v2_traceservice_span_create]
import google.api_core.exceptions
from google.cloud import trace_v2
from google.protobuf import timestamp_pb2


def create_span(project_id: str, trace_id: str, span_id: str) -> None:
    """Creates a span within a trace.

    Args:
        project_id: The Google Cloud project ID.
        trace_id: A unique identifier for a trace within a project, represented
          as a 32-character hexadecimal string encoding a 16-byte array (for
          example, '0123456789abcdef0123456789abcdef').
        span_id: A unique identifier for a span within a trace, represented as a
          16-character hexadecimal string encoding an 8-byte array (for example,
          '0123456789abcdef').
    """
    client = trace_v2.TraceServiceClient()

    start_time = timestamp_pb2.Timestamp()
    start_time.GetCurrentTime()

    end_time = timestamp_pb2.Timestamp()
    end_time.seconds = start_time.seconds + 5
    end_time.nanos = start_time.nanos

    display_name = trace_v2.TruncatableString(value="example-operation-span")
    name = f"projects/{project_id}/traces/{trace_id}/spans/{span_id}"

    span = trace_v2.Span(
        name=name,
        span_id=span_id,
        display_name=display_name,
        start_time=start_time,
        end_time=end_time,
    )

    try:
        response = client.create_span(request=span)
        print(f"Created span: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as error:
        print(f"Failed to create span: {error}")
# [END cloudtrace_v2_traceservice_span_create]
