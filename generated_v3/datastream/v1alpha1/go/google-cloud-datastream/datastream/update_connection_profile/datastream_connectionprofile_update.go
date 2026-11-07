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

// [START datastream_v1alpha1_datastream_connectionprofile_update]

import (
	"context"
	"fmt"
	"io"

	datastream "cloud.google.com/go/datastream/apiv1alpha1"
	datastreampb "cloud.google.com/go/datastream/apiv1alpha1/datastreampb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateConnectionProfile updates an existing connection profile display name.
func updateConnectionProfile(ctx context.Context, w io.Writer, projectID string, locationID string, connectionProfileID string) error {
	connectionProfile := &datastreampb.ConnectionProfile{
		Name:        fmt.Sprintf("projects/%s/locations/%s/connectionProfiles/%s", projectID, locationID, connectionProfileID),
		DisplayName: "Updated Connection Profile",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := datastream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &datastreampb.UpdateConnectionProfileRequest{
		UpdateMask:        updateMask,
		ConnectionProfile: connectionProfile,
	}

	op, err := client.UpdateConnectionProfile(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateConnectionProfile: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Successfully updated connection profile: %s\n", resp.GetName())
	return nil
}

// [END datastream_v1alpha1_datastream_connectionprofile_update]
