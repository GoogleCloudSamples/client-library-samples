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

import os
import sys

from traceservice_span_create import create_span

# Support environment variables with optional CLI argument overrides
project_id = os.environ.get("PROJECT_ID") or (sys.argv[1] if len(sys.argv) > 1 else None)
if project_id:
    project_id = project_id.strip("'\"")
if not project_id:
    project_id = ""

trace_id = os.environ.get("TRACE_ID") or (sys.argv[2] if len(sys.argv) > 2 else None)
if trace_id:
    trace_id = trace_id.strip("'\"")
if not trace_id:
    trace_id = ""

span_id = os.environ.get("SPAN_ID") or (sys.argv[3] if len(sys.argv) > 3 else None)
if span_id:
    span_id = span_id.strip("'\"")
if not span_id:
    span_id = ""


if __name__ == "__main__":
    create_span(project_id, trace_id, span_id)

