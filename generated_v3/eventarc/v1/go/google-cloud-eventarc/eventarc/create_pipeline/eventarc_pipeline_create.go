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

// [START eventarc_v1_eventarc_pipeline_create]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	"cloud.google.com/go/eventarc/apiv1/eventarcpb"
)

// Use the CreatePipeline method.
func createPipeline(ctx context.Context, w io.Writer, pipelineID string, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)

	destination := &eventarcpb.Pipeline_Destination{
		DestinationDescriptor: &eventarcpb.Pipeline_Destination_HttpEndpoint_{
			HttpEndpoint: &eventarcpb.Pipeline_Destination_HttpEndpoint{
				Uri: "https://example.com",
			},
		},
	}

	pipeline := &eventarcpb.Pipeline{
		Destinations: []*eventarcpb.Pipeline_Destination{destination},
	}

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.CreatePipelineRequest{
		Parent:     parent,
		Pipeline:   pipeline,
		PipelineId: pipelineID,
	}

	op, err := client.CreatePipeline(ctx, req)
	if err != nil {
		return fmt.Errorf("CreatePipeline failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created pipeline: %s\n", resp.GetName())

	return nil
}

// [END eventarc_v1_eventarc_pipeline_create]
