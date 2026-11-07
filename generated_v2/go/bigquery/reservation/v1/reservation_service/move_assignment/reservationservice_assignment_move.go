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

// [START bigqueryreservation_v1_reservationservice_move_assignment]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
)

// moveAssignment moves an existing BigQuery reservation assignment to a destination reservation.
func moveAssignment(ctx context.Context, w io.Writer, projectID string, locationID string, reservationID string, assignmentID string, destinationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/reservations/%s/assignments/%s", projectID, locationID, reservationID, assignmentID)

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &reservationpb.MoveAssignmentRequest{
		Name:          name,
		DestinationId: destinationID,
	}

	resp, err := client.MoveAssignment(ctx, req)
	if err != nil {
		return fmt.Errorf("MoveAssignment failed: %w", err)
	}

	fmt.Fprintf(w, "Moved assignment: %s\n", resp.GetName())
	return nil
}

// [END bigqueryreservation_v1_reservationservice_move_assignment]
