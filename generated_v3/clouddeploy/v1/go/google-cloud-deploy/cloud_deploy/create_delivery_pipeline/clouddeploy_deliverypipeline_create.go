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

// [START clouddeploy_v1_clouddeploy_deliverypipeline_create]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
)

// createDeliveryPipeline creates a new delivery pipeline in Cloud Deploy.
func createDeliveryPipeline(ctx context.Context, w io.Writer, projectID string, deliveryPipelineID string) error {
	locationName := "us-central1"
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationName)
	deliveryPipeline := &deploypb.DeliveryPipeline{
		Description: "Example delivery pipeline",
	}

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	req := &deploypb.CreateDeliveryPipelineRequest{
		Parent:             parent,
		DeliveryPipelineId: deliveryPipelineID,
		DeliveryPipeline:   deliveryPipeline,
	}

	op, err := client.CreateDeliveryPipeline(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDeliveryPipeline failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait for delivery pipeline creation failed: %w", err)
	}

	fmt.Fprintf(w, "Created delivery pipeline: %s\n", resp.GetName())

	return nil
}

// [END clouddeploy_v1_clouddeploy_deliverypipeline_create]
