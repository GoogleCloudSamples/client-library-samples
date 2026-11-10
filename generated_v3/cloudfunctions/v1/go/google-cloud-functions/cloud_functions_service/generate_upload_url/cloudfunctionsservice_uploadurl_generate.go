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

// [START firestore-metadata_v1_cloudfunctionsservice_generate_upload_url]

import (
	"context"
	"fmt"
	"io"
	"os"

	functions "cloud.google.com/go/functions/apiv1"
	"cloud.google.com/go/functions/apiv1/functionspb"
)

// generateUploadUrl generates a signed upload URL for Cloud Functions source code deployment.
func generateUploadUrl(ctx context.Context, w io.Writer) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	location := "us-central1"
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	client, err := functions.NewCloudFunctionsClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudFunctionsClient: %w", err)
	}
	defer client.Close()

	req := &functionspb.GenerateUploadUrlRequest{
		Parent: parent,
	}

	resp, err := client.GenerateUploadUrl(ctx, req)
	if err != nil {
		return fmt.Errorf("GenerateUploadUrl: %w", err)
	}

	fmt.Fprintf(w, "Upload URL: %s\n", resp.GetUploadUrl())
	return nil
}

// [END firestore-metadata_v1_cloudfunctionsservice_generate_upload_url]
