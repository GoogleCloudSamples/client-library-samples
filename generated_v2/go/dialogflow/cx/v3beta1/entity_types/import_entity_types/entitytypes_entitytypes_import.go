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

// [START dialogflow_v3beta1_entitytypes_import_entity_types]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// importEntityTypes imports entity types into a Dialogflow CX agent.
func importEntityTypes(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)
	mergeOption := cxpb.ImportEntityTypesRequest_REPLACE
	entityTypesContent := &cxpb.InlineSource{
		Content: []byte(`{"entityTypes":[{"displayName":"example-size","kind":"KIND_MAP","entities":[{"value":"small","synonyms":["small"]}]}]}`),
	}

	endpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	if locationID == "global" {
		endpoint = "dialogflow.googleapis.com:443"
	}

	client, err := dialogflow.NewEntityTypesClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewEntityTypesClient failed: %w", err)
	}
	defer client.Close()

	req := &cxpb.ImportEntityTypesRequest{
		Parent: parent,
		EntityTypes: &cxpb.ImportEntityTypesRequest_EntityTypesContent{
			EntityTypesContent: entityTypesContent,
		},
		MergeOption: mergeOption,
	}

	op, err := client.ImportEntityTypes(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportEntityTypes failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("waiting for ImportEntityTypes operation failed: %w", err)
	}

	fmt.Fprintf(w, "Imported entity types: %v\n", resp.GetEntityTypes())
	return nil
}

// [END dialogflow_v3beta1_entitytypes_import_entity_types]
