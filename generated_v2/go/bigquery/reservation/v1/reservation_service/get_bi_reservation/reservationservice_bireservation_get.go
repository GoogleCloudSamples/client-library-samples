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

// [START bigqueryreservation_v1_reservationservice_bireservation_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	bigqueryreservation "cloud.google.com/go/bigquery/reservation/apiv1"
	"cloud.google.com/go/bigquery/reservation/apiv1/reservationpb"
	"cloud.google.com/go/compute/metadata"
	"golang.org/x/oauth2/google"
)

// getBiReservation retrieves the BI reservation for a given project and location.
func getBiReservation(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	if projectID == "" {
		if env := os.Getenv("GOOGLE_CLOUD_PROJECT"); env != "" {
			projectID = env
		} else if env := os.Getenv("PROJECT_ID"); env != "" {
			projectID = env
		} else if env := os.Getenv("GCP_PROJECT"); env != "" {
			projectID = env
		} else if creds, err := google.FindDefaultCredentials(ctx); err == nil && creds.ProjectID != "" {
			projectID = creds.ProjectID
		} else if metadata.OnGCE() {
			if id, err := metadata.ProjectID(); err == nil && id != "" {
				projectID = id
			}
		}
	}
	if locationID == "" {
		if env := os.Getenv("LOCATION_ID"); env != "" {
			locationID = env
		} else if env := os.Getenv("GOOGLE_CLOUD_LOCATION"); env != "" {
			locationID = env
		} else if env := os.Getenv("LOCATION"); env != "" {
			locationID = env
		} else {
			locationID = "US"
		}
	}

	name := fmt.Sprintf("projects/%s/locations/%s/biReservation", projectID, locationID)

	client, err := bigqueryreservation.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryreservation.NewClient: %w", err)
	}
	defer client.Close()

	req := &reservationpb.GetBiReservationRequest{
		Name: name,
	}

	resp, err := client.GetBiReservation(ctx, req)
	if err != nil {
		return fmt.Errorf("GetBiReservation: %w", err)
	}

	fmt.Fprintf(w, "Retrieved BI reservation: %s (size: %d bytes)\n", resp.GetName(), resp.GetSize())
	return nil
}

// [END bigqueryreservation_v1_reservationservice_bireservation_get]
