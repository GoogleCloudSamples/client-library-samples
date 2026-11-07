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

// [START dialogflow_v3beta1_deployments_deployment_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// getDeployment retrieves a deployment in a Dialogflow CX environment.
func getDeployment(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, environmentID string, deploymentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/environments/%s/deployments/%s", projectID, locationID, agentID, environmentID, deploymentID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	opts = append(opts, option.WithQuotaProject(projectID))

	client, err := dialogflow.NewDeploymentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewDeploymentsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.GetDeploymentRequest{
		Name: name,
	}

	deployment, err := client.GetDeployment(ctx, req)
	if err != nil {
		return fmt.Errorf("GetDeployment: %w", err)
	}

	fmt.Fprintf(w, "Deployment: %s\n", deployment.GetName())
	fmt.Fprintf(w, "State: %s\n", deployment.GetState())

	return nil
}

// [END dialogflow_v3beta1_deployments_deployment_get]
