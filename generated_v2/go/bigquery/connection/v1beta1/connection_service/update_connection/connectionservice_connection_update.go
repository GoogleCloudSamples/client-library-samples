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

// [START analyticshub_v1beta1_connectionservice_connection_update]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/connection/apiv1beta1"
	connectionpb "cloud.google.com/go/bigquery/connection/apiv1beta1/connectionpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateConnection method.
func updateConnection(ctx context.Context, w io.Writer, projectID string, locationID string, connectionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/connections/%s", projectID, locationID, connectionID)
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"description"},
	}
	connection := &connectionpb.Connection{
		Description: "Updated description for example connection",
	}

	client, err := analyticshub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %v", err)
	}
	defer client.Close()

	req := &connectionpb.UpdateConnectionRequest{
		Name:       name,
		Connection: connection,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateConnection(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateConnection: %w", err)
	}

	fmt.Fprintf(w, "Updated connection: %s\n", resp.GetName())
	return nil
}

// [END analyticshub_v1beta1_connectionservice_connection_update]
