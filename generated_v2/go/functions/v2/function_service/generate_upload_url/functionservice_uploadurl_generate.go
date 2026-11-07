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

// [START firestore-metadata_v2_functionservice_generate_upload_url]

import (
	"context"
	"fmt"
	"io"

	functions "cloud.google.com/go/functions/apiv2"
	functionspb "cloud.google.com/go/functions/apiv2/functionspb"
)

// generateUploadUrl generates a signed upload URL for deploying Cloud Functions source code.
func generateUploadUrl(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	client, err := functions.NewFunctionClient(ctx)
	if err != nil {
		return fmt.Errorf("NewFunctionClient: %w", err)
	}
	defer client.Close()

	req := &functionspb.GenerateUploadUrlRequest{
		Parent:      parent,
		Environment: functionspb.Environment_GEN_1,
	}

	resp, err := client.GenerateUploadUrl(ctx, req)
	if err != nil {
		return fmt.Errorf("GenerateUploadUrl: %w", err)
	}

	fmt.Fprintf(w, "Upload URL: %s\n", resp.GetUploadUrl())
	return nil
}

// [END firestore-metadata_v2_functionservice_generate_upload_url]
