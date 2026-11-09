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

// [START dialogflow_v3beta1_sessionentitytypes_sessionentitytype_delete]

import (
	"context"
	"fmt"
	"io"

	dialogflow "cloud.google.com/go/dialogflow/cx/apiv3beta1"
	cxpb "cloud.google.com/go/dialogflow/cx/apiv3beta1/cxpb"
	"google.golang.org/api/option"
)

// deleteSessionEntityType deletes the specified session entity type.
func deleteSessionEntityType(ctx context.Context, w io.Writer, projectID string, locationID string, agentID string, sessionID string, entityTypeID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/agents/%s/sessions/%s/entityTypes/%s", projectID, locationID, agentID, sessionID, entityTypeID)

	opts := []option.ClientOption{
		option.WithQuotaProject(projectID),
	}
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-dialogflow.googleapis.com:443", locationID)))
	}

	client, err := dialogflow.NewSessionEntityTypesClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSessionEntityTypesClient: %w", err)
	}
	defer client.Close()

	req := &cxpb.DeleteSessionEntityTypeRequest{
		Name: name,
	}

	if err := client.DeleteSessionEntityType(ctx, req); err != nil {
		return fmt.Errorf("DeleteSessionEntityType: %w", err)
	}

	fmt.Fprintf(w, "Deleted session entity type: %s\n", name)

	return nil
}

// [END dialogflow_v3beta1_sessionentitytypes_sessionentitytype_delete]
