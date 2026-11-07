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

// [START storagetransfer_v1_storagetransferservice_googleserviceaccount_get]

import (
	"context"
	"fmt"
	"io"

	storagetransfer "cloud.google.com/go/storagetransfer/apiv1"
	storagetransferpb "cloud.google.com/go/storagetransfer/apiv1/storagetransferpb"
)

// getGoogleServiceAccount retrieves the Storage Transfer Service service account for a project.
func getGoogleServiceAccount(ctx context.Context, w io.Writer, projectID string) error {
	client, err := storagetransfer.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &storagetransferpb.GetGoogleServiceAccountRequest{
		ProjectId: projectID,
	}

	resp, err := client.GetGoogleServiceAccount(ctx, req)
	if err != nil {
		return fmt.Errorf("GetGoogleServiceAccount: %w", err)
	}

	fmt.Fprintf(w, "Retrieved Storage Transfer Service service account: %s\n", resp.GetAccountEmail())
	return nil
}

// [END storagetransfer_v1_storagetransferservice_googleserviceaccount_get]
