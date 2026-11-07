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

// [START dialogflow_v3beta1_environments_environment_get]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	dialogflowpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// getEnvironment gets a Dialogflow CX environment.
func getEnvironment(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, environmentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/environments/%s", projectID, locationID, agentID, environmentID)

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	opts = append(opts, option.WithQuotaProject(projectID))

	client, err := dialogflow.NewEnvironmentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("dialogflow.NewEnvironmentsClient: %w", err)
	}
	defer client.Close()

	req := &dialogflowpb.GetEnvironmentRequest{
		Name: name,
	}

	resp, err := client.GetEnvironment(ctx, req)
	if err != nil {
		return fmt.Errorf("client.GetEnvironment: %w", err)
	}

	fmt.Fprintf(w, "Environment name: %s\n", resp.GetName())
	fmt.Fprintf(w, "Display name: %s\n", resp.GetDisplayName())

	return nil
}

// [END dialogflow_v3beta1_environments_environment_get]
