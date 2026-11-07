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

// [START dialogflow_v3_experiments_experiment_delete]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
)

// deleteExperiment deletes an existing experiment in Dialogflow CX.
func deleteExperiment(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, environmentID string, experimentID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/environments/%s/experiments/%s", projectID, locationID, agentID, environmentID, experimentID)

	opts := []option.ClientOption{
		option.WithQuotaProject(projectID),
	}
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewExperimentsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewExperimentsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.DeleteExperimentRequest{
		Name: name,
	}

	if err := client.DeleteExperiment(ctx, req); err != nil {
		return fmt.Errorf("DeleteExperiment: %w", err)
	}

	fmt.Fprintf(w, "Deleted experiment: %s\n", name)

	return nil
}

// [END dialogflow_v3_experiments_experiment_delete]
