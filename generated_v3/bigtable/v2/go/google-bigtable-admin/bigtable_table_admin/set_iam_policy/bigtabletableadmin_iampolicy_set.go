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

// [START bigtableadmin_v2_bigtabletableadmin_set_iam_policy]

import (
	"context"
	"fmt"
	"io"
	"strings"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	iampb "cloud.google.com/go/iam/apiv1/iampb"
	resourcemanager "cloud.google.com/go/resourcemanager/apiv3"
	resourcemanagerpb "cloud.google.com/go/resourcemanager/apiv3/resourcemanagerpb"
)

// setIamPolicy sets an IAM policy on a Bigtable table using a read-modify-write pattern.
func setIamPolicy(ctx context.Context, w io.Writer, projectID string, instanceID string, tableID string) error {
	client, err := bigtableadmin.NewBigtableTableAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("bigtableadmin.NewBigtableTableAdminClient: %w", err)
	}
	defer client.Close()

	// Compute Engine default service accounts use the numeric project number rather than the project ID.
	rmClient, err := resourcemanager.NewProjectsClient(ctx)
	if err != nil {
		return fmt.Errorf("resourcemanager.NewProjectsClient: %w", err)
	}
	defer rmClient.Close()

	project, err := rmClient.GetProject(ctx, &resourcemanagerpb.GetProjectRequest{
		Name: fmt.Sprintf("projects/%s", projectID),
	})
	if err != nil {
		return fmt.Errorf("rmClient.GetProject: %w", err)
	}
	projectNumber := strings.TrimPrefix(project.GetName(), "projects/")

	resource := fmt.Sprintf("projects/%s/instances/%s/tables/%s", projectID, instanceID, tableID)

	// Retrieve the current IAM policy to preserve existing bindings and obtain the etag.
	policy, err := client.GetIamPolicy(ctx, &iampb.GetIamPolicyRequest{
		Resource: resource,
	})
	if err != nil {
		return fmt.Errorf("client.GetIamPolicy: %w", err)
	}

	// Modify the policy by adding a binding while retaining the retrieved etag for concurrency control.
	policy.Bindings = append(policy.Bindings, &iampb.Binding{
		Role: "roles/bigtable.reader",
		Members: []string{
			fmt.Sprintf("serviceAccount:%s-compute@developer.gserviceaccount.com", projectNumber),
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

	fmt.Fprintf(w, "Successfully updated IAM policy for %s: etag %x\n", resource, updatedPolicy.GetEtag())

	return nil
}

// [END bigtableadmin_v2_bigtabletableadmin_set_iam_policy]
