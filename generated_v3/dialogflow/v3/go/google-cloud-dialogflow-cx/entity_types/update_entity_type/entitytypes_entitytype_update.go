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

// [START dialogflow_v3_entitytypes_entitytype_update]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3/cxpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateEntityType updates the display name of an existing entity type in Dialogflow CX.
func updateEntityType(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, entityTypeID string) error {
	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewEntityTypesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewEntityTypesClient: %w", err)
	}
	defer client.Close()

	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/entityTypes/%s", projectID, locationID, agentID, entityTypeID)
	entityType := &cxpb.EntityType{
		Name:        name,
		DisplayName: "updated-display-name",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	req := &cxpb.UpdateEntityTypeRequest{
		EntityType: entityType,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateEntityType(ctx, req)
	if err != nil {
		return fmt.Errorf("client.UpdateEntityType: %w", err)
	}

	fmt.Fprintf(w, "Updated entity type: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3_entitytypes_entitytype_update]
