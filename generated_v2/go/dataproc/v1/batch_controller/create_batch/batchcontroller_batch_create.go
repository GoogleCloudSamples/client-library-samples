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

// [START dataproc_v1_batchcontroller_batch_create]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	"cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// createBatch creates a Dataproc Serverless batch workload.
func createBatch(ctx context.Context, w io.Writer, projectID string, locationID string, batchID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	sparkBatch := &dataprocpb.SparkBatch{
		Driver: &dataprocpb.SparkBatch_MainJarFileUri{
			MainJarFileUri: "file:///usr/lib/spark/examples/jars/spark-examples.jar",
		},
		Args: []string{"1000"},
	}
	batch := &dataprocpb.Batch{
		BatchConfig: &dataprocpb.Batch_SparkBatch{
			SparkBatch: sparkBatch,
		},
	}

	// Dataproc Serverless batches require regional API endpoints.
	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)
	client, err := dataproc.NewBatchControllerClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewBatchControllerClient failed: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.CreateBatchRequest{
		Parent:  parent,
		Batch:   batch,
		BatchId: batchID,
	}

	op, err := client.CreateBatch(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateBatch failed: %w", err)
	}

	batchName := fmt.Sprintf("%s/batches/%s", parent, batchID)
	if meta, err := op.Metadata(); err == nil && meta.GetBatch() != "" {
		batchName = meta.GetBatch()
	}

	fmt.Fprintf(w, "Batch created: %s\n", batchName)
	return nil
}

// [END dataproc_v1_batchcontroller_batch_create]
