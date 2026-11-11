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

// [START bigqueryreservation_v1_reservationservice_failover_reservation]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
)

// failoverReservation fails over a reservation to its secondary location.
func failoverReservation(ctx context.Context, w io.Writer, projectID string, locationID string, reservationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/reservations/%s", projectID, locationID, reservationID)

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryreservation.NewClient: %w", err)
	}
	defer client.Close()

	req := &reservationpb.FailoverReservationRequest{
		Name: name,
	}

	reservation, err := client.FailoverReservation(ctx, req)
	if err != nil {
		return fmt.Errorf("FailoverReservation: %w", err)
	}

	fmt.Fprintf(w, "Failover completed for reservation: %s\n", reservation.GetName())
	return nil
}

// [END bigqueryreservation_v1_reservationservice_failover_reservation]
