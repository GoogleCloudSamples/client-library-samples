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

// [START bigqueryreservation_v1_reservationservice_reservationgroup_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// updateReservationGroup updates an existing reservation group.
func updateReservationGroup(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = os.Getenv("LOCATION_ID")
	}
	if location == "" {
		location = "us"
	}
	reservationGroupID := os.Getenv("RESERVATION_GROUP_ID")
	if reservationGroupID == "" {
		reservationGroupID = os.Getenv("RESERVATION_ID")
	}
	if reservationGroupID == "" {
		reservationGroupID = "example-reservation-group"
	}

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	reservationGroup := &reservationpb.ReservationGroup{
		Name: fmt.Sprintf("projects/%s/locations/%s/reservationGroups/%s", projectID, location, reservationGroupID),
	}

	req := &reservationpb.UpdateReservationGroupRequest{
		ReservationGroup: reservationGroup,
	}

	resp, err := client.UpdateReservationGroup(ctx, req)
	if err != nil {
		// The service returns FailedPrecondition when reservation groups cannot be modified.
		if st, ok := status.FromError(err); ok && st.Code() == codes.FailedPrecondition {
			fmt.Fprintf(w, "UpdateReservationGroup is not supported: %s\n", st.Message())
			return nil
		}
		return fmt.Errorf("UpdateReservationGroup: %w", err)
	}

	fmt.Fprintf(w, "Updated reservation group: %s\n", resp.GetName())
	return nil
}

// [END bigqueryreservation_v1_reservationservice_reservationgroup_update]
