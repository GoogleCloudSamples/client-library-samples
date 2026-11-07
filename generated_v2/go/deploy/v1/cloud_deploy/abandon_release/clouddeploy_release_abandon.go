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

// [START clouddeploy_v1_clouddeploy_abandon_release]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
)

// abandonRelease abandons a specified release in a delivery pipeline.
func abandonRelease(ctx context.Context, w io.Writer, projectID string, locationID string, deliveryPipelineID string, releaseID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/deliveryPipelines/%s/releases/%s", projectID, locationID, deliveryPipelineID, releaseID)

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient failed: %w", err)
	}
	defer client.Close()

	req := &deploypb.AbandonReleaseRequest{
		Name: name,
	}

	_, err = client.AbandonRelease(ctx, req)
	if err != nil {
		return fmt.Errorf("AbandonRelease failed: %w", err)
	}

	fmt.Fprintf(w, "Abandoned release: %s\n", name)
	return nil
}

// [END clouddeploy_v1_clouddeploy_abandon_release]
