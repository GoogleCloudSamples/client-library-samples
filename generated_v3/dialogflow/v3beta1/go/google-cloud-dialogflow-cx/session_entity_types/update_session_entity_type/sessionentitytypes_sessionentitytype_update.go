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

// [START dialogflow_v3beta1_sessionentitytypes_sessionentitytype_update]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateSessionEntityType updates an existing session entity type override mode.
func updateSessionEntityType(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, sessionID string, entityTypeID string) error {
	endpoint := fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)
	if locationID == "global" {
		endpoint = "dialogflow.googleapis.com:443"
	}

	client, err := dialogflow.NewSessionEntityTypesClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewSessionEntityTypesClient failed: %w", err)
	}
	defer client.Close()

	sessionEntityType := &cxpb.SessionEntityType{
		Name: fmt.Sprintf("projects/%s/locations/%s/agents/%s/sessions/%s/entityTypes/%s",
			projectID, locationID, agentID, sessionID, entityTypeID),
		EntityOverrideMode: cxpb.SessionEntityType_ENTITY_OVERRIDE_MODE_SUPPLEMENT,
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"entity_override_mode"},
	}

	req := &cxpb.UpdateSessionEntityTypeRequest{
		SessionEntityType: sessionEntityType,
		UpdateMask:        updateMask,
	}

	resp, err := client.UpdateSessionEntityType(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateSessionEntityType failed: %w", err)
	}

	fmt.Fprintf(w, "Updated session entity type: %s\n", resp.GetName())
	return nil
}

// [END dialogflow_v3beta1_sessionentitytypes_sessionentitytype_update]
