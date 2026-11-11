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

// [START livestream_v1_livestreamservice_input_get]
import (
	"context"
	"fmt"
	"io"

	livestream "cloud.google.com/go/video/livestream/apiv1"
	livestreampb "cloud.google.com/go/video/livestream/apiv1/livestreampb"
)

// getInput retrieves an input resource.
func getInput(ctx context.Context, w io.Writer, projectID string, locationID string, inputID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/inputs/%s", projectID, locationID, inputID)

	client, err := livestream.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &livestreampb.GetInputRequest{
		Name: name,
	}

	response, err := client.GetInput(ctx, req)
	if err != nil {
		return fmt.Errorf("GetInput: %w", err)
	}

	fmt.Fprintf(w, "Input: %v\n", response.GetName())

	return nil
}

// [END livestream_v1_livestreamservice_input_get]
