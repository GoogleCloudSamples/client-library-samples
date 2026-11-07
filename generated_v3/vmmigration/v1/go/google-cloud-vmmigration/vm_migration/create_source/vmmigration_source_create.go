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

// [START vmmigration_v1_vmmigration_source_create]

import (
	"context"
	"fmt"
	"io"

	vmmigration "cloud.google.com/go/vmmigration/apiv1"
	"cloud.google.com/go/vmmigration/apiv1/vmmigrationpb"
)

// createSource creates a migration source in the specified project and location.
func createSource(ctx context.Context, w io.Writer, sourceID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	source := &vmmigrationpb.Source{
		Description: "Source created for migration",
		SourceDetails: &vmmigrationpb.Source_Vmware{
			Vmware: &vmmigrationpb.VmwareSourceDetails{
				Username:  "example-username",
				Password:  "example-password",
				VcenterIp: "10.0.0.1",
			},
		},
	}

	client, err := vmmigration.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &vmmigrationpb.CreateSourceRequest{
		Parent:   parent,
		SourceId: sourceID,
		Source:   source,
	}

	op, err := client.CreateSource(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSource failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created source: %s\n", resp.GetName())
	return nil
}

// [END vmmigration_v1_vmmigration_source_create]
