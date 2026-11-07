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

// [START clouddeploy_v1_clouddeploy_deliverypipeline_delete]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
)

// deleteDeliveryPipeline deletes an existing Cloud Deploy delivery pipeline.
func deleteDeliveryPipeline(ctx context.Context, w io.Writer, projectID string, deliveryPipelineID string, locationID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/deliveryPipelines/%s", projectID, locationID, deliveryPipelineID)

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient: %w", err)
	}
	defer client.Close()

	req := &deploypb.DeleteDeliveryPipelineRequest{
		Name: name,
	}

	op, err := client.DeleteDeliveryPipeline(ctx, req)
	if err != nil {
		return fmt.Errorf("DeleteDeliveryPipeline: %w", err)
	}

	if err := op.Wait(ctx); err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deleted delivery pipeline: %s\n", name)
	return nil
}

// [END clouddeploy_v1_clouddeploy_deliverypipeline_delete]
