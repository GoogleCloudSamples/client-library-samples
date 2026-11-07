// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.cloud.cloudtrace.v1;

// [START cloudtrace_v1_traceservice_traces_patch]
import com.google.cloud.trace.v1.TraceServiceClient;
import com.google.devtools.cloudtrace.v1.Trace;
import com.google.devtools.cloudtrace.v1.TraceSpan;
import com.google.devtools.cloudtrace.v1.Traces;
import com.google.protobuf.Timestamp;
import java.io.IOException;
import java.time.Instant;

public class PatchTraces {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    patchTraces(projectId);
  }

  public static void patchTraces(String projectId) throws IOException {
    // Initialize client within a try-with-resources block for automatic cleanup
    try (TraceServiceClient client = TraceServiceClient.create()) {
      Instant now = Instant.now();
      Timestamp startTime =
          Timestamp.newBuilder()
              .setSeconds(now.getEpochSecond())
              .setNanos(now.getNano())
              .build();
      Timestamp endTime =
          Timestamp.newBuilder()
              .setSeconds(now.plusSeconds(1).getEpochSecond())
              .setNanos(now.getNano())
              .build();

      TraceSpan span =
          TraceSpan.newBuilder()
              .setSpanId(1L)
              .setName("example-span")
              .setStartTime(startTime)
              .setEndTime(endTime)
              .build();

      Trace trace =
          Trace.newBuilder()
              .setProjectId(projectId)
              .setTraceId("0123456789abcdef0123456789abcdef")
              .addSpans(span)
              .build();

      Traces traces = Traces.newBuilder().addTraces(trace).build();

      client.patchTraces(projectId, traces);
      System.out.println("Patched traces successfully.");
    }
  }
}
// [END cloudtrace_v1_traceservice_traces_patch]
