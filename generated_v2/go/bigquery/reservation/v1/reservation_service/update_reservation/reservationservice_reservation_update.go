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

// [START bigqueryreservation_v1_reservationservice_reservation_update]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateReservation updates an existing BigQuery reservation.
func updateReservation(ctx context.Context, w io.Writer, projectID string, locationID string, reservationID string) error {
	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryreservation.NewClient: %w", err)
	}
	defer client.Close()

	reservation := &reservationpb.Reservation{
		Name: fmt.Sprintf("projects/%s/locations/%s/reservations/%s", projectID, locationID, reservationID),
		Labels: map[string]string{
			"env": "prod",
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"labels"},
	}

	req := &reservationpb.UpdateReservationRequest{
		Reservation: reservation,
		UpdateMask:  updateMask,
	}

	resp, err := client.UpdateReservation(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateReservation: %w", err)
	}

	fmt.Fprintf(w, "Updated reservation: %s\n", resp.GetName())
	return nil
}

// [END bigqueryreservation_v1_reservationservice_reservation_update]
