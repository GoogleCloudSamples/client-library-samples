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

// [START bigqueryreservation_v1_reservationservice_reservation_create]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	"cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
)

// createReservation creates a BigQuery reservation with baseline slot capacity.
func createReservation(ctx context.Context, w io.Writer, projectID string, locationID string, reservationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	reservation := &reservationpb.Reservation{
		SlotCapacity: 100,
		Edition:      reservationpb.Edition_ENTERPRISE,
	}

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &reservationpb.CreateReservationRequest{
		Parent:        parent,
		ReservationId: reservationID,
		Reservation:   reservation,
	}

	resp, err := client.CreateReservation(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateReservation: %w", err)
	}

	fmt.Fprintf(w, "Created reservation: %s\n", resp.GetName())
	return nil
}

// [END bigqueryreservation_v1_reservationservice_reservation_create]
