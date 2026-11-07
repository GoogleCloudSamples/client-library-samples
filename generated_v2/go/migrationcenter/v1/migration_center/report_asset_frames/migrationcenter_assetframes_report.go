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

// [START migrationcenter_v1_migrationcenter_report_asset_frames]

import (
	"context"
	"fmt"
	"io"

	migrationcenter "cloud.google.com/go/migrationcenter/apiv1"
	migrationcenterpb "cloud.google.com/go/migrationcenter/apiv1/migrationcenterpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// Use the ReportAssetFrames method.
func reportAssetFrames(ctx context.Context, w io.Writer, projectID string, locationID string, sourceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	source := fmt.Sprintf("projects/%s/locations/%s/sources/%s", projectID, locationID, sourceID)

	machineDetails := &migrationcenterpb.MachineDetails{
		Uuid:        "example-uuid-1234-5678",
		MachineName: "example-machine-1",
		CoreCount:   4,
		MemoryMb:    16384,
		PowerState:  migrationcenterpb.MachineDetails_ACTIVE,
	}

	assetFrame := &migrationcenterpb.AssetFrame{
		ReportTime: timestamppb.Now(),
		FrameData: &migrationcenterpb.AssetFrame_MachineDetails{
			MachineDetails: machineDetails,
		},
	}

	frames := &migrationcenterpb.Frames{
		FramesData: []*migrationcenterpb.AssetFrame{
			assetFrame,
		},
	}

	client, err := migrationcenter.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &migrationcenterpb.ReportAssetFramesRequest{
		Parent: parent,
		Source: source,
		Frames: frames,
	}

	resp, err := client.ReportAssetFrames(ctx, req)
	if err != nil {
		return fmt.Errorf("ReportAssetFrames failed: %w", err)
	}

	fmt.Fprintf(w, "Reported asset frames successfully: %v\n", resp)
	return nil
}

// [END migrationcenter_v1_migrationcenter_report_asset_frames]
