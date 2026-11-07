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

// [START dataproc_v1_batchcontroller_batch_delete]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	"cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// deleteBatch deletes a Dataproc batch workload.
func deleteBatch(ctx context.Context, w io.Writer, projectID string, dataprocRegionID string, batchID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/batches/%s", projectID, dataprocRegionID, batchID)

	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", dataprocRegionID)
	client, err := dataproc.NewBatchControllerClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewBatchControllerClient failed: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.DeleteBatchRequest{
		Name: name,
	}

	if err := client.DeleteBatch(ctx, req); err != nil {
		return fmt.Errorf("DeleteBatch failed: %w", err)
	}

	fmt.Fprintf(w, "Batch deleted: %s\n", name)
	return nil
}

// [END dataproc_v1_batchcontroller_batch_delete]
