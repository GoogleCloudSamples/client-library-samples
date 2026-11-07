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

// [START dialogflow_v3beta1_entitytypes_entitytype_create]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// createEntityType creates a custom entity type in the specified agent.
func createEntityType(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/agents/%s", projectID, locationID, agentID)

	entityType := &cxpb.EntityType{
		DisplayName: "size",
		Kind:        cxpb.EntityType_KIND_MAP,
		Entities: []*cxpb.EntityType_Entity{
			{
				Value:    "small",
				Synonyms: []string{"small", "s"},
			},
			{
				Value:    "medium",
				Synonyms: []string{"medium", "m"},
			},
			{
				Value:    "large",
				Synonyms: []string{"large", "l"},
			},
		},
	}

	var opts []option.ClientOption
	if locationID != "" && locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}
	if projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := dialogflow.NewEntityTypesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewEntityTypesClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.CreateEntityTypeRequest{
		Parent:     parent,
		EntityType: entityType,
	}

	response, err := client.CreateEntityType(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateEntityType: %w", err)
	}

	fmt.Fprintf(w, "Created entity type: %s\n", response.GetName())

	return nil
}

// [END dialogflow_v3beta1_entitytypes_entitytype_create]
