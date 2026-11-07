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

// [START certificatemanager_v1_certificatemanager_trustconfig_update]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	certificatemanagerpb "cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
	fieldmaskpb "google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTrustConfig updates the description of an existing TrustConfig.
func updateTrustConfig(ctx context.Context, w io.Writer, projectID string, locationID string, trustConfigID string) error {
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	trustConfig := &certificatemanagerpb.TrustConfig{
		Name:        fmt.Sprintf("projects/%s/locations/%s/trustConfigs/%s", projectID, locationID, trustConfigID),
		Description: "Updated trust config description",
	}

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("certificatemanager.NewClient: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.UpdateTrustConfigRequest{
		TrustConfig: trustConfig,
		UpdateMask:  updateMask,
	}

	op, err := client.UpdateTrustConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateTrustConfig: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated trust config: %s\n", resp.GetName())
	return nil
}

// [END certificatemanager_v1_certificatemanager_trustconfig_update]
