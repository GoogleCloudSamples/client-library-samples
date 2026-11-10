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

// [START clouddeploy_v1_clouddeploy_customtargettype_create]

import (
	"context"
	"fmt"
	"io"

	clouddeploy "cloud.google.com/go/deploy/apiv1"
	deploypb "cloud.google.com/go/deploy/apiv1/deploypb"
)

// createCustomTargetType creates a custom target type in Google Cloud Deploy.
func createCustomTargetType(ctx context.Context, w io.Writer, projectID string, customTargetTypeID string) error {
	locationName := "us-central1"
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationName)
	customTargetType := &deploypb.CustomTargetType{
		Description: "Example Custom Target Type",
	}

	client, err := clouddeploy.NewCloudDeployClient(ctx)
	if err != nil {
		return fmt.Errorf("NewCloudDeployClient: %w", err)
	}
	defer client.Close()

	req := &deploypb.CreateCustomTargetTypeRequest{
		Parent:             parent,
		CustomTargetTypeId: customTargetTypeID,
		CustomTargetType:   customTargetType,
	}

	op, err := client.CreateCustomTargetType(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateCustomTargetType: %w", err)
	}

	response, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Created custom target type: %s\n", response.GetName())
	return nil
}

// [END clouddeploy_v1_clouddeploy_customtargettype_create]
