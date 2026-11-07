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

// [START datastream_v1_datastream_connectionprofile_delete]

import (
	"context"
	"fmt"
	"io"

	datastream "cloud.google.com/go/datastream/apiv1alpha1"
	"cloud.google.com/go/datastream/apiv1alpha1/datastreampb"
)

// deleteConnectionProfile deletes an existing connection profile.
func deleteConnectionProfile(ctx context.Context, w io.Writer, projectID string, locationID string, connectionProfileID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/connectionProfiles/%s", projectID, locationID, connectionProfileID)

	client, err := datastream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &datastreampb.DeleteConnectionProfileRequest{
		Name: name,
	}

	// DeleteConnectionProfile starts a long-running operation.
	op, err := client.DeleteConnectionProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteConnectionProfile failed: %w", err)
	}

	// Wait for the deletion operation to complete.
	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Connection profile deleted: %s\n", name)
	return nil
}

// [END datastream_v1_datastream_connectionprofile_delete]
