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

// [START bigqueryreservation_v1_reservationservice_reservation_get]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
)

// getReservation retrieves an existing BigQuery reservation.
func getReservation(ctx context.Context, w io.Writer, projectID string, locationID string, reservationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/reservations/%s", projectID, locationID, reservationID)

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &reservationpb.GetReservationRequest{
		Name: name,
	}

	resp, err := client.GetReservation(ctx, req)
	if err != nil {
		return fmt.Errorf("GetReservation failed: %w", err)
	}

	fmt.Fprintf(w, "Retrieved reservation: %s (slot capacity: %d)\n", resp.GetName(), resp.GetSlotCapacity())

	return nil
}

// [END bigqueryreservation_v1_reservationservice_reservation_get]
