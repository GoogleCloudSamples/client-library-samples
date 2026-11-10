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

// [START vmmigration_v1_vmmigration_imageimports_list]

import (
	"context"
	"fmt"
	"io"

	vmmigration "cloud.google.com/go/vmmigration/apiv1"
	vmmigrationpb "cloud.google.com/go/vmmigration/apiv1/vmmigrationpb"
	"google.golang.org/api/iterator"
)

// listImageImports lists image imports in the specified location.
func listImageImports(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := vmmigration.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &vmmigrationpb.ListImageImportsRequest{
		Parent: parent,
	}

	it := client.ListImageImports(ctx, req)
	var count int
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("it.Next: %w", err)
		}
		fmt.Fprintf(w, "Image import: %s\n", resp.GetName())
		count++
	}

	fmt.Fprintf(w, "Found %d image import(s) in %s\n", count, parent)
	return nil
}

// [END vmmigration_v1_vmmigration_imageimports_list]
