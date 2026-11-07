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

// [START bigqueryconnection_v1_connectionservice_set_iam_policy]

import (
	"context"
	"fmt"
	"io"

	bigqueryconnection "cloud.google.com/go/bigquery/connection/apiv1"
	"cloud.google.com/go/iam/apiv1/iampb"
)

// setIamPolicy sets the IAM policy for a BigQuery connection.
func setIamPolicy(ctx context.Context, w io.Writer, projectID string, locationID string, connectionID string) error {
	client, err := bigqueryconnection.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("bigqueryconnection.NewClient: %w", err)
	}
	defer client.Close()

	resource := fmt.Sprintf("projects/%s/locations/%s/connections/%s", projectID, locationID, connectionID)

	// Retrieve the existing policy to obtain the current etag and prevent race conditions.
	policy, err := client.GetIamPolicy(ctx, &iampb.GetIamPolicyRequest{
		Resource: resource,
	})
	if err != nil {
		return fmt.Errorf("client.GetIamPolicy: %w", err)
	}

	// Update bindings on the policy.
	policy.Bindings = append(policy.Bindings, &iampb.Binding{
		Role: "roles/bigquery.connectionUser",
		Members: []string{
			fmt.Sprintf("serviceAccount:example-account@%s.iam.gserviceaccount.com", projectID),
		},
	})

	req := &iampb.SetIamPolicyRequest{
		Resource: resource,
		Policy:   policy,
	}

	updatedPolicy, err := client.SetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("client.SetIamPolicy: %w", err)
	}

	fmt.Fprintf(w, "Updated IAM policy for %s. Policy version: %d\n", resource, updatedPolicy.GetVersion())
	return nil
}

// [END bigqueryconnection_v1_connectionservice_set_iam_policy]
