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

// [START analyticshub_v1_reservationservice_bireservation_get]

import (
	"context"
	"fmt"
	"io"

	reservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
)

// getBiReservation gets the BigQuery BI reservation for a project and location.
func getBiReservation(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/biReservation", projectID, locationID)

	client, err := reservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &reservationpb.GetBiReservationRequest{
		Name: name,
	}

	resp, err := client.GetBiReservation(ctx, req)
	if err != nil {
		return fmt.Errorf("GetBiReservation: %w", err)
	}

	fmt.Fprintf(w, "BI Reservation: %s\n", resp.GetName())
	fmt.Fprintf(w, "Size: %d bytes\n", resp.GetSize())

	return nil
}

// [END analyticshub_v1_reservationservice_bireservation_get]
