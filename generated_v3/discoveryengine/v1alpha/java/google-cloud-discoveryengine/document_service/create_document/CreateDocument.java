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

package com.google.cloud.discoveryengine.v1alpha;

// [START discoveryengine_v1alpha_documentservice_document_create]
import com.google.cloud.discoveryengine.v1alpha.BranchName;
import com.google.cloud.discoveryengine.v1alpha.CreateDocumentRequest;
import com.google.cloud.discoveryengine.v1alpha.Document;
import com.google.cloud.discoveryengine.v1alpha.DocumentServiceClient;

public class CreateDocument {

  public static void main(String[] args) throws Exception {
    String projectId = "example-project_id";
    String locationId = "example-location_id";
    String dataStoreId = "example-data_store_id";
    String branchId = "example-branch_id";
    String documentId = "example-document_id";
    createDocument(projectId, locationId, dataStoreId, branchId, documentId);
  }

  public static void createDocument(
      String projectId,
      String locationId,
      String dataStoreId,
      String branchId,
      String documentId)
      throws Exception {
    try (DocumentServiceClient client = DocumentServiceClient.create()) {
      String parent =
          BranchName.ofProjectLocationDataStoreBranchName(
                  projectId, locationId, dataStoreId, branchId)
              .toString();

      Document document =
          Document.newBuilder()
              .setJsonData(
                  "{\"title\": \"Example Document\", \"body\": \"This is example document content.\"}")
              .build();

      CreateDocumentRequest request =
          CreateDocumentRequest.newBuilder()
              .setParent(parent)
              .setDocument(document)
              .setDocumentId(documentId)
              .build();

      Document response = client.createDocument(request);
      System.out.println("Created document: " + response.getName());
    }
  }
}
// [END discoveryengine_v1alpha_documentservice_document_create]
