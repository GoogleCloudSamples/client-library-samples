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

// [START dialogflow_v3_generators_generators_list]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listGenerators lists the generators for a specified Dialogflow CX agent.
func listGenerators(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	opts := []option.ClientOption{
		option.WithQuotaProject(projectID),
	}
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewGeneratorsClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("dialogflow.NewGeneratorsClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.ListGeneratorsRequest{
		Parent: parent,
	}

	it := client.ListGenerators(ctx, req)
	for {
		generator, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("failed to iterate generators: %w", err)
		}
		fmt.Fprintf(w, "Generator: %s (%s)\n", generator.GetName(), generator.GetDisplayName())
	}

	return nil
}

// [END dialogflow_v3_generators_generators_list]
