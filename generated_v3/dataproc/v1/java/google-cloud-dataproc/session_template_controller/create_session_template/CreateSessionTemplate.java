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

package com.google.cloud.dataproc.v1;

// [START dataproc_v1_sessiontemplatecontroller_sessiontemplate_create]
import com.google.cloud.dataproc.v1.JupyterConfig;
import com.google.cloud.dataproc.v1.SessionTemplate;
import com.google.cloud.dataproc.v1.SessionTemplateControllerClient;
import com.google.cloud.dataproc.v1.SessionTemplateControllerSettings;
import java.io.IOException;

public class CreateSessionTemplate {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    String locationId = "example-location-id";
    String sessionTemplateId = "example-session-template-id";
    createSessionTemplate(projectId, locationId, sessionTemplateId);
  }

  public static void createSessionTemplate(
      String projectId, String locationId, String sessionTemplateId) throws IOException {
    // Configure regional endpoint for Dataproc control plane operations
    String endpoint = String.format("%s-dataproc.googleapis.com:443", locationId);
    SessionTemplateControllerSettings settings =
        SessionTemplateControllerSettings.newBuilder().setEndpoint(endpoint).build();

    try (SessionTemplateControllerClient client = SessionTemplateControllerClient.create(settings)) {
      String parent = String.format("projects/%s/locations/%s", projectId, locationId);
      SessionTemplate sessionTemplate =
          SessionTemplate.newBuilder()
              .setName(String.format("%s/sessionTemplates/%s", parent, sessionTemplateId))
              .setDescription("Session template configured with Python Jupyter kernel")
              .setJupyterSession(
                  JupyterConfig.newBuilder()
                      .setKernel(JupyterConfig.Kernel.PYTHON)
                      .setDisplayName("Example Jupyter Session")
                      .build())
              .build();

      SessionTemplate response = client.createSessionTemplate(parent, sessionTemplate);
      System.out.println("Created session template: " + response.getName());
    }
  }
}
// [END dataproc_v1_sessiontemplatecontroller_sessiontemplate_create]
