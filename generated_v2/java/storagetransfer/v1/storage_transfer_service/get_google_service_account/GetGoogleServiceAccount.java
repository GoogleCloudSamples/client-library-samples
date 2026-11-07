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

package com.google.cloud.storagetransfer.proto;

// [START storagetransfer_proto_storagetransferservice_googleserviceaccount_get]
import com.google.storagetransfer.v1.proto.StorageTransferServiceClient;
import com.google.storagetransfer.v1.proto.TransferProto.GetGoogleServiceAccountRequest;
import com.google.storagetransfer.v1.proto.TransferTypes.GoogleServiceAccount;
import java.io.IOException;

public class GetGoogleServiceAccount {

  public static void main(String[] args) throws IOException {
    String projectId = "example-project-id";
    getGoogleServiceAccount(projectId);
  }

  public static void getGoogleServiceAccount(String projectId) throws IOException {
    try (StorageTransferServiceClient client = StorageTransferServiceClient.create()) {
      GetGoogleServiceAccountRequest request =
          GetGoogleServiceAccountRequest.newBuilder().setProjectId(projectId).build();
      GoogleServiceAccount response = client.getGoogleServiceAccount(request);
      System.out.println("Fetched Google service account: " + response.getAccountEmail());
    }
  }
}
// [END storagetransfer_proto_storagetransferservice_googleserviceaccount_get]
