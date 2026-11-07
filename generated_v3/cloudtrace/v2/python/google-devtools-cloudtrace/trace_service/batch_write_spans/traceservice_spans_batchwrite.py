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

# [START cloudtrace_v2_traceservice_batch_write_spans]
import datetime

import google.api_core.exceptions
from google.cloud import trace_v2
from google.protobuf import timestamp_pb2


def batch_write_spans(project_id: str) -> None:
    """Sends a batch of trace spans to Cloud Trace.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
    """
    client = trace_v2.TraceServiceClient()

    name = f"projects/{project_id}"

    start_time = timestamp_pb2.Timestamp()
    start_time.FromDatetime(datetime.datetime.now(tz=datetime.timezone.utc))

    end_time = timestamp_pb2.Timestamp()
    end_time.FromDatetime(
        datetime.datetime.now(tz=datetime.timezone.utc)
        + datetime.timedelta(seconds=1)
    )

    trace_id = "0123456789abcdef0123456789abcdef"
    span_id = "0123456789abcdef"
    span_name = f"{name}/traces/{trace_id}/spans/{span_id}"

    span = trace_v2.Span(
        name=span_name,
        span_id=span_id,
        display_name=trace_v2.TruncatableString(value="example-span"),
        start_time=start_time,
        end_time=end_time,
    )
    spans = [span]

    try:
        client.batch_write_spans(name=name, spans=spans)
        print(f"Successfully wrote spans to project: {project_id}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Failed to batch write spans: {e}")
# [END cloudtrace_v2_traceservice_batch_write_spans]
