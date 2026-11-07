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

// [START bigqueryreservation_v1_reservationservice_bireservation_update]

import (
	"context"
	"fmt"
	"io"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	"cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateBiReservation updates the capacity size of a BigQuery BI reservation.
func updateBiReservation(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryreservation.NewClient: %w", err)
	}
	defer client.Close()

	biReservation := &reservationpb.BiReservation{
		Name: fmt.Sprintf("projects/%s/locations/%s/biReservation", projectID, locationID),
		Size: 1073741824, // 1 GiB in bytes
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"size"},
	}

	req := &reservationpb.UpdateBiReservationRequest{
		BiReservation: biReservation,
		UpdateMask:    updateMask,
	}

	resp, err := client.UpdateBiReservation(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateBiReservation: %w", err)
	}

	fmt.Fprintf(w, "Updated BI reservation: %s, size: %d bytes\n", resp.GetName(), resp.GetSize())
	return nil
}

// [END bigqueryreservation_v1_reservationservice_bireservation_update]
