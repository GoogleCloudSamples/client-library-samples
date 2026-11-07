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

// [START storagetransfer_v1_storagetransferservice_transferjob_update]

import (
	"context"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	"cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateTransferJob updates an existing transfer job in Google Cloud Storage Transfer Service.
func updateTransferJob(ctx context.Context, w io.Writer, projectID string) error {
	jobName := "transferJobs/example-job-name"
	transferJob := &storagetransferpb.TransferJob{
		Description: "Updated transfer job description",
		Status:      storagetransferpb.TransferJob_ENABLED,
	}

	// Specify the user project for billing and API enablement checks.
	client, err := storagetransfer.NewClient(ctx, option.WithQuotaProject(projectID))
	if err != nil {
		return fmt.Errorf("storagetransfer.NewClient: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.UpdateTransferJobRequest{
		JobName:     jobName,
		ProjectId:   projectID,
		TransferJob: transferJob,
		UpdateTransferJobFieldMask: &fieldmaskpb.FieldMask{
			Paths: []string{"description", "status"},
		},
	}

	resp, err := client.UpdateTransferJob(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateTransferJob: %w", err)
	}

	fmt.Fprintf(w, "Updated transfer job: %s\n", resp.GetName())
	return nil
}

// [END storagetransfer_v1_storagetransferservice_transferjob_update]
