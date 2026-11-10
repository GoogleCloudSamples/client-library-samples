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

// [START storage_v2_storage_set_iam_policy]

import (
	"context"
	"fmt"
	"io"

	iampb "cloud.google.com/go/iam/apiv1/iampb"
	storage "cloud.google.com/go/storage/control/apiv2"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// setIamPolicy updates the IAM policy for the specified bucket.
func setIamPolicy(ctx context.Context, w io.Writer, projectID string, bucketID string) error {
	// Storage Control API requires bucket resources to use the form 'projects/_/buckets/{bucket_id}'.
	resource := fmt.Sprintf("projects/_/buckets/%s", bucketID)

	policy := &iampb.Policy{
		Bindings: []*iampb.Binding{
			{
				Role: "roles/storage.objectViewer",
				Members: []string{
					fmt.Sprintf("projectViewer:%s", projectID),
				},
			},
		},
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"bindings"},
	}

	client, err := storage.NewStorageControlClient(ctx)
	if err != nil {
		return fmt.Errorf("NewStorageControlClient failed: %w", err)
	}
	defer client.Close()

	req := &iampb.SetIamPolicyRequest{
		Resource:   resource,
		Policy:     policy,
		UpdateMask: updateMask,
	}

	response, err := client.SetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("SetIamPolicy failed: %w", err)
	}

	fmt.Fprintf(w, "Set IAM policy for %s:\n", resource)
	for _, binding := range response.GetBindings() {
		fmt.Fprintf(w, "Role: %s, Members: %v\n", binding.GetRole(), binding.GetMembers())
	}

	return nil
}

// [END storage_v2_storage_set_iam_policy]
