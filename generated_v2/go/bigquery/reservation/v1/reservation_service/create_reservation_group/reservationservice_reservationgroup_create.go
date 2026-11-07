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

// [START bigqueryreservation_v1_reservationservice_reservationgroup_create]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	"cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createReservationGroup creates a reservation group in the specified location.
func createReservationGroup(ctx context.Context, w io.Writer, reservationGroupID string) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)
	reservationGroup := &reservationpb.ReservationGroup{}

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &reservationpb.CreateReservationGroupRequest{
		Parent:             parent,
		ReservationGroupId: reservationGroupID,
		ReservationGroup:   reservationGroup,
	}

	resp, err := client.CreateReservationGroup(ctx, req)
	if err != nil {
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition && strings.Contains(st.Message(), "Reservation Based Fairness") {
			fmt.Fprintf(w, "Reservation groups require reservation-based fairness enabled on the project: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("CreateReservationGroup: %w", err)
	}

	fmt.Fprintf(w, "Created reservation group: %s\n", resp.GetName())
	return nil
}

// [END bigqueryreservation_v1_reservationservice_reservationgroup_create]
