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

// [START binaryauthorization_v1_systempolicyv1_systempolicy_get]

import (
	"context"
	"fmt"
	"io"

	binaryauthorization "cloud.google.com/go/binaryauthorization/apiv1"
	"cloud.google.com/go/binaryauthorization/apiv1/binaryauthorizationpb"
)

// getSystemPolicy retrieves the Binary Authorization system policy for the specified location.
func getSystemPolicy(ctx context.Context, w io.Writer, locationID string) error {
	name := fmt.Sprintf("locations/%s/policy", locationID)

	client, err := binaryauthorization.NewSystemPolicyClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSystemPolicyClient: %w", err)
	}
	defer client.Close()

	req := &binaryauthorizationpb.GetSystemPolicyRequest{
		Name: name,
	}

	policy, err := client.GetSystemPolicy(ctx, req)
	if err != nil {
		return fmt.Errorf("GetSystemPolicy: %w", err)
	}

	fmt.Fprintf(w, "System policy: %s\n", policy.GetName())
	return nil
}

// [END binaryauthorization_v1_systempolicyv1_systempolicy_get]
