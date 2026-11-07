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

// [START analyticshub_v1_reservationservice_reservations_list]

import (
	"context"
	"fmt"
	"io"
	"os"

	reservation "cloud.google.com/go/bigquery/reservation/apiv1"
	"cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/api/iterator"
)

// listReservations lists BigQuery reservations for a project and location.
func listReservations(ctx context.Context, w io.Writer) error {
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
		location = "US"
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	client, err := reservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("reservation.NewClient: %w", err)
	}
	defer client.Close()

	req := &reservationpb.ListReservationsRequest{
		Parent: parent,
	}

	it := client.ListReservations(ctx, req)
	var count int
	for {
		res, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("ListReservations iteration failed: %w", err)
		}
		count++
		fmt.Fprintf(w, "Reservation: %s, Slot Capacity: %d\n", res.GetName(), res.GetSlotCapacity())
	}

	if count == 0 {
		fmt.Fprintln(w, "No reservations found.")
	}

	return nil
}

// [END analyticshub_v1_reservationservice_reservations_list]
