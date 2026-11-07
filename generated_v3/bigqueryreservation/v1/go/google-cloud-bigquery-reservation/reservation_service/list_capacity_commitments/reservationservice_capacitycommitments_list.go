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

// [START bigqueryreservation_v1_reservationservice_capacitycommitments_list]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/api/iterator"
)

// listCapacityCommitments lists all capacity commitments in a specified project and location.
func listCapacityCommitments(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryreservation.NewClient: %w", err)
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
			return fmt.Errorf("it.Next: %w", err)
		}
		count++
		fmt.Fprintf(w, "Capacity commitment: %s, Slot count: %d, Plan: %s, State: %s\n",
			commitment.GetName(),
			commitment.GetSlotCount(),
			commitment.GetPlan(),
			commitment.GetState(),
		)
	}

	if count == 0 {
		fmt.Fprintln(w, "No capacity commitments found.")
	}

	return nil
}

// [END bigqueryreservation_v1_reservationservice_capacitycommitments_list]
