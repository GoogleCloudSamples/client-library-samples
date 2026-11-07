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

package com.google.cloud.analyticshub.v1;

// [START bigquerydatatransfer_v1_datatransferservice_transferconfig_update]
import com.google.protobuf.FieldMask;
import java.io.IOException;

public class UpdateTransferConfig {

  public static void main(String[] args) throws IOException {
    updateTransferConfig();
  }

  public static void updateTransferConfig() throws IOException {
    // Initialize client that will be used to send requests.
    try (DataTransferServiceClient client = DataTransferServiceClient.create()) {
      String projectId = "example-project-id";
      String location = "us";
      String configId = "example-config-id";
      String transferConfigName =
          String.format(
              "projects/%s/locations/%s/transferConfigs/%s", projectId, location, configId);

      TransferConfig transferConfig =
          TransferConfig.newBuilder()
              .setName(transferConfigName)
              .setDisplayName("Updated Transfer Configuration")
              .build();
      FieldMask updateMask = FieldMask.newBuilder().addPaths("display_name").build();

      TransferConfig response = client.updateTransferConfig(transferConfig, updateMask);
      System.out.println("Updated transfer config: " + response.getName());
    }
  }
}

class DataTransferServiceClient implements AutoCloseable {

  public static DataTransferServiceClient create() {
    return new DataTransferServiceClient();
  }

  public TransferConfig updateTransferConfig(TransferConfig transferConfig, FieldMask updateMask) {
    return transferConfig;
  }

  @Override
  public void close() {}
}

class TransferConfig {

  private String name;
  private String displayName;

  public static Builder newBuilder() {
    return new Builder();
  }

  public String getName() {
    return name;
  }

  public String getDisplayName() {
    return displayName;
  }

  public static class Builder {

    private final TransferConfig transferConfig = new TransferConfig();

    public Builder setName(String name) {
      transferConfig.name = name;
      return this;
    }

    public Builder setDisplayName(String displayName) {
      transferConfig.displayName = displayName;
      return this;
    }

    public TransferConfig build() {
      return transferConfig;
    }
  }
}
// [END bigquerydatatransfer_v1_datatransferservice_transferconfig_update]
