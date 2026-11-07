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

// [START analyticshub_v1_reservationservice_bireservation_update]

import (
	"context"
	"fmt"
	"io"
	"os"

	reservation "cloud.google.com/go/bigquery/reservation/apiv1"
	reservationpb "cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateBiReservation updates the BI reservation size for the specified project and location.
func updateBiReservation(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project"
	}
	location := os.Getenv("GOOGLE_CLOUD_LOCATION")
	if location == "" {
		location = "us-central1"
	}

	client, err := reservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	// BI reservation resource name format: projects/{project}/locations/{location}/biReservation
	biReservationPath := fmt.Sprintf("projects/%s/locations/%s/biReservation", projectID, location)

	// Set reservation size in bytes (for example, 1073741824 bytes = 1 GB).
	req := &reservationpb.UpdateBiReservationRequest{
		BiReservation: &reservationpb.BiReservation{
			Name: biReservationPath,
			Size: 1073741824,
		},
		UpdateMask: &fieldmaskpb.FieldMask{
			Paths: []string{"size"},
		},
	}

	response, err := client.UpdateBiReservation(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateBiReservation failed: %w", err)
	}

	fmt.Fprintf(w, "Updated BI reservation: %s\n", response.GetName())
	fmt.Fprintf(w, "Size: %d bytes\n", response.GetSize())

	return nil
}

// [END analyticshub_v1_reservationservice_bireservation_update]
