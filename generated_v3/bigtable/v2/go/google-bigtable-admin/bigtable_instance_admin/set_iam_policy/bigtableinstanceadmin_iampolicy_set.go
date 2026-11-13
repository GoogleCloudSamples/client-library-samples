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

// [START bigtableadmin_v2_bigtableinstanceadmin_set_iam_policy]

import (
	"context"
	"encoding/json"
	"fmt"
	"io"

	bigtableadmin "cloud.google.com/go/bigtable/admin/apiv2"
	"cloud.google.com/go/compute/metadata"
	"cloud.google.com/go/iam/apiv1/iampb"
	"golang.org/x/oauth2/google"
)

// setIamPolicy sets the IAM policy on a Cloud Bigtable instance using read-modify-write.
func setIamPolicy(ctx context.Context, w io.Writer, projectID string, instanceID string) error {
	resource := fmt.Sprintf("projects/%s/instances/%s", projectID, instanceID)

	client, err := bigtableadmin.NewBigtableInstanceAdminClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigtableInstanceAdminClient: %w", err)
	}
	defer client.Close()

	// Fetch current policy to obtain the current ETag and preserve existing bindings.
	currentPolicy, err := client.GetIamPolicy(ctx, &iampb.GetIamPolicyRequest{
		Resource: resource,
	})
	if err != nil {
		return fmt.Errorf("GetIamPolicy: %w", err)
	}

	// Identify an existing principal to update in the IAM policy.
	var member string
	if creds, err := google.FindDefaultCredentials(ctx); err == nil && len(creds.JSON) > 0 {
		var credsData struct {
			ClientEmail string `json:"client_email"`
		}
		if err := json.Unmarshal(creds.JSON, &credsData); err == nil && credsData.ClientEmail != "" {
			member = "serviceAccount:" + credsData.ClientEmail
		}
	}
	if member == "" && metadata.OnGCE() {
		if email, err := metadata.Email("default"); err == nil && email != "" {
			member = "serviceAccount:" + email
		} else if projectNum, err := metadata.NumericProjectID(); err == nil && projectNum != "" {
			member = fmt.Sprintf("serviceAccount:%s-compute@developer.gserviceaccount.com", projectNum)
		}
	}
	if member == "" {
		for _, b := range currentPolicy.Bindings {
			if len(b.Members) > 0 {
				member = b.Members[0]
				break
			}
		}
	}
	if member == "" {
		member = fmt.Sprintf("serviceAccount:%s-compute@developer.gserviceaccount.com", projectID)
	}

	role := "roles/bigtable.reader"
	policy := currentPolicy
	var bindingFound bool
	for _, b := range policy.Bindings {
		if b.Role == role {
			var memberExists bool
			for _, m := range b.Members {
				if m == member {
					memberExists = true
					break
				}
			}
			if !memberExists {
				b.Members = append(b.Members, member)
			}
			bindingFound = true
			break
		}
	}
	if !bindingFound {
		policy.Bindings = append(policy.Bindings, &iampb.Binding{
			Role:    role,
			Members: []string{member},
		})
	}

	req := &iampb.SetIamPolicyRequest{
		Resource: resource,
		Policy:   policy,
	}

	updatedPolicy, err := client.SetIamPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("SetIamPolicy: %w", err)
	}

	fmt.Fprintf(w, "IAM policy successfully set for %s with %d bindings\n", resource, len(updatedPolicy.Bindings))
	return nil
}

// [END bigtableadmin_v2_bigtableinstanceadmin_set_iam_policy]
