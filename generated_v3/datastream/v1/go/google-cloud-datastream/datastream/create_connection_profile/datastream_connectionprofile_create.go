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

// [START datastream_v1_datastream_connectionprofile_create]

import (
	"context"
	"fmt"
	"io"

	datastream "cloud.google.com/go/datastream/apiv1"
	datastreampb "cloud.google.com/go/datastream/apiv1/datastreampb"
)

// createConnectionProfile creates a new Datastream connection profile.
func createConnectionProfile(ctx context.Context, w io.Writer, connectionProfileID string, projectID string, locationID string) error {
	client, err := datastream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	connectionProfile := &datastreampb.ConnectionProfile{
		DisplayName: "Example BigQuery Destination",
		Profile: &datastreampb.ConnectionProfile_BigqueryProfile{
			BigqueryProfile: &datastreampb.BigQueryProfile{},
		},
	}

	req := &datastreampb.CreateConnectionProfileRequest{
		Parent:              parent,
		ConnectionProfileId: connectionProfileID,
		ConnectionProfile:   connectionProfile,
	}

	op, err := client.CreateConnectionProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateConnectionProfile failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("operation Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Connection profile created: %s\n", resp.GetName())
	return nil
}

// [END datastream_v1_datastream_connectionprofile_create]
