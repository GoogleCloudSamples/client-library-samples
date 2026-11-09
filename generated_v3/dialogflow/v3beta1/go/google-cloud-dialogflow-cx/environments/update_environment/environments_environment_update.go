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

// [START dialogflow_v3beta1_environments_environment_update]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateEnvironment updates the description of a Dialogflow CX environment.
func updateEnvironment(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, environmentID string) error {
	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewEnvironmentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewEnvironmentsClient failed: %w", err)
	}
	defer client.Close()

	environment := &cxpb.Environment{
		Name:        fmt.Sprintf("projects/%s/locations/%s/agents/%s/environments/%s", projectID, locationID, agentID, environmentID),
		Description: "Updated description for the environment",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	req := &cxpb.UpdateEnvironmentRequest{
		Environment: environment,
		UpdateMask:  updateMask,
	}

	op, err := client.UpdateEnvironment(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateEnvironment failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated environment: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3beta1_environments_environment_update]
