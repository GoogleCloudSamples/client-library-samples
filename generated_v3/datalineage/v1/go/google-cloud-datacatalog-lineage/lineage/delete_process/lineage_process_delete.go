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

// [START datalineage_v1_lineage_process_delete]

import (
	"context"
	"fmt"
	"io"

	datalineage "cloud.google.com/go/datacatalog/lineage/apiv1"
	lineagepb "cloud.google.com/go/datacatalog/lineage/apiv1/lineagepb"
)

// deleteProcess deletes a lineage process.
func deleteProcess(ctx context.Context, w io.Writer, projectID string, locationID string, processID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/processes/%s", projectID, locationID, processID)

	client, err := datalineage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datalineage.NewClient: %w", err)
	}
	defer client.Close()

	req := &lineagepb.DeleteProcessRequest{
		Name: name,
	}

	op, err := client.DeleteProcess(ctx, req)
	if err != nil {
		return fmt.Errorf("client.DeleteProcess: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("DeleteProcess wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted process: %s\n", name)
	return nil
}

// [END datalineage_v1_lineage_process_delete]
