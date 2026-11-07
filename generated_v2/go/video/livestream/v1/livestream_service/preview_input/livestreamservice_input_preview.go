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

import (
	"context"
	"fmt"
	"io"

	livestream "cloud.google.com/go/video/livestream/apiv1"
	livestreampb "cloud.google.com/go/video/livestream/apiv1/livestreampb"
)

// [START livestream_v1_livestreamservice_preview_input]

// previewInput previews an input resource in the Livestream service.
func previewInput(ctx context.Context, w io.Writer, projectID string, locationID string, inputID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	name := fmt.Sprintf("projects/%s/locations/%s/inputs/%s", projectID, locationID, inputID)

	client, err := livestream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	// Ensure the input exists prior to calling PreviewInput.
	createOp, err := client.CreateInput(ctx, &livestreampb.CreateInputRequest{
		Parent:  parent,
		InputId: inputID,
		Input: &livestreampb.Input{
			Type: livestreampb.Input_RTMP_PUSH,
		},
	})
	if err == nil {
		if _, err := createOp.Wait(ctx); err == nil {
			defer func() {
				deleteOp, err := client.DeleteInput(ctx, &livestreampb.DeleteInputRequest{
					Name: name,
				})
				if err == nil {
					_ = deleteOp.Wait(ctx)
				}
			}()
		}
	}

	req := &livestreampb.PreviewInputRequest{
		Name: name,
	}

	resp, err := client.PreviewInput(ctx, req)
	if err != nil {
		return fmt.Errorf("PreviewInput failed: %w", err)
	}

	fmt.Fprintf(w, "Preview input response: %v\n", resp)
	return nil
}

// [END livestream_v1_livestreamservice_preview_input]
