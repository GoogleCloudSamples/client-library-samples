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

// [START cloudtrace_v1_traceservice_traces_list]
import com.google.cloud.trace.v1.TraceServiceClient;
import com.google.devtools.cloudtrace.v1.ListTracesRequest;
import com.google.devtools.cloudtrace.v1.Trace;
import java.io.IOException;

public class ListTraces {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    listTraces(projectId);
  }

  public static void listTraces(String projectId) throws IOException {
    try (TraceServiceClient client = TraceServiceClient.create()) {
      ListTracesRequest request =
          ListTracesRequest.newBuilder()
              .setProjectId(projectId)
              .build();

      for (Trace trace : client.listTraces(request).iterateAll()) {
        System.out.println("Trace ID: " + trace.getTraceId());
        System.out.println("Span count: " + trace.getSpansCount());
      }
    }
  }
}
// [END cloudtrace_v1_traceservice_traces_list]
