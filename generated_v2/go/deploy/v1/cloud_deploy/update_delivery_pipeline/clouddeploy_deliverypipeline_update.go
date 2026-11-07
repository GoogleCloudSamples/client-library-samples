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

// [START clouddeploy_v1_clouddeploy_deliverypipeline_update]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateDeliveryPipeline updates an existing Cloud Deploy delivery pipeline description.
func updateDeliveryPipeline(ctx context.Context, w io.Writer, projectID string, locationID string, deliveryPipelineID string) error {
	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	deliveryPipeline := &deploypb.DeliveryPipeline{
		Name:        fmt.Sprintf("projects/%s/locations/%s/deliveryPipelines/%s", projectID, locationID, deliveryPipelineID),
		Description: "Updated description",
	}

	req := &deploypb.UpdateDeliveryPipelineRequest{
		UpdateMask:       updateMask,
		DeliveryPipeline: deliveryPipeline,
	}

	op, err := client.UpdateDeliveryPipeline(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateDeliveryPipeline: %w", err)
	}

	pipeline, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Updated delivery pipeline: %s\n", pipeline.GetName())
	return nil
}

// [END clouddeploy_v1_clouddeploy_deliverypipeline_update]
