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

// [START geminidataanalytics_v1_dataagentservice_dataagent_update]

import (
	"context"
	"fmt"
	"io"

	geminidataanalytics "cloud.google.com/go/geminidataanalytics/apiv1beta"
	geminidataanalyticspb "cloud.google.com/go/geminidataanalytics/apiv1beta/geminidataanalyticspb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateDataAgent updates the description of an existing DataAgent and waits for the operation to finish.
func updateDataAgent(ctx context.Context, w io.Writer, projectID string, locationID string, dataAgentID string) error {
	dataAgent := &geminidataanalyticspb.DataAgent{
		Name:        fmt.Sprintf("projects/%s/locations/%s/dataAgents/%s", projectID, locationID, dataAgentID),
		Description: "Updated description",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}

	client, err := geminidataanalytics.NewDataAgentClient(ctx)
	if err != nil {
		return fmt.Errorf("NewDataAgentClient failed: %w", err)
	}
	defer client.Close()

	req := &geminidataanalyticspb.UpdateDataAgentRequest{
		DataAgent:  dataAgent,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateDataAgent(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateDataAgent failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated DataAgent: %s\n", resp.GetName())
	return nil
}

// [END geminidataanalytics_v1_dataagentservice_dataagent_update]
