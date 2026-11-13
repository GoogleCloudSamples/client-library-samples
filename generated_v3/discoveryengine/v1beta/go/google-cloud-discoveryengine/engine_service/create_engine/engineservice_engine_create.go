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

// [START discoveryengine_v1beta_engineservice_engine_create]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	"cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// Use the CreateEngine method.
func createEngine(ctx context.Context, w io.Writer, projectID string, locationID string, collectionID string, engineID string, dataStoreID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/collections/%s", projectID, locationID, collectionID)
	engine := &discoveryenginepb.Engine{
		DisplayName:  "Sample Search Engine",
		SolutionType: discoveryenginepb.SolutionType_SOLUTION_TYPE_SEARCH,
		DataStoreIds: []string{dataStoreID},
		EngineConfig: &discoveryenginepb.Engine_SearchEngineConfig_{
			SearchEngineConfig: &discoveryenginepb.Engine_SearchEngineConfig{
				SearchTier: discoveryenginepb.SearchTier_SEARCH_TIER_STANDARD,
			},
		},
	}

	client, err := discoveryengine.NewEngineClient(ctx)
	if err != nil {
		return fmt.Errorf("NewEngineClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.CreateEngineRequest{
		Parent:   parent,
		Engine:   engine,
		EngineId: engineID,
	}

	op, err := client.CreateEngine(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateEngine failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("CreateEngine operation wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created engine: %s\n", resp.GetName())
	return nil
}

// [END discoveryengine_v1beta_engineservice_engine_create]
