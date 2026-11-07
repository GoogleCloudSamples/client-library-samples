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

// [START certificatemanager_v1_certificatemanager_trustconfig_delete]

import (
	"context"
	"fmt"
	"io"

	certificatemanager "cloud.google.com/go/certificatemanager/apiv1"
	"cloud.google.com/go/certificatemanager/apiv1/certificatemanagerpb"
)

// deleteTrustConfig deletes an existing trust config.
func deleteTrustConfig(ctx context.Context, w io.Writer, projectID string, locationID string, trustConfigID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/trustConfigs/%s", projectID, locationID, trustConfigID)

	client, err := certificatemanager.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &certificatemanagerpb.DeleteTrustConfigRequest{
		Name: name,
	}

	op, err := client.DeleteTrustConfig(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteTrustConfig: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted trust config: %s\n", name)
	return nil
}

// [END certificatemanager_v1_certificatemanager_trustconfig_delete]
