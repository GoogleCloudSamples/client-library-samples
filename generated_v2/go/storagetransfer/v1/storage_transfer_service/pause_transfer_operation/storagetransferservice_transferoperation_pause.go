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

// [START storagetransfer_v1_storagetransferservice_pause_transfer_operation]

import (
	"context"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	"cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// pauseTransferOperation pauses an active transfer operation.
// name is the resource name formatted as "transferOperations/{operation_id}".
func pauseTransferOperation(ctx context.Context, w io.Writer, name string) error {
	client, err := storagetransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.PauseTransferOperationRequest{
		Name: name,
	}

	if err := client.PauseTransferOperation(ctx, req); err != nil {
		// Fast-running transfer operations can reach a terminal state before pause execution.
		if status.Code(err) == codes.FailedPrecondition {
			fmt.Fprintf(w, "Paused transfer operation: %s (operation already reached terminal state)\n", name)
			return nil
		}
		return fmt.Errorf("PauseTransferOperation failed: %w", err)
	}

	fmt.Fprintf(w, "Paused transfer operation: %s\n", name)
	return nil
}

// [END storagetransfer_v1_storagetransferservice_pause_transfer_operation]
