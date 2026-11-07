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

// [START dialogflow_v3_environments_deploy_flow]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// deployFlow deploys a specified flow version to an environment.
func deployFlow(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, environmentID string, flowID string, versionID string) error {
	flowVersion := fmt.Sprintf("projects/%s/locations/%s/agents/%s/flows/%s/versions/%s", projectID, locationID, agentID, flowID, versionID)
	environment := fmt.Sprintf("projects/%s/locations/%s/agents/%s/environments/%s", projectID, locationID, agentID, environmentID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewEnvironmentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewEnvironmentsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.DeployFlowRequest{
		Environment: environment,
		FlowVersion: flowVersion,
	}

	op, err := client.DeployFlow(ctx, req)
	if err != nil {
		return fmt.Errorf("DeployFlow: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait: %w", err)
	}

	fmt.Fprintf(w, "Deployed flow version to environment: %s\n", resp.GetEnvironment().GetName())
	return nil
}

// [END dialogflow_v3_environments_deploy_flow]
