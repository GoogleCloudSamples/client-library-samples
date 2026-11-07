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

// [START dataproc_v1_batchcontroller_batches_list]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	dataprocpb "cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listBatches lists Dataproc batch workloads in a project and location.
func listBatches(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)
	client, err := dataproc.NewBatchControllerClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewBatchControllerClient failed: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.ListBatchesRequest{
		Parent: parent,
	}

	it := client.ListBatches(ctx, req)
	for {
		batch, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate batches: %w", err)
		}
		fmt.Fprintf(w, "Batch: %s\n", batch.GetName())
	}

	return nil
}

// [END dataproc_v1_batchcontroller_batches_list]
