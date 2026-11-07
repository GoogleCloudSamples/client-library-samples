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

// [START analyticshub_v1beta1_connectionservice_connectioncredential_update]

import (
	"context"
	"fmt"
	"io"

	analyticshub "cloud.google.com/go/bigquery/connection/apiv1beta1"
	connectionpb "cloud.google.com/go/bigquery/connection/apiv1beta1/connectionpb"
)

// Use the UpdateConnectionCredential method.
func updateConnectionCredential(ctx context.Context, w io.Writer, projectID string, locationID string, connectionID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/connections/%s/credential", projectID, locationID, connectionID)
	credential := &connectionpb.ConnectionCredential{
		Credential: &connectionpb.ConnectionCredential_CloudSql{
			CloudSql: &connectionpb.CloudSqlCredential{
				Username: "example-username",
				Password: "example-password",
			},
		},
	}

	client, err := analyticshub.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &connectionpb.UpdateConnectionCredentialRequest{
		Name:       name,
		Credential: credential,
	}

	if err := client.UpdateConnectionCredential(ctx, req); err != nil {
		return fmt.Errorf("UpdateConnectionCredential failed: %w", err)
	}

	fmt.Fprintf(w, "Updated connection credential: %s\n", name)
	return nil
}

// [END analyticshub_v1beta1_connectionservice_connectioncredential_update]
