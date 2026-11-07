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

// [START storagetransfer_v1_storagetransferservice_transferjobs_list]

import (
	"context"
	"errors"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	"cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
	"google.golang.org/api/iterator"
)

// listTransferJobs lists transfer jobs for a Google Cloud project.
func listTransferJobs(ctx context.Context, w io.Writer, projectID string) error {
	filter := fmt.Sprintf(`{"projectId":"%s"}`, projectID)

	client, err := storagetransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.ListTransferJobsRequest{
		Filter: filter,
	}

	it := client.ListTransferJobs(ctx, req)
	for {
		job, err := it.Next()
		if errors.Is(err, iterator.Done) {
			break
		}
		if err != nil {
			return fmt.Errorf("ListTransferJobs iteration failed: %w", err)
		}
		fmt.Fprintf(w, "Found transfer job: %s\n", job.GetName())
	}

	return nil
}

// [END storagetransfer_v1_storagetransferservice_transferjobs_list]
