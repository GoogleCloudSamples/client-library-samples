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

// [START dataproc_v1_sessioncontroller_session_get]

import (
	"context"
	"fmt"
	"io"

	dataproc "cloud.google.com/go/dataproc/v2/apiv1"
	dataprocpb "cloud.google.com/go/dataproc/v2/apiv1/dataprocpb"
	"google.golang.org/api/option"
)

// getSession retrieves an existing Dataproc session.
func getSession(ctx context.Context, w io.Writer, projectID string, locationID string, sessionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/sessions/%s", projectID, locationID, sessionID)

	endpoint := fmt.Sprintf("%s-dataproc.googleapis.com:443", locationID)
	client, err := dataproc.NewSessionControllerClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewSessionControllerClient: %w", err)
	}
	defer client.Close()

	req := &dataprocpb.GetSessionRequest{
		Name: name,
	}

	session, err := client.GetSession(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSession: %w", err)
	}

	fmt.Fprintf(w, "Retrieved session: %s\nState: %s\n", session.GetName(), session.GetState())
	return nil
}

// [END dataproc_v1_sessioncontroller_session_get]
