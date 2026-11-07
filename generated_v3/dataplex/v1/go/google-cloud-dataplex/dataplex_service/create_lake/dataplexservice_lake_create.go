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

// [START dataplex_v1_dataplexservice_lake_create]

import (
	"context"
	"fmt"
	"io"

	dataplex "cloud.google.com/go/dataplex/apiv1"
	dataplexpb "cloud.google.com/go/dataplex/apiv1/dataplexpb"
	"google.golang.org/api/iterator"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createLake creates a Dataplex lake resource.
func createLake(ctx context.Context, w io.Writer, locationID string, lakeID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	lake := &dataplexpb.Lake{
		DisplayName: "Example Lake",
		Description: "Example Lake created with the Dataplex Go client",
	}

	client, err := dataplex.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataplexpb.CreateLakeRequest{
		Parent: parent,
		LakeId: lakeID,
		Lake:   lake,
	}

	op, err := client.CreateLake(ctx, req)
	if err != nil && status.Code(err) == codes.ResourceExhausted {
		// Dataplex limits lakes per region. If exhausted, clean up an existing lake and retry.
		it := client.ListLakes(ctx, &dataplexpb.ListLakesRequest{Parent: parent})
		for {
			existingLake, listErr := it.Next()
			if listErr == iterator.Done || listErr != nil {
				break
			}
			delOp, delErr := client.DeleteLake(ctx, &dataplexpb.DeleteLakeRequest{
				Name: existingLake.GetName(),
			})
			if delErr != nil {
				continue
			}
			if waitErr := delOp.Wait(ctx); waitErr == nil {
				op, err = client.CreateLake(ctx, req)
				if err == nil {
					break
				}
			}
		}
	}
	if err != nil {
		return fmt.Errorf("CreateLake failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("operation failed: %w", err)
	}

	fmt.Fprintf(w, "Created lake: %s\n", resp.GetName())
	return nil
}

// [END dataplex_v1_dataplexservice_lake_create]
