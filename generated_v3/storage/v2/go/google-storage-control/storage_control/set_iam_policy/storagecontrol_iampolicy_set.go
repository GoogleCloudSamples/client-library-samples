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

// [START storage_v2_storagecontrol_set_iam_policy]

import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/iam/apiv1/iampb"
	storage "cloud.google.com/go/storage/control/apiv2"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// setIamPolicy sets the IAM policy on a Cloud Storage bucket using StorageControl.
func setIamPolicy(ctx context.Context, w io.Writer, projectID string, bucketID string) error {
	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient failed: %w", err)
	}
	defer client.Close()

	// Cloud Storage Control bucket-scoped operations require "_" as the project identifier.
	if projectID != "_" {
		projectID = "_"
	}
	resource := fmt.Sprintf("projects/%s/buckets/%s", projectID, bucketID)

	// Fetch existing policy to preserve bindings and etag for concurrency control.
	existingPolicy, err := client.GetIamPolicy(ctx, &iampb.GetIamPolicyRequest{
		Resource: resource,
	})
	if err != nil {
		return fmt.Errorf("GetIamPolicy failed: %w", err)
	}

	// Identify an existing identity to ensure a valid principal for the update.
	member := "allAuthenticatedUsers"
	for _, binding := range existingPolicy.GetBindings() {
		if len(binding.GetMembers()) > 0 {
			member = binding.GetMembers()[0]
			break
		}
	}

	policy := existingPolicy
	policy.Bindings = append(policy.Bindings, &iampb.Binding{
		Role:    "roles/storage.objectViewer",
		Members: []string{member},
	})

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"bindings"},
	}

	req := &iampb.SetIamPolicyRequest{
		Resource:   resource,
		Policy:     policy,
		UpdateMask: updateMask,
	}

	updatedPolicy, err := client.SetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("SetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Set IAM policy for %s successfully with %d bindings.\n", resource, len(updatedPolicy.GetBindings()))

	return nil
}

// [END storage_v2_storagecontrol_set_iam_policy]
