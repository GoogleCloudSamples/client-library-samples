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

package main

// [START analyticshub_v1_reservationservice_capacitycommitments_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	reservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/api/iterator"
)

// listCapacityCommitments lists all capacity commitments in a specified project and location.
func listCapacityCommitments(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = os.Getenv("GCP_PROJECT")
	}
	if projectID == "" {
		projectID = "example-project-id"
	}

	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = os.Getenv("LOCATION")
	}
	if location == "" {
		location = "us-central1"
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	client, err := reservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &reservationpb.ListCapacityCommitmentsRequest{
		Parent: parent,
	}

	it := client.ListCapacityCommitments(ctx, req)
	var count int
	for {
		commitment, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListCapacityCommitments failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Capacity commitment: %s, Plan: %s, Slot count: %d, State: %s\n",
			commitment.GetName(),
			commitment.GetPlan(),
			commitment.GetSlotCount(),
			commitment.GetState(),
		)
	}

	if count == 0 {
		fmt.Fprintln(w, "No capacity commitments found.")
	}

	return nil
}

// [END analyticshub_v1_reservationservice_capacitycommitments_list]
