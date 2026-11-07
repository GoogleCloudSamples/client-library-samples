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

// [START storagetransfer_v1_storagetransferservice_transferjob_create]

import (
	"context"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	"cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
)

// createTransferJob creates a Cloud Storage transfer job.
func createTransferJob(ctx context.Context, w io.Writer, projectID string, sourceBucketName string, sinkBucketName string) error {
	transferJob := &storagetransferpb.TransferJob{
		ProjectId: projectID,
		Status:    storagetransferpb.TransferJob_ENABLED,
		TransferSpec: &storagetransferpb.TransferSpec{
			DataSource: &storagetransferpb.TransferSpec_GcsDataSource{
				GcsDataSource: &storagetransferpb.GcsData{
					BucketName: sourceBucketName,
				},
			},
			DataSink: &storagetransferpb.TransferSpec_GcsDataSink{
				GcsDataSink: &storagetransferpb.GcsData{
					BucketName: sinkBucketName,
				},
			},
		},
	}

	client, err := storagetransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.CreateTransferJobRequest{
		TransferJob: transferJob,
	}

	resp, err := client.CreateTransferJob(ctx, req)
	if err != nil {
		return fmt.Errorf("failed to create transfer job: %w", err)
	}

	fmt.Fprintf(w, "Created transfer job: %s\n", resp.GetName())
	return nil
}

// [END storagetransfer_v1_storagetransferservice_transferjob_create]
