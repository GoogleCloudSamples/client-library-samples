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

// [START vmmigration_v1_vmmigration_source_get]

import (
	"context"
	"fmt"
	"io"

	vmmigration "cloud.google.com/go/vmmigration/apiv1"
	vmmigrationpb "cloud.google.com/go/vmmigration/apiv1/vmmigrationpb"
)

// getSource retrieves a VM Migration source.
func getSource(ctx context.Context, w io.Writer, projectID string, locationID string, sourceID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/sources/%s", projectID, locationID, sourceID)

	client, err := vmmigration.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &vmmigrationpb.GetSourceRequest{
		Name: name,
	}

	source, err := client.GetSource(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSource: %w", err)
	}

	fmt.Fprintf(w, "Retrieved source: %s\n", source.GetName())
	return nil
}

// [END vmmigration_v1_vmmigration_source_get]
