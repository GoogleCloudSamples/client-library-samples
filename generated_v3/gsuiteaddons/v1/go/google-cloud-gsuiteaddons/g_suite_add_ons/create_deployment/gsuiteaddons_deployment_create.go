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

// [START gsuiteaddons_v1_gsuiteaddons_deployment_create]

import (
	"context"
	"fmt"
	"io"

	gsuiteaddons "cloud.google.com/go/gsuiteaddons/apiv1"
	gsuiteaddonspb "cloud.google.com/go/gsuiteaddons/apiv1/gsuiteaddonspb"
)

// createDeployment creates a deployment for a Google Workspace add-on.
func createDeployment(ctx context.Context, w io.Writer, deploymentID string, projectID string) error {
	parent := fmt.Sprintf("projects/%s", projectID)
	deployment := &gsuiteaddonspb.Deployment{
		AddOns: &gsuiteaddonspb.AddOns{},
	}

	client, err := gsuiteaddons.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &gsuiteaddonspb.CreateDeploymentRequest{
		Parent:       parent,
		DeploymentId: deploymentID,
		Deployment:   deployment,
	}

	response, err := client.CreateDeployment(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateDeployment: %w", err)
	}

	fmt.Fprintf(w, "Created deployment: %s\n", response.GetName())
	return nil
}

// [END gsuiteaddons_v1_gsuiteaddons_deployment_create]
