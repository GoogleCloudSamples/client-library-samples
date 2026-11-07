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

// [START storagetransfer_v1_storagetransferservice_transferjob_delete]

import (
	"context"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	"cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
)

// deleteTransferJob deletes a transfer job in Storage Transfer Service.
func deleteTransferJob(ctx context.Context, w io.Writer, projectID string, jobName string) error {
	client, err := storagetransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.DeleteTransferJobRequest{
		JobName:   jobName,
		ProjectId: projectID,
	}

	if err := client.DeleteTransferJob(ctx, req); err != nil {
		return fmt.Errorf("client.DeleteTransferJob: %w", err)
	}

	fmt.Fprintf(w, "Deleted transfer job: %s\n", jobName)
	return nil
}

// [END storagetransfer_v1_storagetransferservice_transferjob_delete]
