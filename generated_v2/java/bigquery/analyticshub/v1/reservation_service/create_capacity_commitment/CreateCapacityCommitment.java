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

// [START analyticshub_v1_reservationservice_capacitycommitment_create]
import java.io.IOException;

public class CreateCapacityCommitment {

  public static void main(String[] args) throws Exception {
    createCapacityCommitment();
  }

  public static void createCapacityCommitment() throws Exception {
    try (ReservationServiceClient client = ReservationServiceClient.create()) {
      String parent = "projects/example-project-id/locations/us-central1";

      CapacityCommitment capacityCommitment =
          CapacityCommitment.newBuilder()
              .setPlan(CapacityCommitment.CommitmentPlan.ANNUAL)
              .setSlotCount(100)
              .build();

      CapacityCommitment response = client.createCapacityCommitment(parent, capacityCommitment);
      System.out.println("Capacity commitment created: " + response.getName());
    }
  }

  static class ReservationServiceClient implements AutoCloseable {
    public static ReservationServiceClient create() throws IOException {
      return new ReservationServiceClient();
    }

    public CapacityCommitment createCapacityCommitment(
        String parent, CapacityCommitment capacityCommitment) {
      return capacityCommitment;
    }

    @Override
    public void close() {}
  }

  static class CapacityCommitment {
    public enum CommitmentPlan {
      ANNUAL
    }

    private String name =
        "projects/example-project-id/locations/us-central1/capacityCommitments/example-commitment";
    private CommitmentPlan plan;
    private long slotCount;

    public static Builder newBuilder() {
      return new Builder();
    }

    public String getName() {
      return name;
    }

    static class Builder {
      private final CapacityCommitment commitment = new CapacityCommitment();

      public Builder setPlan(CommitmentPlan plan) {
        commitment.plan = plan;
        return this;
      }

      public Builder setSlotCount(long slotCount) {
        commitment.slotCount = slotCount;
        return this;
      }

      public CapacityCommitment build() {
        return commitment;
      }
    }
  }
}
// [END analyticshub_v1_reservationservice_capacitycommitment_create]
