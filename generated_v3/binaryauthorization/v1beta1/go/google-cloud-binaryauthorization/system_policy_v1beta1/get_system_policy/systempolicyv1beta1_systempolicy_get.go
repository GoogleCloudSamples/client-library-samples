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

// [START binaryauthorization_v1beta1_systempolicyv1beta1_systempolicy_get]

import (
	"context"
	"fmt"
	"io"
	"os"

	binaryauthorization "cloud.google.com/go/binaryauthorization/apiv1beta1"
	binaryauthorizationpb "cloud.google.com/go/binaryauthorization/apiv1beta1/binaryauthorizationpb"
	"google.golang.org/api/option"
)

// getSystemPolicy retrieves the system policy for the specified location.
func getSystemPolicy(ctx context.Context, w io.Writer, locationID string) error {
	name := fmt.Sprintf("locations/%s/policy", locationID)

	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("GCP_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := binaryauthorization.NewSystemPolicyV1Beta1Client(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSystemPolicyV1Beta1Client failed: %w", err)
	}
	defer client.Close()

	req := &binaryauthorizationpb.GetSystemPolicyRequest{
		Name: name,
	}

	policy, err := client.GetSystemPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSystemPolicy: %w", err)
	}

	fmt.Fprintf(w, "Retrieved system policy: %s\n", policy.GetName())

	return nil
}

// [END binaryauthorization_v1beta1_systempolicyv1beta1_systempolicy_get]
