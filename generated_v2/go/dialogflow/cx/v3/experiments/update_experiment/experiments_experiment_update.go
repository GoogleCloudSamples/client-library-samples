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

// [START dialogflow_v3_experiments_experiment_update]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateExperiment updates the description of an existing Dialogflow CX experiment.
func updateExperiment(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, environmentID string, experimentID string) error {
	experiment := &cxpb.Experiment{
		Name:        fmt.Sprintf("projects/%s/locations/%s/agents/%s/environments/%s/experiments/%s", projectID, locationID, agentID, environmentID, experimentID),
		Description: "Updated experiment description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewExperimentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewExperimentsClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.UpdateExperimentRequest{
		Experiment: experiment,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateExperiment(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateExperiment failed: %w", err)
	}

	fmt.Fprintf(w, "Updated experiment: %s\n", resp.GetName())

	return nil
}

// [END dialogflow_v3_experiments_experiment_update]
