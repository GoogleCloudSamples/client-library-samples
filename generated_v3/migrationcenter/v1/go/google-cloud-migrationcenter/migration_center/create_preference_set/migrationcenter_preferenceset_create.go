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

// [START migrationcenter_v1_migrationcenter_preferenceset_create]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
)

// createPreferenceSet creates a preference set in Google Cloud Migration Center.
func createPreferenceSet(ctx context.Context, w io.Writer, preferenceSetID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	preferenceSet := &migrationcenterpb.PreferenceSet{
		DisplayName: "Example Preference Set",
		Description: "Preference set created for migration planning",
	}

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.CreatePreferenceSetRequest{
		Parent:          parent,
		PreferenceSetId: preferenceSetID,
		PreferenceSet:   preferenceSet,
	}

	op, err := client.CreatePreferenceSet(ctx, req)
	if err != nil {
		return fmt.Errorf("CreatePreferenceSet failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for operation failed: %w", err)
	}

	fmt.Fprintf(w, "Created preference set: %s\n", resp.GetName())

	return nil
}

// [END migrationcenter_v1_migrationcenter_preferenceset_create]
