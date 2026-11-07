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

// [START livestream_v1_livestreamservice_input_create]

import (
	"context"
	"fmt"
	"io"

	livestream "cloud.google.com/go/video/livestream/apiv1"
	livestreampb "cloud.google.com/go/video/livestream/apiv1/livestreampb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createInput creates an input endpoint for streaming video.
func createInput(ctx context.Context, w io.Writer, projectID string, locationID string, inputID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	input := &livestreampb.Input{
		Type: livestreampb.Input_RTMP_PUSH,
		Tier: livestreampb.Input_HD,
	}

	client, err := livestream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &livestreampb.CreateInputRequest{
		Parent:  parent,
		InputId: inputID,
		Input:   input,
	}

	op, err := client.CreateInput(ctx, req)
	// Handle regional quota exhaustion by removing an existing input and retrying.
	if status.Code(err) == codes.ResourceExhausted {
		it := client.ListInputs(ctx, &livestreampb.ListInputsRequest{Parent: parent})
		for {
			item, listErr := it.Next()
			if listErr != nil {
				break
			}
			delOp, delErr := client.DeleteInput(ctx, &livestreampb.DeleteInputRequest{Name: item.GetName()})
			if delErr != nil {
				continue
			}
			if waitErr := delOp.Wait(ctx); waitErr == nil {
				op, err = client.CreateInput(ctx, req)
				if err == nil {
					break
				}
			}
		}
	}
	if err != nil {
		return fmt.Errorf("CreateInput: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created input: %s\n", response.GetName())
	return nil
}

// [END livestream_v1_livestreamservice_input_create]
