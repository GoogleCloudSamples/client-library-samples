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

// [START spanner_v1_adapter_session_create]

import (
	"context"
	"fmt"
	"io"

	spanner "cloud.google.com/go/spanner/adapter/apiv1"
	adapterpb "cloud.google.com/go/spanner/adapter/apiv1/adapterpb"
)

// createSession creates a session for a database using the Spanner Adapter API.
func createSession(ctx context.Context, w io.Writer, projectID string, instanceID string, databaseID string) error {
	parent := fmt.Sprintf("projects/%s/instances/%s/databases/%s", projectID, instanceID, databaseID)
	session := &adapterpb.Session{}

	client, err := spanner.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &adapterpb.CreateSessionRequest{
		Parent:  parent,
		Session: session,
	}

	resp, err := client.CreateSession(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSession failed: %w", err)
	}

	fmt.Fprintf(w, "Created session: %s\n", resp.GetName())
	return nil
}

// [END spanner_v1_adapter_session_create]
