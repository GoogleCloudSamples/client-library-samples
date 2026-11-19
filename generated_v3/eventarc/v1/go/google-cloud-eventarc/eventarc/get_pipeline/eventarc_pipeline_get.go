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

// [START eventarc_v1_eventarc_pipeline_get]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	eventarcpb "cloud.google.com/go/eventarc/apiv1/eventarcpb"
)

// getPipeline retrieves an existing Eventarc pipeline.
func getPipeline(ctx context.Context, w io.Writer, projectID string, locationID string, pipelineID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/pipelines/%s", projectID, locationID, pipelineID)

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("eventarc.NewClient: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.GetPipelineRequest{
		Name: name,
	}

	pipeline, err := client.GetPipeline(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetPipeline: %w", err)
	}

	fmt.Fprintf(w, "Retrieved pipeline: %s\n", pipeline.GetName())
	return nil
}

// [END eventarc_v1_eventarc_pipeline_get]
